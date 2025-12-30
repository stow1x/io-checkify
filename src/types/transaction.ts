export type TransactionType = 'income' | 'outcome';

export interface Transaction {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  type: TransactionType;
}

export type NewTransaction = Omit<Transaction, 'id'>;
