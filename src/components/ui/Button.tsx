import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'whatsapp' | 'danger' | 'book-cab';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed select-none active:scale-[0.98] cursor-pointer whitespace-nowrap';

    const variants = {
      primary:
        'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-sm hover:-translate-y-0.5 focus-visible:ring-blue-500 font-bold',
      secondary:
        'bg-navy-950 text-white hover:bg-black active:bg-navy-900 shadow-sm hover:-translate-y-0.5 focus-visible:ring-navy-900',
      outline:
        'border-1.5 border-navy-800/80 bg-white text-navy-950 hover:bg-navy-950 hover:text-white shadow-subtle hover:-translate-y-0.5 focus-visible:ring-navy-500',
      ghost:
        'text-navy-700 hover:bg-sand-100 hover:text-brand-600 focus-visible:ring-brand-500',
      whatsapp:
        'bg-[#1F6F3F] hover:bg-[#155A30] active:bg-[#0F4222] text-white shadow-whatsapp hover:-translate-y-0.5 focus-visible:ring-emerald-600 font-semibold',
      danger:
        'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus-visible:ring-red-600 shadow-sm',
      'book-cab':
        'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-sm font-bold transition-all duration-200 focus-visible:ring-blue-500',
    };

    const sizes = {
      sm: 'text-xs px-3.5 py-2 gap-1.5 min-h-[38px]',
      md: 'text-sm px-5 py-2.5 gap-2 min-h-[44px]',
      lg: 'text-base px-7 py-3.5 gap-2.5 min-h-[50px] font-bold',
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin mr-2" />
        ) : (
          <>
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
