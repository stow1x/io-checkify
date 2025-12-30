# Income/Outcome Note Application - Development Instructions

## Application Overview

You WILL create a modern, responsive income/outcome note tracking application using ReactJS, TanStack Query, shadcn/ui, Tailwind CSS, and MSW for API mocking.

## Core Requirements

### Technology Stack
- You MUST use React 18+ with functional components and hooks
- You MUST use TanStack Query (React Query) v5 for all data fetching, caching, and mutations
- You MUST use shadcn/ui for UI components
- You MUST use Tailwind CSS for styling (v4 with @tailwindcss/vite)
- You MUST use MSW (Mock Service Worker) for mocking API endpoints
- You MUST use TypeScript for type safety
- You MUST use Recharts for data visualization

### Application Features

#### Navigation Structure
You WILL implement a tab-based navigation with two main sections:
- Income Tab
- Outcome Tab

Each section MUST contain:
1. A data table displaying all records
2. CRUD operation controls (Create, Read, Update, Delete)
3. Visual charts for data analysis

#### Data Model
You WILL create a data structure for both income and outcome entries with the following fields:
- `id` (string): Unique identifier
- `amount` (number): Transaction amount
- `category` (string): Category of the transaction (e.g., "Salary", "Rent", "Groceries")
- `description` (string): Optional description
- `date` (string): Date of transaction (ISO format)
- `type` (enum): "income" or "outcome"

## Implementation Instructions

### 1. Project Setup

You WILL initialize the project using Vite with React + TypeScript template.

You MUST install these dependencies:
- @tanstack/react-query and @tanstack/react-query-devtools
- recharts
- tailwindcss and @tailwindcss/vite (as dev dependencies)
- msw (as dev dependency)
- @types/node (as dev dependency)

### 2. Tailwind CSS Configuration

You MUST configure Tailwind CSS v4:
- Replace `src/index.css` content with `@import "tailwindcss";`
- Update `vite.config.ts` to include tailwindcss plugin and path aliases for "@" pointing to "./src"
- Import path from "path" module

### 3. TypeScript Configuration

You MUST update TypeScript configs for path aliases:
- Edit `tsconfig.json` to add baseUrl "." and paths mapping "@/*" to ["./src/*"]
- Edit `tsconfig.app.json` to add the same baseUrl and paths configuration

### 4. shadcn/ui Setup

You MUST initialize shadcn/ui:
- Run `npx shadcn@latest init`
- Choose Default style and Neutral base color (or preferred)
- Enable CSS variables

You MUST add these shadcn/ui components:
- button
- input
- table
- tabs
- card
- alert-dialog
- label

### 5. Type Definitions

You MUST create `src/types/transaction.ts` with:
- TransactionType: 'income' | 'outcome'
- Transaction interface with id, amount, category, description, date, type
- NewTransaction type as Omit<Transaction, 'id'>

### 6. MSW Configuration

You MUST create MSW handlers in `src/mocks/handlers.ts`:
- In-memory data store with sample transactions (mix of income and outcome)
- GET /api/transactions with query param filtering by type
- POST /api/transactions for creating new transactions
- PUT /api/transactions/:id for updating transactions
- DELETE /api/transactions/:id for deleting transactions

You MUST create `src/mocks/browser.ts`:
- Setup worker with handlers

### 7. Application Entry Point

You MUST configure `src/main.tsx`:
- Create QueryClient with proper defaults (staleTime, gcTime, retry, refetchOnWindowFocus)
- Start MSW worker before rendering React
- Wrap App with QueryClientProvider
- Include ReactQueryDevtools

### 8. TanStack Query Hooks

You MUST create `src/hooks/useTransactions.ts` with:
- useTransactions(type) - Query hook for fetching transactions by type
- useCreateTransaction() - Mutation hook for creating transactions
- useUpdateTransaction() - Mutation hook for updating transactions
- useDeleteTransaction() - Mutation hook for deleting transactions
- All mutations MUST invalidate ['transactions'] query on success

### 9. Component Structure

You MUST create these components:
- `src/components/TransactionForm.tsx` - Form for create/edit with shadcn/ui Card, Input, Label, Button
- `src/components/TransactionTable.tsx` - Table displaying transactions with shadcn/ui Table, Card
- `src/components/TransactionChart.tsx` - Pie chart showing category distribution with Recharts and shadcn/ui Card
- `src/components/DeleteConfirmDialog.tsx` - Delete confirmation with shadcn/ui AlertDialog

### 10. Transaction Form Component

