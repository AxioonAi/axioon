import { useEffect, useState } from "react";
import { CardContainer } from "./styles";
import { useRouter } from "next/router";
import { NewsModal } from "../NewsModal";

interface Props {
  sentimentClassification: "positivo" | "neutro" | "negativo";
  sentiment: number;
  source: string;
  url: string;
  content: string;
  date: string;
}

export function NewsCard({
  sentimentClassification,
  sentiment,
  source,
  url,
  content,
  date,
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
        className={`CardContainer flex flex-col relative p-2 w-full h-40 xl:h-full xl:justify-between bg-white border-[1px] ${sentimentClassification === "positivo" ? "border-[rgba(34,194,79,0.5)]" : sentimentClassification === "neutro" ? "border-[rgba(255,176,67,0.5)]" : "border-[rgba(231,0,0,0.5)]"} rounded`}
        onClick={() => setShowNewsModal(true)}
      >
        <div className="flex items-start w-80 justify-between">
          <div className="flex flex-col relative pl-2">
            <div
              className={`absolute left-0 top-2 w-1 h-10 rounded ${sentimentClassification === "positivo" ? "bg-[#22C24F]" : sentimentClassification === "neutro" ? "bg-[#FFB043]" : "bg-[#E70000]"}`}
            />
            <strong>{source}</strong>
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
          <p className="content">{content}</p>
        </div>
        <div>
          <p className="text-xs font-light text-[#8790AB] text-center italic">
            Clique para ver mais detalhes
          </p>
        </div>
      </div>
      <NewsModal
        date={date}
        source={source}
        url={url}
        content={content}
        sentimentClassification={sentimentClassification}
        sentiment={sentiment}
        show={showNewsModal}
        onHide={() => setShowNewsModal(false)}
      />
    </>
  );
}
