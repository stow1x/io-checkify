import { Card as HeroUICard, type CardProps as HeroUICardProps } from '@heroui/react';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

export interface CardProps extends HeroUICardProps {
  children?: ReactNode;
  className?: string;
}

export interface CardHeaderProps {
  children?: ReactNode;
  className?: string;
}

export interface CardTitleProps {
  children?: ReactNode;
  className?: string;
}

export interface CardContentProps {
  children?: ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps) => {
  return <HeroUICard className={cn(className)}>{children}</HeroUICard>;
};

export const CardHeader = ({ children, className }: CardHeaderProps) => {
  return <HeroUICard.Header className={cn(className)}>{children}</HeroUICard.Header>;
};

export const CardTitle = ({ children, className }: CardTitleProps) => {
  return <HeroUICard.Title className={cn(className)}>{children}</HeroUICard.Title>;
};

export const CardContent = ({ children, className }: CardContentProps) => {
  return <HeroUICard.Content className={cn(className)}>{children}</HeroUICard.Content>;
};
