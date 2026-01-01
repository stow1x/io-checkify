import { useState } from 'react';
import { TransactionForm } from '@/components/TransactionForm';
import { TransactionTable } from '@/components/TransactionTable';
import { TransactionChart } from '@/components/TransactionChart';
import type { Transaction, TransactionType } from '@/types/transaction';

interface TransactionsPageProps {
  type: TransactionType;
}

export function TransactionsPage({ type }: TransactionsPageProps) {
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
  };

  const handleEditComplete = () => {
    setEditingTransaction(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <TransactionForm
          type={type}
          editingTransaction={editingTransaction}
          onEditComplete={handleEditComplete}
        />
        <TransactionTable type={type} onEdit={handleEdit} />
      </div>
      <div>
        <TransactionChart type={type} />
      </div>
    </div>
  );
}
