export type Colors = {
  [key: string]: string;
};

interface LiquidProps {
  isHovered: boolean;
  colors: Colors;
}

export const Liquid: React.FC<LiquidProps> = ({ isHovered, colors }) => {
  return (
    <div
      className={`absolute inset-0 transition-transform duration-300 ${
        isHovered ? 'scale-[2]' : 'scale-[1.4]'
      }`}
      style={{
        background: `linear-gradient(217deg, ${colors.color1}, ${colors.color2} 70.71%),
          linear-gradient(127deg, ${colors.color3}, ${colors.color4} 70.71%),
          linear-gradient(336deg, ${colors.color5}, ${colors.color6} 70.71%)`,
        animation: 'gradient 5s ease infinite',
      }}
    />
  );
}; 