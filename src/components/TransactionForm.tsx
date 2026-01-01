import { useState, useEffect } from 'react';
import { useCreateTransaction, useUpdateTransaction } from '@/hooks/useTransactions';
import type { Transaction, TransactionType } from '@/types/transaction';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card/Card';
import { Input } from '@/components/ui/input/Input';
import { Label } from '@/components/ui/label/Label';
import { Button } from '@/components/ui/button/Button';

interface TransactionFormProps {
  type: TransactionType;
  editingTransaction: Transaction | null;
  onEditComplete: () => void;
}

export function TransactionForm({ type, editingTransaction, onEditComplete }: TransactionFormProps) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const createMutation = useCreateTransaction();
  const updateMutation = useUpdateTransaction();

  useEffect(() => {
    if (editingTransaction) {
      setAmount(editingTransaction.amount.toString());
      setCategory(editingTransaction.category);
      setDescription(editingTransaction.description);
      setDate(editingTransaction.date);
    } else {
      setAmount('');
      setCategory('');
      setDescription('');
      setDate('');
    }
  }, [editingTransaction]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || !category || !date) {
      return;
    }

    const transactionData = {
      amount: parseFloat(amount),
      category,
      description,
      date,
      type,
    };

    try {
      if (editingTransaction) {
        await updateMutation.mutateAsync({
          id: editingTransaction.id,
          updates: transactionData,
        });
        onEditComplete();
      } else {
        await createMutation.mutateAsync(transactionData);
      }

      // Clear form after successful submission
      if (!editingTransaction) {
        setAmount('');
        setCategory('');
        setDescription('');
        setDate('');
      }
    } catch (error) {
      console.error('Failed to save transaction:', error);
    }
  };

  const handleCancel = () => {
    onEditComplete();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {editingTransaction ? 'Edit' : 'Add'} {type === 'income' ? 'Income' : 'Outcome'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount *</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Input
              id="category"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g., Salary, Rent, Groceries"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date *</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional notes"
            />
          </div>

          <div className="flex gap-2">
            <Button
              type="submit"
              variant={type === 'outcome' ? 'destructive' : 'default'}
              isDisabled={createMutation.isPending || updateMutation.isPending}
              className="flex-1"
            >
              {editingTransaction ? 'Update' : 'Add'} {type === 'income' ? 'Income' : 'Outcome'}
            </Button>
            {editingTransaction && (
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
