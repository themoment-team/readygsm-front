import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/lib';

const buttonVariants = cva(
  'inline-flex shrink-0 items-center justify-center whitespace-nowrap border text-sm leading-5 font-semibold transition-colors outline-none select-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        neutral: 'cursor-not-allowed border-transparent bg-base-fill text-slate-utility',
        primary:
          'cursor-pointer border-transparent bg-brand-primary text-pure-white hover:bg-brand-primary/90',
        danger:
          'cursor-pointer border-transparent bg-error-red text-pure-white hover:bg-error-red/90',
        outlinePrimary:
          'cursor-pointer border-brand-primary bg-transparent text-brand-primary hover:bg-brand-primary/10',
        outlineDanger:
          'cursor-pointer border-error-red bg-transparent text-error-red hover:bg-error-red/10 ',
      },
      size: {
        sm: 'h-9 rounded-[0.5rem] px-4',
        md: 'h-11 rounded-[0.5rem] px-6',
        full: 'h-13 w-full rounded-[0.5rem] px-4',
      },
    },
    defaultVariants: {
      variant: 'neutral',
      size: 'md',
    },
  },
);

function Button({
  className,
  variant = 'neutral',
  size = 'md',
  disabled,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  const isDisabled = variant === 'neutral' || Boolean(disabled);

  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={isDisabled}
      {...props}
    />
  );
}

export { Button, buttonVariants };
