import { useEffect, useState } from "react";

interface LikesCardProps extends React.HTMLAttributes<HTMLDivElement> {
  type: "facebook" | "instagram" | "tiktok" | "youtube";
  name: string;
  likesMain: number;
  comentsMain: number;
  likesSecondary: number;
  comentsSecondary: number;
  isSelected: boolean;
}

export function ComparisonStaticCards({
  name,
  likesMain,
  comentsMain,
  likesSecondary,
  comentsSecondary,
  isSelected,
  type,
  ...rest
}: LikesCardProps) {
  const typeData = {
    facebook: {
      leftLabel: "Likes",
      leftImg: "/dashboard/like.svg",
      rightLabel: "Seguidores",
      rightImg: "/dashboard/heart.svg",
    },
    instagram: {
      leftLabel: "Posts",
      leftImg: "/dashboard/posts.svg",
      rightLabel: "Seguidores",
      rightImg: "/dashboard/followers.svg",
    },
    tiktok: {
      leftLabel: "Likes",
      leftImg: "/dashboard/heart.svg",
      rightLabel: "Seguidores",
      rightImg: "/dashboard/followers.svg",
    },
    youtube: {
      leftLabel: "Inscritos",
      leftImg: "/dashboard/followers.svg",
      rightLabel: "Visualizações",
      rightImg: "/dashboard/views.svg",
    },
  };

  const [width, setWidth] = useState(100);
  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <div
      className={`Container relative w-64 h-28 bg-gray-10 py-2 px-8 shadow-md border-1 rounded-xl border-[#959595] transition duration-200 ${
        isSelected ? "opacity-100" : "opacity-50"
      } hover:cursor-pointer
        hover:scale-105
      `}
      {...rest}
    >
      <div
        className={`verticalBar absolute left-3 h-20 border-2 border-[#5162FF] rounded-full`}
      />
      {/* <header className="Header text-lg text-gray-100">{name}</header> */}
      {comentsMain > 0 &&
      likesMain > 0 &&
      comentsSecondary > 0 &&
      likesSecondary > 0 ? (
        <div className="flex w-full justify-between items-center">
          <img
            src={
              type === "facebook"
                ? "/dashboard/midias-sociais/facebookLogo.png"
                : type === "instagram"
                  ? "/dashboard/midias-sociais/instagramLogo.png"
                  : type === "youtube"
                    ? "/dashboard/midias-sociais/youtubeLogo.png"
                    : "/dashboard/midias-sociais/tiktokLogo.png"
            }
            alt=""
            className="w-16 h-16"
          />
          <div className="Feedback flex flex-col justify-between gap-1">
            <div className="FeddbackGroup flex flex-col gap-0.5">
              <div className="Group flex gap-0.5 items-center">
                <img
                  src={typeData[type].leftImg}
                  alt=""
                  className="w-6 h-auto"
                />
                <strong className="flex flex-row items-center text-sm leading-[0.9]">
                  <span>
                    {likesMain.toString().length > 6
                      ? `${(likesMain / 1000000).toFixed(1)}M`
                      : likesMain.toString().length <= 6 &&
                          likesMain.toString().length > 3
                        ? `${(likesMain / 1000).toFixed(1)}K`
                        : likesMain.toString()}
                  </span>
                  {""} / {""}
                  <span>
                    {likesSecondary.toString().length > 6
                      ? `${(likesSecondary / 1000000).toFixed(1)}M`
                      : likesSecondary.toString().length <= 6 &&
                          likesSecondary.toString().length > 3
                        ? `${(likesSecondary / 1000).toFixed(1)}K`
                        : likesSecondary.toString()}
                  </span>
                </strong>
              </div>
              <span className="text-xs text-gray-90">
                {typeData[type].leftLabel}
              </span>
            </div>
            <div className="Feedback flex justify-between gap-5">
              <div className="FeddbackGroup flex flex-col gap-0.5">
                <div className="Group flex gap-0.5 items-center">
                  <img
                    src={typeData[type].rightImg}
                    alt=""
                    className="w-6 h-auto"
                  />
                  <strong className="flex flex-row items-center text-sm leading-[0.9]">
                    <span>
                      {comentsMain.toString().length > 6
                        ? `${(comentsMain / 1000000).toFixed(1)}M`
                        : comentsMain.toString().length <= 6 &&
                            comentsMain.toString().length > 3
                          ? `${(comentsMain / 1000).toFixed(1)}K`
                          : comentsMain.toString()}{" "}
                    </span>
                    {""} / {""}
                    <span>
                      {comentsSecondary.toString().length > 6
                        ? `${(comentsSecondary / 1000000).toFixed(1)}M`
                        : comentsSecondary.toString().length <= 6 &&
                            comentsSecondary.toString().length > 3
                          ? `${(comentsSecondary / 1000).toFixed(1)}K`
                          : comentsSecondary.toString()}
                    </span>
                  </strong>
                </div>
                <span className="text-xs text-gray-90">
                  {typeData[type].rightLabel}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : comentsMain === null &&
        likesMain === null &&
        comentsSecondary !== null &&
        likesSecondary !== null ? (
        <div className="flex w-full justify-between items-center">
          <img
            src={
              type === "facebook"
                ? "/dashboard/midias-sociais/facebookLogo.png"
                : type === "instagram"
                  ? "/dashboard/midias-sociais/instagramLogo.png"
                  : type === "youtube"
                    ? "/dashboard/midias-sociais/youtubeLogo.png"
                    : "/dashboard/midias-sociais/tiktokLogo.png"
            }
            alt=""
            className="w-16 h-16"
          />
          <div className="Feedback flex flex-col justify-between gap-1">
            <div className="FeddbackGroup flex flex-col gap-0.5">
              <div className="Group flex gap-0.5 items-center">
                <img
                  src={typeData[type].leftImg}
                  alt=""
                  className="w-6 h-auto"
                />
                <strong className="flex flex-row items-center text-sm leading-[0.9]">
                  <span>0</span>
                  {""} / {""}
                  <span>
                    {likesSecondary.toString().length > 6
                      ? `${(likesSecondary / 1000000).toFixed(1)}M`
                      : likesSecondary.toString().length <= 6 &&
                          likesSecondary.toString().length > 3
                        ? `${(likesSecondary / 1000).toFixed(1)}K`
                        : likesSecondary.toString()}
                  </span>
                </strong>
              </div>
              <span className="text-xs text-gray-90">
                {typeData[type].leftLabel}
              </span>
            </div>
            <div className="Feedback flex justify-between gap-5">
              <div className="FeddbackGroup flex flex-col gap-0.5">
                <div className="Group flex gap-0.5 items-center">
                  <img
                    src={typeData[type].rightImg}
                    alt=""
                    className="w-6 h-auto"
                  />
                  <strong className="flex flex-row items-center text-sm leading-[0.9]">
                    <span>0</span>
                    {""} / {""}
                    <span>
                      {comentsSecondary.toString().length > 6
                        ? `${(comentsSecondary / 1000000).toFixed(1)}M`
                        : comentsSecondary.toString().length <= 6 &&
                            comentsSecondary.toString().length > 3
                          ? `${(comentsSecondary / 1000).toFixed(1)}K`
                          : comentsSecondary.toString()}
                    </span>
                  </strong>
                </div>
                <span className="text-xs text-gray-90">
                  {typeData[type].rightLabel}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : comentsMain !== null &&
        likesMain !== null &&
        comentsSecondary === null &&
        likesSecondary === null ? (
        <div className="flex w-full justify-between items-center">
          <img
            src={
              type === "facebook"
                ? "/dashboard/midias-sociais/facebookLogo.png"
                : type === "instagram"
                  ? "/dashboard/midias-sociais/instagramLogo.png"
                  : type === "youtube"
                    ? "/dashboard/midias-sociais/youtubeLogo.png"
                    : "/dashboard/midias-sociais/tiktokLogo.png"
            }
            alt=""
            className="w-16 h-16"
          />
          <div className="Feedback flex flex-col justify-between gap-1">
            <div className="FeddbackGroup flex flex-col gap-0.5">
              <div className="Group flex gap-0.5 items-center">
                <img
                  src={typeData[type].leftImg}
                  alt=""
                  className="w-6 h-auto"
                />
                <strong className="flex flex-row items-center text-sm leading-[0.9]">
                  <span>
                    {likesMain.toString().length > 6
                      ? `${(likesMain / 1000000).toFixed(1)}M`
                      : likesMain.toString().length <= 6 &&
                          likesMain.toString().length > 3
                        ? `${(likesMain / 1000).toFixed(1)}K`
                        : likesMain.toString()}
                  </span>
                  {""} / {""}
                  <span>0</span>
                </strong>
              </div>
              <span className="text-xs text-gray-90">
                {typeData[type].leftLabel}
              </span>
            </div>
            <div className="Feedback flex justify-between gap-5">
              <div className="FeddbackGroup flex flex-col gap-0.5">
                <div className="Group flex gap-0.5 items-center">
                  <img
                    src={typeData[type].rightImg}
                    alt=""
                    className="w-6 h-auto"
                  />
                  <strong className="flex flex-row items-center text-sm leading-[0.9]">
                    <span>
                      {comentsMain.toString().length > 6
                        ? `${(comentsMain / 1000000).toFixed(1)}M`
                        : comentsMain.toString().length <= 6 &&
                            comentsMain.toString().length > 3
                          ? `${(comentsMain / 1000).toFixed(1)}K`
                          : comentsMain.toString()}{" "}
                    </span>
                    {""} / {""}
                    <span>0</span>
                  </strong>
                </div>
                <span className="text-xs text-gray-90">
                  {typeData[type].rightLabel}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : comentsMain === null &&
        likesMain === null &&
        comentsSecondary === null &&
        likesSecondary === null ? (
        <div className="text-center self-center">
          Ambos os perfis não possuem dados do {type}
        </div>
      ) : (
        <div className="flex justify-center w-full h-full">Carregando...</div>
      )}
    </div>
  );
}
