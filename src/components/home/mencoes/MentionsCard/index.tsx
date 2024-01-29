import { useEffect, useState } from "react";
import { CardContainer } from "./styles";
import { useRouter } from "next/router";
import { NewsModal } from "../NewsModal";
import { MentionsModal } from "../MentionsModal";

interface Props {
  sentimentClassification: "positivo" | "neutro" | "negativo";
  sentiment: number;
  comments: any;
  commentSentiment: number;
  source: string;
  content: string;
  date: string;
  url: string;
}

export function MentionsCard({
  sentimentClassification,
  sentiment,
  comments,
  commentSentiment,
  source,
  content,
  date,
  url,
}: Props) {
  const [color, setColor] = useState("");
  const [showNewsModal, setShowNewsModal] = useState(false);

  useEffect(() => {
    if (sentimentClassification === "positivo") {
      setColor("#22C24F");
    } else if (sentimentClassification === "neutro") {
      setColor("#FFB043");
    } else {
      setColor("#E70000");
    }
  }, [sentimentClassification]);

  return (
    <>
      <div
        className={`CardContainer flex flex-col relative p-2 w-72 lg:w-48 xl:w-72 min-h-40 lg:min-h-52 xl:min-h-52 lg:justify-between bg-white border-[1px] ${sentimentClassification === "positivo" ? "border-[rgba(34,194,79,0.5)]" : sentimentClassification === "neutro" ? "border-[rgba(255,176,67,0.5)]" : "border-[rgba(231,0,0,0.5)]"} rounded`}
        onClick={() => setShowNewsModal(true)}
      >
        <div className="flex lg:flex-col xl:flex-row lg:gap-2 xl:gap-0 items-start w-full justify-between">
          <div className="flex flex-col relative pl-2">
            <div
              className={`absolute left-0 top-2 w-1 h-10 rounded ${sentimentClassification === "positivo" ? "bg-[#22C24F]" : sentimentClassification === "neutro" ? "bg-[#FFB043]" : "bg-[#E70000]"}`}
            />
            <strong>
              {source.length > 15 ? source.slice(0, 15) + "..." : source}
            </strong>
            <span className="text-xs font-extralight text-[#8790AB]">
              {date}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <strong
              className={`text-xs ${sentimentClassification === "positivo" ? "text-[#22C24F]" : sentimentClassification === "neutro" ? "text-[#FFB043]" : "text-[#E70000]"}`}
            >
              {sentimentClassification === "positivo"
                ? "Positiva"
                : sentimentClassification === "neutro"
                  ? "Neutra"
                  : "Precisa de atenção"}
            </strong>
            <img
              src={
                sentimentClassification === "positivo"
                  ? "/dashboard/positive.svg"
                  : sentimentClassification === "neutro"
                    ? "/dashboard/neutral.svg"
                    : "/dashboard/warning.svg"
              }
            />
          </div>
        </div>
        <div className="text-sm xl:text-base mt-4 font-semibold">
          <p className="content">
            {content.length > 60 ? content.slice(0, 60) + "..." : content}
          </p>
        </div>
        <div>
          <p className="text-xs font-light text-[#8790AB] text-center italic">
            Clique para ver mais detalhes
          </p>
        </div>
      </div>
      <MentionsModal
        show={showNewsModal}
        onHide={() => setShowNewsModal(false)}
        sentimentClassification={sentimentClassification}
        sentiment={sentiment}
        comments={comments}
        commentSentiment={commentSentiment}
        source={source}
        content={content}
        date={date}
        url={url}
      />
    </>
  );
}
