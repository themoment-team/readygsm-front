import * as React from 'react';

import { Input as InputPrimitive } from '@base-ui/react/input';

import { cn } from '@/shared/lib';

type InputProps = React.ComponentProps<'input'> & {
  error?: boolean;
};

function Input({ className, type, error = false, ...props }: InputProps) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        'bg-pure-white text-neutral-dark placeholder:text-slate-utility min-w-0 rounded-[0.5rem] border px-3 py-2 text-sm leading-5 font-normal transition-colors outline-none disabled:cursor-not-allowed disabled:opacity-50',
        error
          ? 'border-error-red focus-visible:border-error-red'
          : 'border-border-variant hover:border-soft-gray focus-visible:border-brand-primary',
        className,
      )}
      {...props}
    />
  );
}

export { Input };
