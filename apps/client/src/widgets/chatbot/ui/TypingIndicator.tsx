import { cn } from '@shared/lib';

const DOT_DELAYS = ['0ms', '150ms', '300ms'];

const TypingIndicator = () => (
  <div
    role="status"
    aria-label="답변을 준비하고 있어요"
    className={cn(
      'bg-pure-white border-neutral-light flex items-center gap-1.5 rounded-2xl rounded-tl-sm border border-solid px-4 py-4',
    )}
  >
    {DOT_DELAYS.map((delay) => (
      <span
        key={delay}
        style={{ animationDelay: delay }}
        className={cn('bg-slate-utility size-1.5 animate-bounce rounded-full')}
      />
    ))}
  </div>
);

export default TypingIndicator;
