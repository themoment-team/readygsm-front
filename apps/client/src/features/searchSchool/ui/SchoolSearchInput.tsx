import { SearchIcon } from '@shared/assets';
import { cn } from '@shared/lib';

import type { SchoolType } from '../model/types';

interface SchoolSearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  schools: SchoolType[];
  onSelect: (school: SchoolType) => void;
  focusedIndex: number;
}

const SchoolSearchInput = ({
  value,
  onChange,
  onKeyDown,
  schools,
  onSelect,
  focusedIndex,
}: SchoolSearchInputProps) => {
  return (
    <div className={cn('relative')}>
      <div
        className={cn(
          'bg-pure-white flex w-full items-center justify-between gap-2 rounded-[0.5rem] border py-2 pr-4 pl-3',
          value ? 'border-brand-primary' : 'border-border-variant',
        )}
      >
        <input
          className={cn(
            'text-neutral-dark placeholder:text-slate-utility w-full bg-transparent text-sm outline-none',
          )}
          placeholder="학교명을 입력하세요"
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
        <span className={cn('flex size-4.5 shrink-0 items-center justify-center')}>
          <SearchIcon />
        </span>
      </div>
      {schools.length > 0 && (
        <div
          className={cn(
            'border-border-variant bg-pure-white absolute top-full left-0 z-60 mt-2 w-full rounded-[0.5rem] border p-1 shadow-md',
          )}
        >
          <div
            className={cn(
              '[&::-webkit-scrollbar-thumb]:bg-neutral-light max-h-40 overflow-y-auto [scrollbar-color:var(--border-variant)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full',
            )}
          >
            {schools.map((school, index) => (
              <button
                key={school.SD_SCHUL_CODE}
                type="button"
                className={cn(
                  'flex w-full cursor-pointer items-center gap-2 rounded-[0.5rem] py-1.5 pr-2 pl-3 text-left',
                  index === focusedIndex ? 'bg-base-fill' : 'hover:bg-base-fill',
                )}
                onClick={() => onSelect(school)}
              >
                <span className={cn('text-neutral-dark shrink-0 text-sm')}>{school.SCHUL_NM}</span>
                <span className={cn('text-slate-utility truncate text-[0.6875rem]')}>
                  {school.ORG_RDNMA}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SchoolSearchInput;
