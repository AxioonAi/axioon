import { TitleContainer } from "./styles";

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
    <TitleContainer {...rest} barColor={barColor} textColor={textColor} width={width}>
      <h2>{title}</h2>
      <div className="bottom-bar" />
    </TitleContainer>
  );
}
