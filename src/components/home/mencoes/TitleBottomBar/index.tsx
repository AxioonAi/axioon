interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  barColor?: string;
  textColor?: string;
  width?: string;
}

export function TitleBottomBar({
  title,
  barColor = "#0D123C",
  textColor = "#212529",
  width,
  ...rest
}: Props) {
  return (
    <div
      className={`TitleContainer relative pb-1 text-xl ${width ? `w-${width}` : "w-auto"}`}
      {...rest}
    >
      <h2 style={{ color: textColor }}>{title}</h2>
      <div
        className="bottom-bar absolute h-3 w-full md:w-[5.5rem] -bottom-2"
        style={{ backgroundColor: barColor }}
      />
    </div>
  );
}
