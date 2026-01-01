import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { object, string, number, pipe, minValue, custom } from 'valibot';
import { useCreateTransaction, useUpdateTransaction } from '@/hooks/useTransactions';
import type { Transaction, TransactionType } from '@/types/transaction';
import { Card, CardHeader, CardBody, Button, Input } from '@heroui/react';
import { NumberInput } from '@heroui/number-input';
import { DatePicker } from '@heroui/date-picker';
import { parseDate } from '@internationalized/date';
import type { DateValue } from '@internationalized/date';
import { useTranslation } from 'react-i18next';

interface TransactionFormProps {
  type: TransactionType;
  editingTransaction: Transaction | null;
  onEditComplete: () => void;
}

const createTransactionSchema = () =>
  object({
    amount: pipe(number(), minValue(0.01)),
    category: pipe(string()),
    date: custom<DateValue | null>((value) => value !== null && value !== undefined, 'Date is required'),
    description: string(),
  });

type TransactionFormData = {
  amount: number;
  category: string;
  date: DateValue | null;
  description: string;
};

export function TransactionForm({ type, editingTransaction, onEditComplete }: TransactionFormProps) {
  const { t } = useTranslation();
  const createMutation = useCreateTransaction();
  const updateMutation = useUpdateTransaction();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<TransactionFormData>({
    resolver: valibotResolver(createTransactionSchema()),
    mode: 'onChange',
    defaultValues: {
      amount: 0,
      category: '',
      date: null,
      description: '',
    },
  });

  useEffect(() => {
    if (editingTransaction) {
      reset({
        amount: editingTransaction.amount,
        category: editingTransaction.category,
        description: editingTransaction.description,
        date: parseDate(editingTransaction.date),
      });
    } else {
      reset({
        amount: 0,
        category: '',
        date: null,
        description: '',
      });
    }
  }, [editingTransaction, reset]);

  const onSubmit = async (data: TransactionFormData) => {
    const transactionData = {
      ...data,
      date: data.date?.toString() || '',
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
        reset();
      }
    } catch (error) {
      console.error('Failed to save transaction:', error);
    }
  };

  const handleCancel = () => {
    onEditComplete();
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">
          {editingTransaction ? t('edit') : t('add')} {type === 'income' ? t('income') : t('outcome')}
        </h3>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <NumberInput
                label={t('amount')}
                value={field.value}
                onValueChange={field.onChange}
                placeholder={t('amountPlaceholder')}
                isRequired
                variant="bordered"
                isInvalid={!!errors.amount}
                errorMessage={errors.amount?.message}
                formatOptions={{
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }}
                step={0.01}
                minValue={0.01}
              />
            )}
          />

          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Input
                label={t('category')}
                type="text"
                value={field.value}
                onValueChange={field.onChange}
                placeholder={t('categoryPlaceholder')}
                isRequired
                variant="bordered"
                isInvalid={!!errors.category}
                errorMessage={errors.category?.message}
              />
            )}
          />

          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <DatePicker
                label={t('date')}
                value={field.value}
                onChange={field.onChange}
                isRequired
                variant="bordered"
                isInvalid={!!errors.date}
                errorMessage={errors.date?.message}
                showMonthAndYearPickers
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Input
                label={t('description')}
                type="text"
                value={field.value}
                onValueChange={field.onChange}
                placeholder={t('descriptionPlaceholder')}
                variant="bordered"
              />
            )}
          />

          <div className="flex gap-2">
            <Button
              type="submit"
              color={type === 'outcome' ? 'danger' : 'primary'}
              isDisabled={!isValid || isLoading}
              className="flex-1"
            >
              {editingTransaction ? t('update') : t('add')} {type === 'income' ? t('income') : t('outcome')}
            </Button>
            {editingTransaction && (
              <Button type="button" variant="bordered" onPress={handleCancel}>
                {t('cancel')}
              </Button>
            )}
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
