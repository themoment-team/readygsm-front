type DotProps = {
  color?: string;
};

const Dot = ({ color = '#AFDB00' }: DotProps) => {
  return (
    <svg width="39" height="8" viewBox="0 0 39 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="4.5" cy="4" r="4" fill={color} />
      <circle cx="34.5" cy="4" r="4" fill={color} />
    </svg>
  );
};

export default Dot;
