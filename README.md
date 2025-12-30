# Income/Outcome Note Application

A modern, responsive income/outcome tracking application built with React, TanStack Query, shadcn/ui, and Tailwind CSS.

## Features

- 📊 **Dual Tab Navigation**: Separate tabs for Income and Outcome transactions
- ✨ **Full CRUD Operations**: Create, Read, Update, and Delete transactions
- 📈 **Visual Analytics**: Interactive pie charts showing category distribution
- 💾 **Data Persistence**: In-memory storage using MSW (Mock Service Worker)
- 🎨 **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- ⚡ **Smart Caching**: Powered by TanStack Query for efficient data management
- 📱 **Responsive Design**: Works seamlessly on mobile, tablet, and desktop

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **TanStack Query v5** - Data fetching and caching
- **shadcn/ui** - UI component library
- **Tailwind CSS v4** - Styling
- **Recharts** - Data visualization
- **MSW** - API mocking
- **Vite** - Build tool

## Getting Started

### Prerequisites

- Node.js 18+ and npm/pnpm/yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── ui/                       # shadcn/ui components
│   ├── TransactionTable.tsx      # Transaction data table
│   ├── TransactionForm.tsx       # Create/Edit form
│   ├── TransactionChart.tsx      # Pie chart visualization
│   └── DeleteConfirmDialog.tsx   # Delete confirmation dialog
├── hooks/
│   └── useTransactions.ts        # TanStack Query hooks
├── mocks/
│   ├── handlers.ts               # MSW API handlers
│   └── browser.ts                # MSW browser setup
├── types/
│   └── transaction.ts            # TypeScript type definitions
├── App.tsx                       # Main application component
├── main.tsx                      # Application entry point
└── index.css                     # Global styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features in Detail

### Transaction Management

- Add new transactions with amount, category, date, and description
- Edit existing transactions
- Delete transactions with confirmation dialog
- Automatic form validation

### Data Visualization

- Pie charts showing category-based spending/income distribution
- Percentage labels on chart segments
- Total amount display
- Color-coded for income (green) and outcome (red)

### User Experience

- Loading states with spinners
- Error handling with retry options
- Empty states with helpful messages
- Smooth transitions and animations
- Keyboard navigation support
- Accessibility-friendly components

## Development

The application uses MSW (Mock Service Worker) to simulate API endpoints during development. All data is stored in memory and will be reset when the page is refreshed.

### TanStack Query DevTools

The React Query DevTools are enabled in development mode. Click the TanStack Query icon in the bottom corner to inspect queries and mutations.

## Building for Production

```bash
npm run build
```

The production build will be created in the `dist` directory.

## License

MIT

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [TanStack Query](https://tanstack.com/query) for powerful data synchronization
- [MSW](https://mswjs.io/) for seamless API mocking
