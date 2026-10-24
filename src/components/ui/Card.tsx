import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export function Card({
  className,
  hoverEffect = false,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-2xl border border-navy-200/80 shadow-card overflow-hidden transition-all duration-300',
        hoverEffect && 'hover:shadow-card-hover hover:border-brand-400/80 hover:-translate-y-1',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
