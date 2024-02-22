import { ScoreChart } from "../../ScoreChart";
import { CommentComponent } from "../../midias-sociais/ComentComponent";
import { GlobalButton } from "@/components/Global/Button";
import { TitleWithBar } from "@/components/Global/TitleWithBar";
import Image from "next/image";
import { useState } from "react";
import { Modal } from "react-bootstrap";

interface Props {
  show: boolean;
  onHide: () => void;
  sentimentClassification: "positivo" | "neutro" | "negativo";
  sentiment: number;
  comments: any;
  commentSentiment: number;
  source: string;
  content: string;
  date: string;
  url: string;
}

export function MentionsModal({
  show,
  onHide,
  sentimentClassification,
  sentiment,
  comments,
  commentSentiment,
  source,
  content,
  date,
  url,
}: Props) {
  const [showMore, setShowMore] = useState(false);

  const redirect = (url: string) => {
    if (confirm("Você será redirecionado para a publicação original")) {
      window.open(url, "_blank");
    } else {
      return;
    }
  };

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
                  : "Precisa de atenção"}{" "}
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
        <main className="mt-14">
          <article className="NewContent text-lg text-center overflow-hidden">
            {content}
          </article>
          <div className="Sentiments flex w-4/5 mt-14 mx-auto items-center justify-center">
            <hr />
            <div className="flex flex-col lg:flex-row w-full items-center justify-around">
              <div className="ScoreChartContainer flex flex-col items-center justify-center text-center">
                <span className="text-lg max-w-56 h-12">
                  Sentimento da Menção
                </span>
                <div className="max-w-56 m-auto">
                  <ScoreChart score={sentiment} id="mentionSentiment" />
                </div>
              </div>
              {comments.length !== 0 && (
                <div className="ScoreChartContainer flex flex-col items-center justify-center text-center">
                  <span className="text-lg max-w-56 h-12">
                    Sentimento médio dos comentários
                  </span>
                  <div className="max-w-56 m-auto">
                    <ScoreChart
                      score={commentSentiment}
                      id="commentsSentiment"
                    />
                  </div>
                </div>
              )}
            </div>
            <hr style={{ margin: "2rem 0" }} />
          </div>

          {comments.length !== 0 && (
            <>
              <div className="CommentsHeader">
                <div className="title flex w-full justify-between gap-8 p-4 my-4">
                  <TitleWithBar content="Comentários" barColor="#12A9E7" />
                  <button
                    className="underline"
                    onClick={() => setShowMore(!showMore)}
                  >
                    {showMore ? "Ver menos" : "Ver mais"}
                  </button>
                </div>
              </div>

              <div className="Comments flex flex-col gap-2 h-80 max-h-80 overflow-y-scroll">
                {comments
                  .slice(0, showMore ? comments.length : 3)
                  .map((comment: any) => (
                    <CommentComponent type={"instagram"} comment={comment} />
                  ))}
              </div>
            </>
          )}
          <div className="flex w-full justify-center">
            <GlobalButton
              content="Ver publicação original"
              onClick={() => redirect(url)}
              background="darkBlueAxion"
              color="white"
              padding="2"
              margin="2"
              hover
            />
          </div>
        </main>
      </div>
    </Modal>
  );
}
