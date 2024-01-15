import Image from "next/image";
import { Message, SuggestionContainer, TipContainer } from "./styles";
import { useState } from "react";

interface Props {
  content: string;
  imgSrc: string;
  tipContent: string;
  onClick: () => void;
}

export function PrompSuggestion({ content, imgSrc, tipContent,onClick }: Props) {
  const [showTip, setShowTip] = useState(false);
  
  return (
    <SuggestionContainer onClick={onClick}>
      <Image width={30} height={30} src={imgSrc} alt="" />
      <strong>{content}</strong>
      <TipContainer>
        <Image
          width={24}
          height={24}
          src={"/dashboard/midias-sociais/chartHoverTip.svg"}
          alt=""
          onMouseEnter={() => setShowTip(true)}
          onMouseLeave={() => setShowTip(false)}
        />
        <Message show={showTip}>
          {content}
          <div className="arrow" />
        </Message>
      </TipContainer>
    </SuggestionContainer>
  );
}
