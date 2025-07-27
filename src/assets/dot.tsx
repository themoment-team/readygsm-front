type DotProps = {
  color?: string;
};

const colorMap: Record<string, string> = {
  'blue.200': '#3DAEFF',
  'lime.400': '#AFDB00',
};

const Dot = ({ color = 'lime.400' }: DotProps) => {
  const fillColor = colorMap[color] || colorMap['lime.400'];

  return (
    <svg width="39" height="8" viewBox="0 0 39 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="4.5" cy="4" r="4" fill={fillColor} />
      <circle cx="34.5" cy="4" r="4" fill={fillColor} />
    </svg>
  );
};

export default Dot;
