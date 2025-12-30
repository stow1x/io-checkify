import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Transaction, NewTransaction, TransactionType } from '@/types/transaction';

// Fetch transactions by type
export const useTransactions = (type: TransactionType) => {
  return useQuery({
    queryKey: ['transactions', type],
    queryFn: async () => {
      const response = await fetch(`/api/transactions?type=${type}`);
      if (!response.ok) {
        throw new Error('Failed to fetch transactions');
      }
      return response.json() as Promise<Transaction[]>;
    },
  });
};

// Create new transaction
export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newTransaction: NewTransaction) => {
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTransaction),
      });
      if (!response.ok) {
        throw new Error('Failed to create transaction');
      }
      return response.json() as Promise<Transaction>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });
};

// Update transaction
export const useUpdateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Transaction> }) => {
      const response = await fetch(`/api/transactions/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      if (!response.ok) {
        throw new Error('Failed to update transaction');
      }
      return response.json() as Promise<Transaction>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });
};

// Delete transaction
export const useDeleteTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/transactions/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete transaction');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });
};
