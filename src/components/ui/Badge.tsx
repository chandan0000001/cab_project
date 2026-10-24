import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'brand' | 'navy' | 'amber' | 'emerald' | 'gray' | 'outline';
  size?: 'sm' | 'md';
}

export function Badge({
  className,
  variant = 'brand',
  size = 'md',
  children,
  ...props
}: BadgeProps) {
  const variants = {
    brand: 'bg-brand-50 text-brand-800 border-brand-200/80',
    navy: 'bg-navy-100 text-navy-800 border-navy-200',
    amber: 'bg-amber-50 text-amber-800 border-amber-200',
    emerald: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    gray: 'bg-stone-100 text-stone-700 border-stone-200',
    outline: 'bg-transparent text-navy-700 border-navy-200',
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 tracking-wide uppercase font-semibold',
    md: 'text-xs px-2.5 py-1 font-medium',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
