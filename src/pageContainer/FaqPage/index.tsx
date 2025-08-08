'use client';

import { useState } from 'react';

import { FaqToggle } from '@/assets';
import { cn } from '@/lib/utils';

type FaqElementProps = {
  title: string;
  content: string;
  showContent: boolean;
  onToggle: () => void;
};

const FaqElement = ({ title, content, showContent, onToggle }: FaqElementProps) => {
  return (
    <div
      onClick={onToggle}
      className={cn(
        'cursor-pointer',
        'bg-gray-50',
        'rounded-lg',
        'py-[1.25rem]',
        'px-[2rem]',
        'select-none',
        'transition-all',
        'duration-300',
      )}
    >
      <div className="flex items-center justify-between text-[1rem] font-[600] text-blue-700">
        {title}
        <FaqToggle rotated={showContent} />
      </div>
      {showContent && (
        <div className="mt-2 whitespace-pre-wrap text-[0.875rem] leading-relaxed text-blue-700">
          {content}
        </div>
      )}
    </div>
  );
};

const FaqPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Q. example text',
      answer:
        'example text example text example text example text example text example text example text example text example text example text example text example text example text example text example text example text example text example text example text example text example text example text example text example text example text example text example text example text example text example text',
    },
    { question: 'Q. example text', answer: '' },
    { question: 'Q. example text', answer: '' },
    { question: 'Q. example text', answer: '' },
    { question: 'Q. example text', answer: '' },
  ];

  const toggleFaqContent = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div
      className={cn('flex', 'flex-col', 'min-h-screen', 'justify-between', 'bg-white', 'pb-[9rem]')}
    >
      <div className={cn('flex', 'justify-center', 'items-center', 'w-full', 'bg-white', 'py-20')}>
        <div className={cn('flex', 'w-[38.75rem]', 'flex-col', 'items-center', 'gap-10', 'px-4')}>
          <p
            className={cn(
              'text-black',
              'text-center',
              'text-[1.875rem]',
              'font-[600]',
              'pb-[4.625rem]',
            )}
          >
            자주 묻는 질문
          </p>

          <div className={cn('w-full', 'flex', 'flex-col', 'gap-4')}>
            {faqs.map((faq, index) => (
              <FaqElement
                key={index}
                title={faq.question}
                content={faq.answer}
                showContent={openIndex === index}
                onToggle={() => toggleFaqContent(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
