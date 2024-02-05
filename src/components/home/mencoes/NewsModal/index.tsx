import { ScoreChart } from "../../ScoreChart";
import { TitleWithBar } from "@/components/Global/TitleWithBar";
import Image from "next/image";
import { CloseButton, Modal } from "react-bootstrap";

interface Props {
  show: boolean;
  onHide: () => void;
  sentimentClassification: "positivo" | "neutro" | "negativo";
  sentiment: number;
  source: string;
  url: string;
  content: string;
  date: string;
}

export function NewsModal({
  show,
  onHide,
  sentimentClassification,
  sentiment,
  source,
  url,
  content,
  date,
}: Props) {
  return (
    <Modal show={show} onHide={onHide} size="lg">
      <div className="Content py-4 px-6">
        <header className="flex justify-between items-center">
          <div>
            <TitleWithBar
              content={source}
              barColor={
                sentimentClassification === "positivo"
                  ? "#22C24F"
                  : sentimentClassification === "neutro"
                    ? "#FFB043"
                    : "#E70000"
              }
            />
            <span className="ml-4 text-sm text-[#4a4a4a] font-semibold">
              {date}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <strong
              style={{
                fontSize: "1.25rem",
                color:
                  sentimentClassification === "positivo"
                    ? "#22C24F"
                    : sentimentClassification === "neutro"
                      ? "#FFB043"
                      : "#E70000",
              }}
            >
              {sentimentClassification === "positivo"
                ? "Positiva"
                : sentimentClassification === "neutro"
                  ? "Neutra"
                  : "Precisa de atenção"}
            </strong>
            <Image
              width={36}
              height={36}
              src={
                sentimentClassification === "positivo"
                  ? "/dashboard/positive.svg"
                  : sentimentClassification === "neutro"
                    ? "/dashboard/neutral.svg"
                    : "/dashboard/warning.svg"
              }
              alt=""
            />
          </div>
        </header>
        <main>
          <div className="NewsNameAndSentiment w-4/5 mt-14 mx-auto">
            <h1 className="text-4xl text-center">
              {content.length > 60 ? content.slice(0, 60) + "..." : content}
            </h1>
            <div className="ScoreChartContainer flex flex-col justify-center text-center">
              <div className="max-w-56 m-auto mt-4">
                <ScoreChart score={sentiment} id="newScore" />
              </div>
            </div>

            {/* <hr style={{ margin: "2rem 0" }} /> */}
          </div>
          {/* <NewContent>
            my text of the printing and typesetting industry. Lorem Ipsum has
            been the industry's standard dummy text ever since the 1500s, when
            an my text of the printing and typesetting industry. Lorem Ipsum has
            been the industry's standard dummy text ever since the 1500s, when
            an my text of the printing and typesetting industry. Lorem Ipsum has
            been the industry's standard dummy text ever since the 1500s, when
            an...
          </NewContent> */}
        </main>

        <footer className="flex justify-center mt-16 mx-auto">
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="bg-[#0D123C] text-white p-3 rounded cursor-pointer hover:scale-105 transition duration-100 ease-in"
          >
            Ver notícia completa
          </a>
        </footer>
      </div>
    </Modal>
  );
}
