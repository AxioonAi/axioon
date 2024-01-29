import Image from "next/image";
import { useState } from "react";

interface Props {
  content: string;
}

export function ChartTip({ content }: Props) {
  const [showTip, setShowTip] = useState(false);
  return (
    <div className="ChartTipContainer absolute top-4 right-4 transition duration-200 ease-in cursor-pointer">
      <Image
        width={36}
        height={36}
        src={"/dashboard/midias-sociais/chartHoverTip.svg"}
        alt=""
        onMouseEnter={() => setShowTip(true)}
        onMouseLeave={() => setShowTip(false)}
        className="hover:opacity-80"
      />
      <div
        className={`Message absolute w-72 p-4 -right-8 bottom-16 border-[1px] border-black rounded-lg text-justify text-black bg-white transition duration-300 ease-in ${showTip ? "opacity-100" : "opacity-0"}`}
      >
        {content}
        <div className="arrow absolute bg-white w-8 h-8 right-8 rotate-45 border-b-[1px] border-b-black border-r-[1px] border-r-black" />
      </div>
    </div>
  );
}
