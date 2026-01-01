import { useTransactions, useDeleteTransaction } from '@/hooks/useTransactions';
import type { Transaction, TransactionType } from '@/types/transaction';
import { Card, CardHeader, CardBody, Button, Spinner } from '@heroui/react';
import { Edit, Trash2 } from 'lucide-react';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';
import { useTranslation } from 'react-i18next';

interface TransactionTableProps {
  type: TransactionType;
  onEdit: (transaction: Transaction) => void;
}

export function TransactionTable({ type, onEdit }: TransactionTableProps) {
  const { t } = useTranslation();
  const { data: transactions, isLoading, error, refetch } = useTransactions(type);
  const deleteMutation = useDeleteTransaction();

  const handleDeleteConfirm = async (transactionId: string) => {
    await deleteMutation.mutateAsync(transactionId);
  };

  if (isLoading) {
    return (
      <Card>
        <CardBody className="flex items-center justify-center p-8">
          <Spinner size="lg" />
        </CardBody>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardBody className="p-8">
          <div className="text-center space-y-4">
            <p className="text-destructive">{t('failedToLoad')}</p>
            <Button onClick={() => refetch()} variant="bordered">
              Retry
            </Button>
          </div>
        </CardBody>
      </Card>
    );
  }

  if (!transactions || transactions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">{t('transactions')}</h3>
        </CardHeader>
        <CardBody>
          <p className="text-center text-muted-foreground py-8">
            {t('noData')}
          </p>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">{t('transactions')}</h3>
      </CardHeader>
      <CardBody>
        <div className="w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Date</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Category</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Description</th>
                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Amount</th>
                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b transition-colors hover:bg-muted/50">
                  <td className="p-4 align-middle">{new Date(transaction.date).toLocaleDateString()}</td>
                  <td className="p-4 align-middle">{transaction.category}</td>
                  <td className="p-4 align-middle">{transaction.description || '-'}</td>
                  <td className={`p-4 align-middle text-right font-medium ${
                    type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    ${transaction.amount.toFixed(2)}
                  </td>
                  <td className="p-4 align-middle text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="light"
                        isIconOnly
                        size="sm"
                        onPress={() => onEdit(transaction)}
                        aria-label={`Edit ${transaction.category} transaction`}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <DeleteConfirmDialog
                        onConfirm={() => handleDeleteConfirm(transaction.id)}
                        triggerButton={
                          <Button
                            variant="light"
                            isIconOnly
                            size="sm"
                            aria-label={`Delete ${transaction.category} transaction`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        }
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
}
