import { AlertDialog as HeroUIAlertDialog, Button, type AlertDialogProps as HeroUIAlertDialogProps } from '@heroui/react';
import type { ReactNode } from 'react';

export interface AlertDialogProps extends HeroUIAlertDialogProps {
  children: ReactNode;
}

export interface AlertDialogTriggerProps {
  children: ReactNode;
}

export interface AlertDialogContentProps {
  children: ReactNode;
  className?: string;
}

export interface AlertDialogHeaderProps {
  children: ReactNode;
  className?: string;
}

export interface AlertDialogTitleProps {
  children: ReactNode;
  className?: string;
}

export interface AlertDialogDescriptionProps {
  children: ReactNode;
  className?: string;
}

export interface AlertDialogFooterProps {
  children: ReactNode;
  className?: string;
}

export interface AlertDialogActionProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export interface AlertDialogCancelProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export const AlertDialog = ({ children }: AlertDialogProps) => {
  return (
    <HeroUIAlertDialog>
      {children}
    </HeroUIAlertDialog>
  );
};

export const AlertDialogTrigger = ({ children }: AlertDialogTriggerProps) => {
  return children;
};

export const AlertDialogContent = ({ children, className }: AlertDialogContentProps) => {
  return (
    <HeroUIAlertDialog.Backdrop>
      <HeroUIAlertDialog.Container>
        <HeroUIAlertDialog.Dialog className={className}>
          {children}
        </HeroUIAlertDialog.Dialog>
      </HeroUIAlertDialog.Container>
    </HeroUIAlertDialog.Backdrop>
  );
};

export const AlertDialogHeader = ({ children, className }: AlertDialogHeaderProps) => {
  return (
    <HeroUIAlertDialog.Header className={className}>
      {children}
    </HeroUIAlertDialog.Header>
  );
};

export const AlertDialogTitle = ({ children, className }: AlertDialogTitleProps) => {
  return (
    <HeroUIAlertDialog.Heading className={className}>
      {children}
    </HeroUIAlertDialog.Heading>
  );
};

export const AlertDialogDescription = ({ children, className }: AlertDialogDescriptionProps) => {
  return (
    <HeroUIAlertDialog.Body className={className}>
      {children}
    </HeroUIAlertDialog.Body>
  );
};

export const AlertDialogFooter = ({ children, className }: AlertDialogFooterProps) => {
  return (
    <HeroUIAlertDialog.Footer className={className}>
      {children}
    </HeroUIAlertDialog.Footer>
  );
};

export const AlertDialogAction = ({ children, onClick, className }: AlertDialogActionProps) => {
  const handlePress = () => {
    onClick?.();
  };

  return (
    <Button onPress={handlePress} className={className} variant="danger" slot="close">
      {children}
    </Button>
  );
};

export const AlertDialogCancel = ({ children, onClick, className }: AlertDialogCancelProps) => {
  const handlePress = () => {
    onClick?.();
  };

  return (
    <Button onPress={handlePress} className={className} variant="secondary" slot="close">
      {children}
    </Button>
  );
};
