'use client';

import { cn } from '@/lib/utils';

type FeatureProps = {
  imgSrc: string;
  title: string;
  tags: string[];
  description: string;
  tagColor?: {
    bg: string;
    text: string;
  };
};

const MajorCard = ({ imgSrc, title, tags, tagColor, description }: FeatureProps) => {
  return (
    <article className={cn('rounded-[1rem]', 'bg-gray-50')}>
      <img
        src={imgSrc}
        alt={title}
        className={cn('mb-6', 'h-[13rem]', 'w-full', 'rounded-[1rem]', 'object-cover')}
      />
      <div className={cn('p-4')}>
        <h3
          className={cn(
            'mb-4',
            'whitespace-nowrap',
            'text-[1.5rem]',
            'font-semibold',
            'text-black',
          )}
        >
          {title}
        </h3>
        <div className={cn('mb-3', 'flex', 'w-max', 'gap-2', 'overflow-x-auto')}>
          {tags.map((tag) => (
            <span
              key={tag}
              className={cn('rounded-full', 'px-1.5', 'py-0.5', 'text-[0.875rem]', 'font-medium')}
              style={
                tagColor
                  ? {
                      backgroundColor: tagColor.bg,
                      color: tagColor.text,
                    }
                  : undefined
              }
            >
              #{tag}
            </span>
          ))}
        </div>
        <p className={cn('text-[1.125rem]', 'leading-relaxed', 'text-gray-500')}>{description}</p>
      </div>
    </article>
  );
};

export default MajorCard;
