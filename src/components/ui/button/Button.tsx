import { Button as HeroUIButton, type ButtonProps as HeroUIButtonProps } from '@heroui/react';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'ghost'
  | 'danger'
  | 'danger-soft'
  | 'default'
  | 'destructive'
  | 'outline';

type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

export interface ButtonProps extends Omit<HeroUIButtonProps, 'onPress' | 'variant' | 'size'> {
  onClick?: () => void;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = ({ onClick, onPress, variant = 'primary', size = 'md', ...props }: ButtonProps) => {
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (onClick) {
      onClick();
    }
  };

  // Map custom variants to HeroUI variants
  let heroVariant: HeroUIButtonProps['variant'] = 'primary';
  if (variant === 'destructive' || variant === 'danger') {
    heroVariant = 'danger';
  } else if (variant === 'default' || variant === 'primary') {
    heroVariant = 'primary';
  } else if (variant === 'outline' || variant === 'ghost') {
    heroVariant = 'secondary';
  } else if (variant === 'secondary' || variant === 'tertiary' || variant === 'danger-soft') {
    heroVariant = variant as HeroUIButtonProps['variant'];
  }

  // Map size, HeroUI doesn't have 'icon' size, use 'sm' instead
  const heroSize: HeroUIButtonProps['size'] = size === 'icon' ? 'sm' : size;

  return (
    <HeroUIButton
      {...props}
      variant={heroVariant}
      size={heroSize}
      onPress={handlePress}
    />
  );
};
