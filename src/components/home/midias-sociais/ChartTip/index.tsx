import Image from "next/image";
import { useState } from "react";
import { ChartTipContainer, Message } from "./styles";

interface Props {
  content: string;
}

export function ChartTip({ content }: Props) {
  const [showTip, setShowTip] = useState(false);
  return (
    <div className="chartTipContainer absolute top-4 right-4 transition duration-200 ease-in cursor-pointer">
      <Image
        width={36}
        height={36}
        src={"/dashboard/midias-sociais/chartHoverTip.svg"}
        alt=""
        onMouseEnter={() => setShowTip(true)}
        onMouseLeave={() => setShowTip(false)}
        className="w-6 h-6 md:w-9 md:h-9 hover:opacity-80"
      />
      <div
        className={`Message absolute w-72 p-4 -right-8 bottom-14 border border-black rounded-lg text-justify text-black bg-white ${
          showTip ? "z-10" : "z-[-1]"
        } ${
          showTip ? "opacity-100" : "opacity-0"
        } transition duration-300 ease-in`}
      >
        {content}
        <div className="arrow absolute bg-white w-8 h-8 right-8 rotate-45 border-r border-b border-black" />
      </div>
    </div>
  );
}
