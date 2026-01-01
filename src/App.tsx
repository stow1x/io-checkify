import { useState } from 'react';
import { Tabs, Tab } from '@heroui/react';
import { TransactionForm } from '@/components/TransactionForm';
import { TransactionTable } from '@/components/TransactionTable';
import { TransactionChart } from '@/components/TransactionChart';
import type { Transaction, TransactionType } from '@/types/transaction';

function App() {
  const [activeTab, setActiveTab] = useState<TransactionType>('income');
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
  };

  const handleEditComplete = () => {
    setEditingTransaction(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">Income/Outcome Notes</h1>
          <p className="text-gray-600 mt-2">Track your financial transactions</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs 
          selectedKey={activeTab} 
          onSelectionChange={(key) => setActiveTab(key as TransactionType)}
          className="mb-8"
        >
          <Tab key="income" title="Income">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
              <div className="lg:col-span-2 space-y-6">
                <TransactionForm
                  type="income"
                  editingTransaction={editingTransaction}
                  onEditComplete={handleEditComplete}
                />
                <TransactionTable type="income" onEdit={handleEdit} />
              </div>
              <div>
                <TransactionChart type="income" />
              </div>
            </div>
          </Tab>

          <Tab key="outcome" title="Outcome">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
              <div className="lg:col-span-2 space-y-6">
                <TransactionForm
                  type="outcome"
                  editingTransaction={editingTransaction}
                  onEditComplete={handleEditComplete}
                />
                <TransactionTable type="outcome" onEdit={handleEdit} />
              </div>
              <div>
                <TransactionChart type="outcome" />
              </div>
            </div>
          </Tab>
        </Tabs>
      </main>
    </div>
  );
}

export default App;
