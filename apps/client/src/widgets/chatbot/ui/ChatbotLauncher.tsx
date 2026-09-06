'use client';

import { useState } from 'react';

import { MessageCircle, X } from 'lucide-react';
import { toast } from 'react-toastify';

import { useGetMyInfo } from '@shared/entities/user';
import { cn } from '@shared/lib';

import { LoginModal } from '@/features/auth';

import ChatbotPanel from './ChatbotPanel';

const ChatbotLauncher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { data: user, isLoading } = useGetMyInfo();

  /** 다른 탭에서 로그아웃했거나 계정이 바뀌면 열려 있던 대화도 함께 닫힌다 */
  const isPanelOpen = isOpen && Boolean(user);

  const handleToggle = () => {
    if (isOpen) {
      setIsOpen(false);
      return;
    }

    if (isLoading) return;

    if (!user) {
      toast.error('로그인이 필요한 기능입니다.');
      setIsLoginModalOpen(true);
      return;
    }

    setIsOpen(true);
  };

  /** 스트리밍 도중 인증이 풀린 경우 — 대화를 닫고 다시 로그인시킨다 */
  const handleUnauthorized = () => {
    setIsOpen(false);
    toast.error('로그인이 필요한 기능입니다.');
    setIsLoginModalOpen(true);
  };

  return (
    <>
      {isPanelOpen && (
        <ChatbotPanel onClose={() => setIsOpen(false)} onUnauthorized={handleUnauthorized} />
      )}

      <button
        type="button"
        onClick={handleToggle}
        aria-expanded={isPanelOpen}
        aria-label={isPanelOpen ? '챗봇 닫기' : '챗봇 열기'}
        className={cn(
          'fixed top-1/2 right-6 z-50 -translate-y-1/2 lg:right-10',
          'flex size-14 cursor-pointer items-center justify-center rounded-full',
          'bg-brand-primary text-pure-white',
          'shadow-[0_0.25rem_1rem_rgba(74,128,248,0.35)]',
          'transition-[background-color,transform,scale,box-shadow] duration-200',
          'hover:bg-brand-primary/90 hover:scale-105',
          'active:scale-95',
          'focus-visible:ring-brand-primary/30 outline-none focus-visible:ring-4',
        )}
      >
        {isPanelOpen ? (
          <X size={26} strokeWidth={2} />
        ) : (
          <MessageCircle size={26} strokeWidth={2} />
        )}
      </button>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  );
};

export default ChatbotLauncher;
