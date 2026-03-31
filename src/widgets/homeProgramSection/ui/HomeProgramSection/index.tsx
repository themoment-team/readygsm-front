import { ProgramCard } from '@/entities/program';

const activityItems = [
  '간단한 웹 페이지(HTML/CSS) 제작 체험',
  '기초 프로그래밍(Python)을 활용한 문제 해결 실습',
  '팀 프로젝트를 통한 미니 서비스 기획 및 개발 경험',
];

const HomeProgramSection = () => {
  return (
    <main className="flex min-h-screen items-start justify-center bg-white px-4 py-8 md:py-12">
      <ProgramCard
        capacityText="0/18"
        dateText="2026-03-26 (목)"
        items={activityItems}
        title="웹페이지 개발"
      />
    </main>
  );
};

export default HomeProgramSection;
