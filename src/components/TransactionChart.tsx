import { useTransactions } from '@/hooks/useTransactions';
import type { TransactionType } from '@/types/transaction';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card/Card';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Loader2 } from 'lucide-react';

interface TransactionChartProps {
  type: TransactionType;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658'];

export function TransactionChart({ type }: TransactionChartProps) {
  const { data: transactions, isLoading, error } = useTransactions(type);

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
          <p className="text-center text-destructive">Failed to load chart data</p>
        </CardContent>
      </Card>
    );
  }

  if (!transactions || transactions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Category Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-8">
            No data to display. Add some transactions first.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Aggregate transactions by category
  const categoryData = transactions.reduce((acc, transaction) => {
    const existing = acc.find((item) => item.category === transaction.category);
    if (existing) {
      existing.value += transaction.amount;
    } else {
      acc.push({
        category: transaction.category,
        value: transaction.amount,
      });
    }
    return acc;
  }, [] as { category: string; value: number }[]);

  // Calculate total
  const total = categoryData.reduce((sum, item) => sum + item.value, 0);

  // Add percentage labels
  const chartData = categoryData.map((item) => ({
    ...item,
    name: item.category,
    percentage: ((item.value / total) * 100).toFixed(1),
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Category Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ percentage }) => `${percentage}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => `$${value.toFixed(2)}`}
              contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">Total</p>
          <p className={`text-2xl font-bold ${type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
            ${total.toFixed(2)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
