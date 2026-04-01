import { ProgramCard, projectMockList } from '@/entities/program';
import { cn } from '@/shared/lib';

const HomeProgramSection = () => {
  return (
    <main
      className={cn(
        'flex min-h-screen flex-col items-center justify-center gap-4 bg-white px-4 py-8 md:py-12',
      )}
    >
      {projectMockList.map((project) => (
        <ProgramCard
          key={project.title}
          title={project.title}
          content={project.content}
          date={project.date}
          personnel={project.personnel}
        />
      ))}
    </main>
  );
};

export default HomeProgramSection;
