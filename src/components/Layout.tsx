import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Tabs, Tab, Button } from '@heroui/react';
import { useTranslation } from 'react-i18next';

export function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const currentTab = location.pathname.substring(1) || 'income';

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'uk' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Income/Outcome Notes</h1>
            <p className="text-gray-600 mt-2">Track your financial transactions</p>
          </div>
          <Button
            variant="bordered"
            size="sm"
            onPress={toggleLanguage}
          >
            {i18n.language === 'en' ? 'UK' : 'EN'}
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs
          selectedKey={currentTab}
          onSelectionChange={(key) => navigate(`/${key}`)}
          className="mb-8"
        >
          <Tab
            key="income"
            title={t('income')}
          />
          <Tab
            key="outcome"
            title={t('outcome')}
          />
        </Tabs>

        <Outlet />
      </main>
    </div>
  );
}
