export const CrossIcon = ({ color = '#3B82F6' }: { color?: string }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M1 5H9" stroke={color} stroke-width="2" stroke-linecap="round" />
      <path d="M5 1V9" stroke={color} stroke-width="2" stroke-linecap="round" />
    </svg>
  );
};
