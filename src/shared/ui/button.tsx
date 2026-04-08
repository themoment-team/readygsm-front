import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/lib';

const buttonVariants = cva(
  'inline-flex shrink-0 items-center justify-center whitespace-nowrap border text-sm leading-5 font-semibold transition-colors outline-none select-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        neutral: 'cursor-not-allowed border-transparent bg-[#F1F5F9] text-[#94A3B8]',
        primary: 'cursor-pointer border-transparent bg-[#4A80F8] text-white hover:bg-[#3D6BD0]',
        danger: 'cursor-pointer border-transparent bg-[#F04636] text-white hover:bg-[#D42817]',
        outlinePrimary:
          'cursor-pointer border-[#4A80F8] bg-transparent text-[#4A80F8] hover:bg-[#4A80F8]/10',
        outlineDanger:
          'cursor-pointer border-[#F04636] bg-transparent text-[#F04636] hover:bg-[#F04636]/10 ',
      },
      size: {
        sm: 'h-9 rounded-[8px] px-4',
        md: 'h-11 rounded-[8px] px-6',
        full: 'h-13 w-full rounded-[8px] px-4',
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
