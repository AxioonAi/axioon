import { LogoContainer, SubtitleContainer, TitleContainer } from "./styles";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  content: string;
  barColor?: string;
  width?: string;
  subTitle?: boolean;
}

export function TitleWithBar({
  content,
  barColor,
  width = "auto",
  subTitle = false,
  ...rest
}: Props) {
  return (
    <div
      className={`TitleWithBar relative ${width ? `w-${width}` : ""}`}
      {...rest}
    >
      <div
        className={`bar absolute left-0 top-0 w-1 rounded h-14 bg-darkBlueAxion`}
      />
      <div className="content ml-4">
        <h2 className="text-xl margin-0">{content}</h2>
        {subTitle && (
          <div className="subtitleContainer flex flex-col md:flex-row items-start md:items-center gap-2 text-xs">
            <span>Feito pela Inteligência Artificial</span>
            <div className="logoContainer flex gap-1">
              <img src="/axionLogo.png" alt="" className="logoAxion w-20" />
              <div className="iaContainer self-start p-1 rounded-sm bg-gradient-to-br from-[#d8d8d8] to-darkBlueAxion">
                <img src="/ia.png" alt="" className="w-3" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
