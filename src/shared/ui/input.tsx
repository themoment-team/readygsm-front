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
        'min-w-0 rounded-[0.5rem] border bg-white px-3 py-2 text-sm leading-5 font-normal text-[#292B2F] transition-colors outline-none placeholder:text-[#94A3B8] disabled:cursor-not-allowed disabled:opacity-50',
        error
          ? 'border-[#F04636] hover:border-[#F04636] focus-visible:border-[#F04636]'
          : 'border-[#CBD5E1] hover:border-[#97A2AE] focus-visible:border-[#4A80F8]',
        className,
      )}
      {...props}
    />
  );
}

export { Input };
