interface Props {
  name: string;
  count: number;
}

export function FollowerDataLegend({ name, count }: Props) {
  return (
    <div className="Container flex items-center text-left sm:m-2">
      <div className="verticalBar h-9 w-px bg-[#8790ab]" />
      <div className="content flex flex-col items-start ml-4">
        <div className="name flex items-center gap-1 text-xs text-[#8790ab]">
          <div
            className={`circle w-2 h-2 rounded-full ${
              name === "Instagram"
                ? "bg-[#2F5CFC]"
                : name === "Facebook"
                  ? "bg-[#0A2BA0]"
                  : name === "Tiktok"
                    ? "bg-[#000411]"
                    : "bg-[#E5E8F0]"
            }`}
          />
          <span>{name}</span>
        </div>
        <strong className="text-xl text-left">
          {count.toFixed(0).length > 6
            ? (count / 1000000).toFixed(1) + "M"
            : count.toFixed(0).length <= 6 && count.toFixed(0).length > 3
              ? (count / 1000).toFixed(1) + "k"
              : count.toFixed(0)}
        </strong>
      </div>
    </div>
  );
}
