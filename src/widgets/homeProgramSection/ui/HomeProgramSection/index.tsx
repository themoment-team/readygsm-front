'use client';

import { useState } from 'react';

import { ProgramCard, projectMockList } from '@/entities/program';
import { cn } from '@/shared/lib';

const HomeProgramSection = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <main
      className={cn(
        'flex min-h-screen flex-col items-center justify-center gap-4 bg-white px-4 py-8 md:py-12',
      )}
    >
      {projectMockList.map((project, index) => (
        <ProgramCard
          key={index}
          content={project.content}
          date={project.date}
          isSelected={selectedIndex === index}
          onClick={() => setSelectedIndex(index)}
          personnel={project.personnel}
          title={project.title}
        />
      ))}
    </main>
  );
};

export default HomeProgramSection;
