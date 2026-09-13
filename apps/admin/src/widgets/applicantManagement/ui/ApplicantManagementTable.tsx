'use client';

import { useState } from 'react';

import { useGetActivityList } from '@shared/entities/activity';
import {
  type ApplicationType,
  useDownloadApplicationExcel,
  useGetAdminApplications,
} from '@shared/entities/application';
import { cn } from '@shared/lib';
import { Button, ConfirmModal } from '@shared/ui';

import { useDeleteApplicant } from '@/features/manageApplicant';

interface ApplicantManagementTableProps {
  activityId: number | null;
}

const TABLE_HEADERS = ['신청한 학과 체험', '이름', '전화번호', '학교명', '학번', ''];

const formatStudentId = ({ grade, classNumber, number }: ApplicationType) =>
  `${grade}${classNumber}${number.toString().padStart(2, '0')}`;

const ApplicantManagementTable = ({ activityId }: ApplicantManagementTableProps) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const { data: allApplications = [] } = useGetAdminApplications(activityId);
  const applications = allApplications.filter((a) => !a.isReserve);
  const { data: activityList } = useGetActivityList();
  const activities = activityList?.data ?? [];
  const { mutate: deleteApplication, isPending } = useDeleteApplicant();
  const { mutate: downloadExcel } = useDownloadApplicationExcel();

  const handleDeleteClick = (id: number) => setSelectedId(id);
  const handleCloseModal = () => setSelectedId(null);
  const handleConfirmDelete = () => {
    if (selectedId === null) return;
    deleteApplication(selectedId, { onSuccess: handleCloseModal });
  };

  const handleExcelDownload = () => {
    if (activityId === null) return;
    downloadExcel(activityId);
  };

  const isEmpty = applications.length === 0;

  return (
    <div className={cn('flex flex-col gap-8')}>
      <h1 className={cn('text-neutral-dark text-[1.875rem] leading-9 font-semibold')}>
        전체 신청자 관리
      </h1>

      <div className={cn('flex items-center justify-end')}>
        <Button
          variant="outlinePrimary"
          size="sm"
          onClick={handleExcelDownload}
          disabled={activityId === null}
        >
          엑셀 형식으로 출력
        </Button>
      </div>

      {isEmpty ? (
        <div className={cn('flex min-h-120 w-full flex-1 items-center justify-center')}>
          <p
            className={cn(
              'text-secondary-slate text-center text-xl font-semibold tracking-[-0.0375rem] whitespace-nowrap',
            )}
          >
            등록된 신청자가 없습니다
          </p>
        </div>
      ) : (
        <div className={cn('overflow-x-auto rounded-lg border border-[#e4e4e7] bg-white')}>
          <div className={cn('min-w-200')}>
            {/* 테이블 헤더 */}
            <div className={cn('flex items-stretch border-b border-[#e4e4e7]')}>
              {TABLE_HEADERS.map((header, index) => (
                <div
                  key={index}
                  className={cn(
                    'flex h-12 flex-1 items-center justify-center px-4',
                    index < TABLE_HEADERS.length - 1 && 'border-r border-[#e4e4e7]',
                  )}
                >
                  <span className={cn('text-center text-sm font-semibold text-[#6b7280]')}>
                    {header}
                  </span>
                </div>
              ))}
            </div>

            {/* 테이블 데이터 행 */}
            {applications.map((app, rowIndex) => (
              <div
                key={app.id}
                className={cn(
                  'flex items-stretch',
                  rowIndex < applications.length - 1 && 'border-b border-[#e4e4e7]',
                )}
              >
                {/* 신청한 학과 체험 */}
                <div
                  className={cn(
                    'flex h-16 flex-1 items-center justify-center border-r border-[#e4e4e7] px-4',
                  )}
                >
                  <span className={cn('text-neutral-dark text-center text-sm')}>
                    {activities.find((act) => act.id === app.activityId)?.name ?? app.activityId}
                  </span>
                </div>

                {/* 이름 */}
                <div
                  className={cn(
                    'flex h-16 flex-1 items-center justify-center border-r border-[#e4e4e7] px-4',
                  )}
                >
                  <span className={cn('text-neutral-dark text-center text-sm font-medium')}>
                    {app.name}
                  </span>
                </div>

                {/* 전화번호 */}
                <div
                  className={cn(
                    'flex h-16 flex-1 items-center justify-center border-r border-[#e4e4e7] px-4',
                  )}
                >
                  <span className={cn('text-neutral-dark text-center text-sm font-medium')}>
                    {app.phoneNumber}
                  </span>
                </div>

                {/* 학교명 */}
                <div
                  className={cn(
                    'flex h-16 flex-1 items-center justify-center border-r border-[#e4e4e7] px-4',
                  )}
                >
                  <span className={cn('text-neutral-dark text-center text-sm font-medium')}>
                    {app.schoolName}
                  </span>
                </div>

                {/* 학번 */}
                <div
                  className={cn(
                    'flex h-16 flex-1 items-center justify-center border-r border-[#e4e4e7] px-4',
                  )}
                >
                  <span className={cn('text-neutral-dark text-center text-sm font-medium')}>
                    {formatStudentId(app)}
                  </span>
                </div>

                {/* 정보 삭제 버튼 */}
                <div className={cn('flex h-16 flex-1 items-center justify-center px-4')}>
                  <Button
                    variant="outlineDanger"
                    size="sm"
                    onClick={() => handleDeleteClick(app.id)}
                  >
                    정보 삭제
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={selectedId !== null}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        title="정보를 삭제하시겠습니까?"
        description="삭제된 신청자 정보는 복구할 수 없습니다."
        confirmText="삭제"
        cancelText="취소"
        confirmVariant="danger"
        cancelVariant="outlineDanger"
        isPending={isPending}
      />
    </div>
  );
};

export default ApplicantManagementTable;
