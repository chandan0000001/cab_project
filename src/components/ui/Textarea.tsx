import { forwardRef, TextareaHTMLAttributes, useId } from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  containerClassName?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      helperText,
      id,
      className,
      containerClassName,
      required,
      disabled,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const textareaId = id || generatedId;
    const errorId = `${textareaId}-error`;
    const helperId = `${textareaId}-helper`;

    return (
      <div className={cn('w-full flex flex-col gap-1.5', containerClassName)}>
        {label && (
          <label
            htmlFor={textareaId}
            className="text-xs font-semibold text-navy-800 tracking-wide flex items-center justify-between"
          >
            <span>
              {label} {required && <span className="text-red-500 font-bold">*</span>}
            </span>
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          className={cn(
            'w-full bg-white text-navy-900 border text-sm rounded-lg p-3 transition-colors placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-brand-600 disabled:bg-navy-50 disabled:text-navy-400 disabled:cursor-not-allowed resize-y',
            error
              ? 'border-red-400 focus:ring-red-500 focus:border-red-500 bg-red-50/20'
              : 'border-navy-200 hover:border-navy-300',
            className
          )}
          {...props}
        />
        {error && (
          <p id={errorId} className="text-xs text-red-600 font-medium">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p id={helperId} className="text-xs text-navy-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
