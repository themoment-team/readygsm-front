'use client';

import { toast } from 'react-toastify';

import { getApiErrorMessage, getApiErrorStatus } from '@shared/api';
import { ConfirmModal } from '@shared/ui';

import { useCancelApply } from '@/features/cancelApply/model/useCancelApply';
import { trackEvent } from '@/shared/lib';

interface CancelApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: number;
  activityId: number;
}

const CancelApplyModal = ({ isOpen, onClose, userId, activityId }: CancelApplyModalProps) => {
  const { cancelApply, isPending } = useCancelApply(userId, activityId);

  const handleConfirm = () => {
    trackEvent('apply_cancel_submit', { activity_id: activityId });

    cancelApply(undefined, {
      onSuccess: () => {
        trackEvent('apply_cancel_success', { activity_id: activityId });
        toast.success('학과 체험이 취소되었습니다.');
        onClose();
      },
      onError: (error) => {
        trackEvent('apply_cancel_error', {
          activity_id: activityId,
          status: getApiErrorStatus(error) ?? 'unknown',
        });
        toast.error(getApiErrorMessage(error, '취소 중 오류가 발생했습니다.'));
      },
    });
  };

  return (
    <ConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      title="학과 체험 취소"
      description="정말 학과 체험을 취소하시겠습니까?"
      isPending={isPending}
    />
  );
};

export default CancelApplyModal;
