'use client';

import { Dispatch, SetStateAction } from 'react';

import { CheckedIcon, WhiteCheckIcon } from '@/assets';
import { cn } from '@/lib/utils';

type PersonalInfoType = {
  checked: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
};

const PersonalInfo = ({ checked, setState }: PersonalInfoType) => {
  return (
    <div className={cn('w-full')}>
      <div
        className={cn(
          'flex',
          'flex-row',
          'items-center',
          'gap-2',
          'pt-3',
          'pb-4',
          'border-solid',
          'border-b',
          'border-[#CBD5E1]',
        )}
      >
        <div
          onClick={() => setState((e) => !e)}
          className={cn('w-5', 'h-5', 'cursor-pointer', 'flex', 'justify-center', 'items-center')}
        >
          {checked ? <CheckedIcon /> : <WhiteCheckIcon />}
        </div>
        <p className={cn('font-normal')}>[필수] 개인정보 수집 및 이용에 동의합니다.</p>
      </div>
      <p className={cn('text-base', 'font-medium', 'text-[#8A8A8A]', 'pt-[0.44rem]')}>
        [개인정보 수집·이용 및 제3자 제공 동의서]
        <br />
        - 수집 목적: 학과 체험 프로그램 운영
        <br />
        - 수집 항목: 본인 확인을 위한 학교명, 학번, 이름, 연락처
        <br />
        - 이용 및 보유 기간: 학과 체험 프로그램 종료 시 파기
        <br />※ 수집되는 개인정보는 상기 수집·이용 목적 이외의 다른 용도로 활용되지 않습니다.
      </p>
    </div>
  );
};

export default PersonalInfo;
