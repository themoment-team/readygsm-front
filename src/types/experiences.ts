export type ExperiencesFormValues = {
  members: {
    name: string;
    phone: string;
    grade: {
      grade: string;
      class: string;
      number: string;
    };
    school: string;
  }[];
};
