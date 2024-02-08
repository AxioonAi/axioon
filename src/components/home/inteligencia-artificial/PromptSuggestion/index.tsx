import Image from "next/image";
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
      className="relative flex items-center justify-center gap-2 p-2 w-60 border-2 border-gray-600 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-20 "
      onClick={onClick}
    >
      <Image className="ml-1" width={20} height={20} src={imgSrc} alt="" />
      <strong>{content}</strong>
    </div>
  );
}