You MUST implement:
- Controlled form inputs using React useState
- Amount (number), Category (text), Date (date), Description (text) fields
- Support both create and edit modes
- Use shadcn/ui Card, Input, Label, Button components
- Submit button variant changes based on type (default for income, destructive for outcome)
- Show Cancel button only in edit mode
- Clear form after successful submission

### 11. Transaction Table Component

You MUST implement:
- Display transactions in shadcn/ui Table
- Show Date, Category, Description, Amount, Actions columns
- Color-code amounts (green for income, red for outcome)
- Edit and Delete buttons for each row
- Handle loading state with Loader2 icon
- Handle error state with retry button
- Handle empty state with helpful message
- Integrate DeleteConfirmDialog

### 12. Delete Confirmation Dialog

You MUST implement:
- Use shadcn/ui AlertDialog component
- Show warning message about irreversible action
- Cancel and Delete (destructive style) buttons

### 13. Transaction Chart Component

You MUST implement:
- Use Recharts PieChart with Pie, Cell, Tooltip, Legend
- Aggregate transactions by category
- Display percentage labels on pie slices
- Show total amount below chart
- Color-code total (green for income, red for outcome)
- Use shadcn/ui Card component
- Handle loading and empty states

### 14. Main App Component

You MUST create `src/App.tsx`:
- Use shadcn/ui Tabs for Income/Outcome navigation
- Manage active tab state
- Manage editing transaction state
- Grid layout: 2 columns for form+table, 1 column for chart (responsive)
- Pass editingTransaction to form and clear on success
- Include header with title and description

## Component Organization

```
src/
├── components/
│   ├── ui/                       // shadcn/ui (auto-generated)
│   ├── TransactionTable.tsx
│   ├── TransactionForm.tsx
│   ├── TransactionChart.tsx
│   └── DeleteConfirmDialog.tsx
├── hooks/
│   └── useTransactions.ts
├── mocks/
│   ├── handlers.ts
│   └── browser.ts
├── types/
│   └── transaction.ts
├── App.tsx
├── main.tsx
└── index.css
```

## Styling Requirements

You MUST follow these principles:
- Use shadcn/ui components for all UI elements
- Use path aliases (`@/`) for all imports
- Use Tailwind utility classes for custom styling
- Implement responsive design (mobile-first)
- Use semantic HTML elements
- Maintain accessibility through shadcn/ui built-in features

## Quality Standards

### Code Quality
- TypeScript strict mode with no `any` types
- Proper error handling in all async operations
- Loading states for all data fetching
- Empty states with helpful messages
- Proper form validation (required fields)

### Performance
- TanStack Query caching configured correctly
- Query invalidation after mutations
- Optimistic updates through automatic refetch

### Accessibility
- Proper ARIA labels on interactive elements
- Keyboard navigation support
- Screen reader friendly
- Sufficient color contrast

## Success Criteria

Your application is complete when:
- ✅ Both income and outcome tabs function correctly
- ✅ All CRUD operations work with MSW
- ✅ Data persists within session (MSW in-memory)
- ✅ Tables display all transaction data properly
- ✅ Forms handle create and edit operations
- ✅ Delete confirmations prevent accidental deletion
- ✅ Charts visualize data by category
- ✅ TanStack Query manages caching/invalidation
- ✅ Path aliases work (`@/` imports)
- ✅ TypeScript compiles without errors
- ✅ Responsive on mobile, tablet, and desktop
- ✅ Loading and error states handled gracefully

## Testing Checklist

Verify these work correctly:
1. Switch between Income and Outcome tabs
2. Add new transaction in each tab
3. Edit existing transaction
4. Delete transaction with confirmation
5. View updated charts after changes
6. Check responsive layout on different screen sizes
7. Verify TanStack Query DevTools show proper cache
8. Test error states (simulate by breaking API calls)
9. Test empty states (delete all transactions)

## Optional Enhancements

You MAY add:
- shadcn/ui Select for predefined categories
- shadcn/ui Badge for transaction counts
- shadcn/ui Toast for success/error notifications
- shadcn/ui Calendar for date selection
- Dark mode support (shadcn/ui built-in)
- Additional chart types (bar, line)
- Summary statistics cards
- Search and filter functionality
- Export to CSV
- localStorage persistence

## Reference Documentation

- shadcn/ui: https://ui.shadcn.com/docs
- TanStack Query: https://tanstack.com/query/latest
- MSW: https://mswjs.io/docs
- Tailwind CSS: https://tailwindcss.com/docs
- Recharts: https://recharts.org/
