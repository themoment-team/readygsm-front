import * as React from 'react';

import { Input as InputPrimitive } from '@base-ui/react/input';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/lib';

const inputVariants = cva(
  'min-w-0 rounded-[8px] border bg-white px-3 py-2 text-sm leading-5 font-normal text-[#292B2F] outline-none transition-colors placeholder:text-[#94A3B8] disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        /** Default variant */
        default: 'border-[#CBD5E1] hover:border-[#97A2AE]',
        /** Selected variant */
        selected: 'border-[#4A80F8]',
        /** Error variant */
        error: 'border-[#F04636]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

function Input({
  className,
  type,
  variant = 'default',
  ...props
}: React.ComponentProps<'input'> & VariantProps<typeof inputVariants>) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(inputVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Input, inputVariants };
