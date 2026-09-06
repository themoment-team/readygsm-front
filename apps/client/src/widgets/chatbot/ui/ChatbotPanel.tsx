'use client';

import { useEffect, useRef, useState } from 'react';

import { ArrowUp, Square, X } from 'lucide-react';

import { cn } from '@shared/lib';

import { CHAT_MESSAGE_MAX_LENGTH, useChatStream } from '@/features/chat';

import ChatMessage from './ChatMessage';

interface ChatbotPanelProps {
  onClose: () => void;
  onUnauthorized: () => void;
}

const ChatbotPanel = ({ onClose, onUnauthorized }: ChatbotPanelProps) => {
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const { messages, isStreaming, send, abort, retry } = useChatStream({ onUnauthorized });

  const isOverLength = input.length > CHAT_MESSAGE_MAX_LENGTH;
  const isSendable = input.trim().length > 0 && !isOverLength && !isStreaming;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isSendable) return;

    send(input);
    setInput('');
  };

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    /**
     * 세로 가운데 정렬은 이 래퍼가 맡는다. 패널에 -translate-y-1/2을 주면
     * slide-in 키프레임이 transform을 덮어써서 정렬이 흔들린다.
     * 화면 오른쪽 전체를 덮는 래퍼라 클릭은 통과시키고 패널만 받는다.
     */
    <div
      className={cn(
        'pointer-events-none fixed inset-y-0 right-6 z-50 flex items-center lg:right-32',
      )}
    >
      <div
        role="dialog"
        aria-label="Ready, GSM 챗봇"
        className={cn(
          'pointer-events-auto flex w-[calc(100vw-3rem)] max-w-90 flex-col overflow-hidden',
          'h-[min(31.25rem,calc(100dvh-6rem))]',
          'bg-ghost-white border-neutral-light rounded-2xl border border-solid',
          'shadow-[0_0.5rem_2rem_rgba(0,5,28,0.16)]',
          'animate-in fade-in slide-in-from-right-4 duration-200',
        )}
      >
        <div className={cn('bg-brand-primary text-pure-white flex items-center gap-3 px-5 py-4')}>
          <div className={cn('flex flex-1 flex-col gap-0.5')}>
            <span className={cn('text-base leading-5 font-semibold')}>Ready, GSM 챗봇</span>
            <span className={cn('text-xs leading-4 opacity-80')}>
              학과 체험 · 입학설명회 무엇이든 물어보세요
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="챗봇 닫기"
            className={cn(
              'flex size-8 cursor-pointer items-center justify-center rounded-full',
              'transition-colors hover:bg-white/20',
            )}
          >
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        <div ref={scrollRef} className={cn('flex flex-1 flex-col gap-3 overflow-y-auto p-4')}>
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} onRetry={retry} />
          ))}
        </div>

        <form
          onSubmit={handleSubmit}
          className={cn(
            'bg-pure-white border-neutral-light flex flex-col gap-1 border-t border-solid p-3',
          )}
        >
          <div className={cn('flex items-center gap-2')}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isStreaming}
              placeholder={isStreaming ? '답변을 받는 중이에요' : '궁금한 점을 입력해주세요'}
              aria-label="질문 입력"
              className={cn(
                'bg-base-fill text-neutral-dark placeholder:text-slate-utility',
                'h-11 min-w-0 flex-1 rounded-full px-4 text-sm outline-none',
                'focus-visible:ring-brand-primary/30 focus-visible:ring-2',
                'disabled:cursor-not-allowed',
                isOverLength && 'ring-error-red/40 ring-2',
              )}
            />

            {isStreaming ? (
              <button
                type="button"
                onClick={abort}
                aria-label="답변 중단"
                className={cn(
                  'bg-base-fill text-neutral-dark hover:bg-surface-container',
                  'flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors',
                )}
              >
                <Square size={16} strokeWidth={2.5} fill="currentColor" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={!isSendable}
                aria-label="질문 보내기"
                className={cn(
                  'flex size-11 shrink-0 items-center justify-center rounded-full transition-colors',
                  isSendable
                    ? 'bg-brand-primary text-pure-white hover:bg-brand-primary/90 cursor-pointer'
                    : 'bg-base-fill text-slate-utility cursor-not-allowed',
                )}
              >
                <ArrowUp size={20} strokeWidth={2.5} />
              </button>
            )}
          </div>

          {input.length > 0 && (
            <span
              className={cn(
                'px-2 text-right text-xs leading-4',
                isOverLength ? 'text-error-red' : 'text-slate-utility',
              )}
            >
              {input.length} / {CHAT_MESSAGE_MAX_LENGTH}
            </span>
          )}
        </form>
      </div>
    </div>
  );
};

export default ChatbotPanel;
