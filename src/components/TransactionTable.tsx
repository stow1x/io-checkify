import { useTransactions, useDeleteTransaction } from '@/hooks/useTransactions';
import type { Transaction, TransactionType } from '@/types/transaction';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table/Table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card/Card';
import { Button } from '@/components/ui/button/Button';
import { Loader2, Edit, Trash2 } from 'lucide-react';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';

interface TransactionTableProps {
  type: TransactionType;
  onEdit: (transaction: Transaction) => void;
}

export function TransactionTable({ type, onEdit }: TransactionTableProps) {
  const { data: transactions, isLoading, error, refetch } = useTransactions(type);
  const deleteMutation = useDeleteTransaction();

  const handleDeleteConfirm = async (transactionId: string) => {
    await deleteMutation.mutateAsync(transactionId);
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            <p className="text-destructive">Failed to load transactions</p>
            <Button onClick={() => refetch()} variant="outline">
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!transactions || transactions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-8">
            No {type === 'income' ? 'income' : 'outcome'} transactions yet. Add one to get started!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                <TableCell>{transaction.category}</TableCell>
                <TableCell>{transaction.description || '-'}</TableCell>
                <TableCell
                  className={`text-right font-medium ${
                    type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  ${transaction.amount.toFixed(2)}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(transaction)}
                      aria-label={`Edit ${transaction.category} transaction`}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <DeleteConfirmDialog
                      onConfirm={() => handleDeleteConfirm(transaction.id)}
                      triggerButton={
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`Delete ${transaction.category} transaction`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      }
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
