import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { TransactionsPage } from '@/pages/TransactionsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/income" replace />,
      },
      {
        path: 'income',
        element: <TransactionsPage type="income" />,
      },
      {
        path: 'outcome',
        element: <TransactionsPage type="outcome" />,
      },
    ],
  },
]);
