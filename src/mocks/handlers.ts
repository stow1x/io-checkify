import { http, HttpResponse } from 'msw';
import type { Transaction, NewTransaction } from '@/types/transaction';

// In-memory data store with sample transactions
const transactions: Transaction[] = [
  {
    id: '1',
    amount: 5000,
    category: 'Salary',
    description: 'Monthly salary',
    date: '2025-12-01',
    type: 'income',
  },
  {
    id: '2',
    amount: 1200,
    category: 'Freelance',
    description: 'Web development project',
    date: '2025-12-15',
    type: 'income',
  },
  {
    id: '3',
    amount: 1500,
    category: 'Rent',
    description: 'Monthly rent payment',
    date: '2025-12-05',
    type: 'outcome',
  },
  {
    id: '4',
    amount: 400,
    category: 'Groceries',
    description: 'Weekly shopping',
    date: '2025-12-10',
    type: 'outcome',
  },
  {
    id: '5',
    amount: 200,
    category: 'Entertainment',
    description: 'Movie tickets and dinner',
    date: '2025-12-12',
    type: 'outcome',
  },
];

export const handlers = [
  // GET /api/transactions - Fetch transactions with optional type filter
  http.get('/api/transactions', ({ request }) => {
    const url = new URL(request.url);
    const type = url.searchParams.get('type');

    const filteredTransactions = type
      ? transactions.filter((t) => t.type === type)
      : transactions;

    return HttpResponse.json(filteredTransactions);
  }),

  // POST /api/transactions - Create new transaction
  http.post('/api/transactions', async ({ request }) => {
    const newTransaction = (await request.json()) as NewTransaction;
    const transaction: Transaction = {
      ...newTransaction,
      id: Math.random().toString(36).substr(2, 9),
    };

    transactions.push(transaction);
    return HttpResponse.json(transaction, { status: 201 });
  }),

  // PUT /api/transactions/:id - Update transaction
  http.put('/api/transactions/:id', async ({ request, params }) => {
    const { id } = params;
    const updates = (await request.json()) as Partial<Transaction>;
    const index = transactions.findIndex((t) => t.id === id);

    if (index === -1) {
      return HttpResponse.json(
        { error: 'Transaction not found' },
        { status: 404 },
      );
    }

    transactions[index] = { ...transactions[index], ...updates };
    return HttpResponse.json(transactions[index]);
  }),

  // DELETE /api/transactions/:id - Delete transaction
  http.delete('/api/transactions/:id', ({ params }) => {
    const { id } = params;
    const index = transactions.findIndex((t) => t.id === id);

    if (index === -1) {
      return HttpResponse.json(
        { error: 'Transaction not found' },
        { status: 404 },
      );
    }

    transactions.splice(index, 1);
    return HttpResponse.json({ success: true }, { status: 204 });
  }),
];
