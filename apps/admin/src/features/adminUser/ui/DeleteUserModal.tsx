'use client';

import { toast } from 'react-toastify';

import { ConfirmModal } from '@shared/ui';

import { useDeleteUser } from '../model/useDeleteUser';

interface DeleteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: number;
}

const DeleteUserModal = ({ isOpen, onClose, userId }: DeleteUserModalProps) => {
  const { deleteUser, isPending } = useDeleteUser(userId);

  const handleConfirm = () => {
    deleteUser(undefined, {
      onSuccess: () => {
        toast.success('신청자 정보가 삭제되었습니다.');
        onClose();
      },
      onError: () => toast.error('삭제 중 오류가 발생했습니다.'),
    });
  };

  return (
    <ConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      title="신청자 정보 삭제"
      description="정말 신청자 정보를 삭제하시겠습니까?"
      isPending={isPending}
    />
  );
};

export default DeleteUserModal;
