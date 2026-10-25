import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { sound } from '@/lib/sound';
import { haptics } from '@/lib/haptics';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'whatsapp' | 'danger' | 'book-cab';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  silent?: boolean;
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
      onClick,
      silent = false,
      ...props
    },
    ref
  ) => {
    const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
      if (!silent && (e.pointerType === 'touch' || e.pointerType === 'pen')) {
        haptics.impactLight(true);
      }
      props.onPointerDown?.(e);
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!silent) {
        if (variant === 'whatsapp') {
          sound.playWhatsApp();
        } else if (variant === 'book-cab' || (variant === 'primary' && size === 'lg')) {
          haptics.impactHeavy(true);
          sound.playTap();
        } else if (variant === 'danger') {
          haptics.error(true);
          sound.playTap();
        } else {
          haptics.impactMedium(true);
          sound.playTap();
        }
      }
      onClick?.(e);
    };
    const baseStyles =
      'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed select-none active:scale-[0.98] cursor-pointer whitespace-nowrap';

    const variants = {
      primary:
        'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-sm hover:-translate-y-0.5 focus-visible:ring-blue-500 font-bold',
      secondary:
        'bg-slate-900 text-white hover:bg-black active:bg-slate-800 shadow-sm hover:-translate-y-0.5 focus-visible:ring-slate-900 font-semibold',
      outline:
        'border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 hover:text-slate-950 shadow-xs hover:-translate-y-0.5 focus-visible:ring-slate-400 font-semibold',
      ghost:
        'text-slate-700 hover:bg-slate-100 hover:text-blue-600 focus-visible:ring-blue-500',
      whatsapp:
        'bg-[#1F6F3F] hover:bg-[#155A30] active:bg-[#0F4222] text-white shadow-sm hover:-translate-y-0.5 focus-visible:ring-emerald-600 font-semibold',
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
        onClick={handleClick}
        onPointerDown={handlePointerDown}
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
