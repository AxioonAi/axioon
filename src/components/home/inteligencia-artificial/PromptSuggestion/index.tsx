import Image from "next/image";
import { Message, SuggestionContainer, TipContainer } from "./styles";
import { useState } from "react";

interface Props {
  content: string;
  imgSrc: string;
  tipContent: string;
  onClick: () => void;
}

export function PrompSuggestion({
  content,
  imgSrc,
  tipContent,
  onClick,
}: Props) {
  const [showTip, setShowTip] = useState(false);

  return (
    <div
      className="relative flex items-center gap-2 p-4 w-1/2 border-2 border-gray-600 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-20 "
      onClick={onClick}
    >
      <Image className="ml-1" width={30} height={30} src={imgSrc} alt="" />
      <strong>{content}</strong>
      <div className="absolute top-2 right-4 transition-opacity duration-200 cursor-pointer hover:opacity-80 md:top-2 md:right-2">
        <Image
          className="w-[1.3rem] h-auto"
          width={24}
          height={24}
          src={"/dashboard/midias-sociais/chartHoverTip.svg"}
          alt=""
          onMouseEnter={() => setShowTip(true)}
          onMouseLeave={() => setShowTip(false)}
        />
        <div
          className={`absolute w-72 p-4 right-[-2.3rem] bottom-12 border border-black rounded-lg text-justify bg-white transition-all duration-300 ${showTip ? "opacity-100 z-50" : "opacity-0 z-[-1]"}`}
        >
          {content}
          <div className="absolute bg-white w-8 h-8 right-8 rotate-45 border-r border-b border-black" />
        </div>
      </div>
    </div>
  );
}
