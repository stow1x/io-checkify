import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Form labels
      amount: 'Amount',
      category: 'Category',
      date: 'Date',
      description: 'Description',

      // Placeholders
      amountPlaceholder: '0.00',
      categoryPlaceholder: 'e.g., Salary, Rent, Groceries',
      descriptionPlaceholder: 'Optional notes',

      // Actions
      add: 'Add',
      edit: 'Edit',
      update: 'Update',
      cancel: 'Cancel',
      delete: 'Delete',

      // Types
      income: 'Income',
      outcome: 'Outcome',

      // Titles
      addIncome: 'Add Income',
      addOutcome: 'Add Outcome',
      editIncome: 'Edit Income',
      editOutcome: 'Edit Outcome',
      transactions: 'Transactions',
      categoryDistribution: 'Category Distribution',

      // Messages
      noData: 'No data to display. Add some transactions first.',
      failedToLoad: 'Failed to load chart data',
      total: 'Total',

      // Delete dialog
      deleteConfirmTitle: 'Are you sure?',
      deleteConfirmMessage: 'This action cannot be undone.',
    },
  },
  uk: {
    translation: {
      // Form labels
      amount: 'Сума',
      category: 'Категорія',
      date: 'Дата',
      description: 'Опис',

      // Placeholders
      amountPlaceholder: '0.00',
      categoryPlaceholder: 'напр., Зарплата, Оренда, Продукти',
      descriptionPlaceholder: 'Додаткові нотатки',

      // Actions
      add: 'Додати',
      edit: 'Редагувати',
      update: 'Оновити',
      cancel: 'Скасувати',
      delete: 'Видалити',

      // Types
      income: 'Дохід',
      outcome: 'Витрата',

      // Titles
      addIncome: 'Додати Дохід',
      addOutcome: 'Додати Витрату',
      editIncome: 'Редагувати Дохід',
      editOutcome: 'Редагувати Витрату',
      transactions: 'Транзакції',
      categoryDistribution: 'Розподіл за Категоріями',

      // Messages
      noData: 'Немає даних для відображення. Додайте транзакції.',
      failedToLoad: 'Не вдалося завантажити дані графіка',
      total: 'Всього',

      // Delete dialog
      deleteConfirmTitle: 'Ви впевнені?',
      deleteConfirmMessage: 'Цю дію неможливо скасувати.',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
