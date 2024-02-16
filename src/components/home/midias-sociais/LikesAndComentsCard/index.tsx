interface LikesCardProps extends React.HTMLAttributes<HTMLDivElement> {
  type: "facebook" | "instagram" | "tiktok" | "youtube";
  name: string;
  likes: any;
  coments: any;
  isSelected: boolean;
}

export function LikesAndComentsCard({
  name,
  likes,
  coments,
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

  return (
    <div
      className={`Container relative w-64 h-28 bg-gray-10 py-2 px-8 shadow-md border-1 rounded-xl border-[#959595] transition duration-200 ${
        coments === null && likes === null
          ? "opacity-50"
          : isSelected && coments >= 0 && likes >= 0
            ? "opacity-100 hover:scale-105"
            : !isSelected
              ? "opacity-50 hover:scale-105"
              : "opacity-50"
      } 
      `}
      {...rest}
    >
      <div
        className={`verticalBar absolute left-3 h-20 border-2 border-[#5162FF] rounded-full`}
      />
      <header className="Header text-lg text-gray-100">{name}</header>
      {coments !== null && coments >= 0 && likes !== null && likes >= 0 ? (
        <div className="Feedback flex justify-between gap-5">
          <div className="FeddbackGroup flex flex-col mt-3 gap-0.5">
            <div className="Group flex gap-0.5 items-center">
              <img src={typeData[type].leftImg} alt="" className="w-6 h-auto" />
              <strong className="text-lg leading-[0.9]">
                {likes.toString().length > 6
                  ? `${(likes / 1000000).toFixed(1)}M`
                  : likes.toString().length <= 6 && likes.toString().length > 3
                    ? `${(likes / 1000).toFixed(1)}K`
                    : likes.toString()}
              </strong>
            </div>
            <span className="text-sm text-gray-90">
              {typeData[type].leftLabel}
            </span>
          </div>
          <div className="Feedback flex justify-between gap-5">
            <div className="FeddbackGroup flex flex-col mt-3 gap-0.5">
              <div className="Group flex gap-0.5 items-center">
                <img
                  src={typeData[type].rightImg}
                  alt=""
                  className="w-6 h-auto"
                />
                <strong className="text-lg leading-[0.9]">
                  {coments.toString().length > 6
                    ? `${(coments / 1000000).toFixed(1)}M`
                    : coments.toString().length <= 6 &&
                        coments.toString().length > 3
                      ? `${(coments / 1000).toFixed(1)}K`
                      : coments.toString()}
                </strong>
              </div>
              <span className="text-sm text-gray-90">
                {typeData[type].rightLabel}
              </span>
            </div>
          </div>
        </div>
      ) : coments === null && likes === null ? (
        <span className="text-sm flex w-full gap-2">
          <img
            src="/dashboard/midias-sociais/noData.svg"
            className="w-10 h-10"
            alt=""
          />
          Nenhum dado encontrado
        </span>
      ) : (
        <div className="flex justify-center w-full h-full">Carregando...</div>
      )}
    </div>
  );
}
