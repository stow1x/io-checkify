import { Label as HeroUILabel, type LabelProps as HeroUILabelProps } from '@heroui/react';
import type { ReactNode } from 'react';

export interface LabelProps extends HeroUILabelProps {
  htmlFor?: string;
  children: ReactNode;
  className?: string;
}

export const Label = ({ htmlFor, children, className }: LabelProps) => {
  return (
    <HeroUILabel htmlFor={htmlFor} className={className}>
      {children}
    </HeroUILabel>
  );
};
