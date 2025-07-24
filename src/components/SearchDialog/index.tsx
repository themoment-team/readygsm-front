import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

import { useDebounce } from '@/hooks';
import { cn } from '@/lib/utils';

interface SearchDialogProps {
  setValue: Dispatch<SetStateAction<string>>;
}

interface SchoolType {
  SCHUL_NM: string;
  ORG_RDNMA: string;
}

const SearchDialog: React.FC<SearchDialogProps> = ({ setValue }) => {
  const [open, setOpen] = useState(false);
  const [schools, setSchools] = useState<SchoolType[]>([]);
  const [keyword, setKeyword] = useState('');
  const [isSelecting, setIsSelecting] = useState(false);
  const debouncedKeyword = useDebounce(keyword, 400);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const getSchools = async () => {
    if (debouncedKeyword.trim() === '') {
      setSchools([]);
      return;
    }
    try {
      const response = await fetch(
        `https://open.neis.go.kr/hub/schoolInfo?KEY=${process.env.NEXT_PUBLIC_NEIS_API_KEY}&Type=json&SCHUL_NM=${debouncedKeyword}&SCHUL_KND_SC_NM='중학교'`,
      );
      const data = await response.json();
      const rows = data?.schoolInfo?.[1]?.row || [];
      setSchools(rows);
    } catch {
      setSchools([]);
    }
  };

  useEffect(() => {
    if (isSelecting) {
      setIsSelecting(false);
      return;
    }
    if (debouncedKeyword) {
      getSchools();
    } else {
      setSchools([]);
    }
    // eslint-disable-next-line
  }, [debouncedKeyword]);

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleSchoolSelect = (school: SchoolType) => {
    setKeyword(school.SCHUL_NM);
    setSchools([]);
    setIsSelecting(true);
    setValue(school.SCHUL_NM);
  };

  const handleClose = () => {
    setOpen(false);
    setKeyword('');
    setSchools([]);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(['px-4', 'py-2', 'rounded', 'bg-black', 'text-white', 'font-semibold'])}
      >
        학교 찾기
      </button>
      {open && (
        <div
          className={cn([
            'fixed',
            'inset-0',
            'bg-black',
            'bg-opacity-30',
            'z-[1000]',
            'flex',
            'items-center',
            'justify-center',
          ])}
          onClick={handleClose}
        >
          <div
            className={cn([
              'bg-white',
              'rounded-xl',
              'min-w-[400px]',
              'max-w-[500px]',
              'p-8',
              'shadow-2xl',
              'relative',
            ])}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className={cn(['text-[20px]', 'font-bold', 'mb-4'])}>내 중학교 찾기</h2>
            <form onSubmit={handleFormSubmit} className={cn(['flex', 'flex-col', 'gap-4'])}>
              <input
                ref={inputRef}
                type="text"
                placeholder="학교명 검색"
                value={keyword}
                onChange={handleKeywordChange}
                className={cn([
                  'w-full',
                  'p-2',
                  'rounded',
                  'border',
                  'border-gray-300',
                  'text-base',
                ])}
              />
              <div className={cn(['max-h-[200px]', 'overflow-y-auto', 'mb-2'])}>
                {schools.length > 0 && (
                  <ul className={cn(['list-none', 'p-0', 'm-0'])}>
                    {schools.map((school, idx) => (
                      <li
                        key={school.SCHUL_NM + idx}
                        className={cn([
                          'p-2',
                          'cursor-pointer',
                          'border-b',
                          'border-gray-200',
                          'hover:bg-gray-100',
                        ])}
                        onClick={() => handleSchoolSelect(school)}
                      >
                        <div className={cn(['font-semibold'])}>{school.SCHUL_NM}</div>
                        <div className={cn(['text-xs', 'text-gray-500'])}>{school.ORG_RDNMA}</div>
                      </li>
                    ))}
                  </ul>
                )}
                {schools.length === 0 && keyword && (
                  <div className={cn(['text-gray-400', 'text-sm', 'p-2'])}>
                    검색 결과가 없습니다.
                  </div>
                )}
              </div>
              <div className={cn(['flex', 'justify-end', 'gap-2'])}>
                <button
                  type="button"
                  onClick={handleClose}
                  className={cn([
                    'px-4',
                    'py-2',
                    'rounded',
                    'bg-green-500',
                    'text-white',
                    'font-semibold',
                  ])}
                >
                  확인
                </button>
              </div>
            </form>
            <button
              type="button"
              onClick={handleClose}
              className={cn([
                'absolute',
                'top-3',
                'right-3',
                'bg-transparent',
                'border-none',
                'text-2xl',
                'text-gray-400',
                'hover:text-gray-600',
                'cursor-pointer',
              ])}
              aria-label="닫기"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchDialog;
