import { Input as HeroUIInput, type InputProps as HeroUIInputProps } from '@heroui/react';

export interface InputProps extends Omit<HeroUIInputProps, 'size'> {
  className?: string;
  fullWidth?: boolean;
}

export const Input = ({ className, fullWidth, ...props }: InputProps) => {
  return (
    <HeroUIInput
      {...props}
      className={className}
      fullWidth={fullWidth}
    />
  );
};
