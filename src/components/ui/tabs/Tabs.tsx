import { Tabs as HeroUITabs, type TabsProps as HeroUITabsProps } from '@heroui/react';
import type { ReactNode } from 'react';

export interface TabsProps extends Omit<HeroUITabsProps, 'defaultSelectedKey' | 'selectedKey' | 'onSelectionChange'> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
  className?: string;
}

export interface TabsListProps {
  children: ReactNode;
  className?: string;
}

export interface TabsTriggerProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export interface TabsContentProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export const Tabs = ({ defaultValue, value, onValueChange, children, className }: TabsProps) => {
  return (
    <HeroUITabs
      defaultSelectedKey={defaultValue}
      selectedKey={value}
      onSelectionChange={(key) => onValueChange?.(key as string)}
      className={className}
    >
      {children}
    </HeroUITabs>
  );
};

export const TabsList = ({ children, className }: TabsListProps) => {
  return (
    <HeroUITabs.ListContainer className={className}>
      <HeroUITabs.List>
        {children}
      </HeroUITabs.List>
    </HeroUITabs.ListContainer>
  );
};

export const TabsTrigger = ({ value, children, className }: TabsTriggerProps) => {
  return (
    <HeroUITabs.Tab id={value} className={className}>
      {children}
      <HeroUITabs.Indicator />
    </HeroUITabs.Tab>
  );
};

export const TabsContent = ({ value, children, className }: TabsContentProps) => {
  return (
    <HeroUITabs.Panel id={value} className={className}>
      {children}
    </HeroUITabs.Panel>
  );
};
