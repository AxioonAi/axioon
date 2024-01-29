interface Props extends React.HTMLAttributes<HTMLDivElement> {
  content: string;
  dark?: boolean;
  barColor?: string;
  width?: string;
  subTitle?: boolean;
  juridia?: boolean;
  comparison?: boolean;
}

export function TitleWithBar({
  content,
  dark,
  barColor,
  width = "auto",
  subTitle = false,
  juridia,
  comparison,
  ...rest
}: Props) {
  return (
    <div
      className={`TitleWithBar relative ${width ? `w-${width}` : ""}`}
      {...rest}
    >
      <div
        className={`bar absolute left-0 top-0 w-1 rounded h-14`}
        style={{ backgroundColor: barColor }}
      />
      <div className="content ml-4">
        <h2
          className={` ${dark ? `text-[#fff]` : ""} margin-0 ${comparison ? "font-bold text-2xl" : "text-xl"}`}
        >
          {content}
        </h2>
        {subTitle && (
          <div className="subtitleContainer flex flex-col md:flex-row items-start md:items-center gap-2 text-xs">
            <span>Feito pela Inteligência Artificial</span>
            <div className="logoContainer flex gap-1">
              <img
                src={juridia ? "/juridiaLogo.svg" : "/axionLogo.png"}
                alt=""
                className="logoAxion w-20"
              />
              {!juridia && (
                <div className="iaContainer self-start p-1 rounded-sm bg-gradient-to-br from-[#d8d8d8] to-darkBlueAxion">
                  <img src="/ia.png" alt="" className="w-3" />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
