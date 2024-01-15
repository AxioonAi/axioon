import { TitleWithBar } from "@/components/Global/TitleWithBar";
import Image from "next/image";
import { ScoreChart } from "../../ScoreChart";
import {
  Comments,
  CommentsHeader,
  Content,
  Footer,
  Header,
  Main,
  ModalContainer,
  NewContent,
  ScoreChartContainer,
  Sentiments,
} from "./styles";
import { CommentComponent } from "../../midias-sociais/ComentComponent";
import { OrderSelect } from "../../midias-sociais/OrderSelect";
import { useState } from "react";

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
  const [selectedValue, setSelectedValue] = useState("Relevância");
  const values = ["Relevância", "Mais recente"];

  return (
    <ModalContainer show={show} onHide={onHide} size="lg">
      <Content>
        <Header>
          <div>
            <TitleWithBar content={source} barColor="#22C24F" />
            <span
              style={{
                marginLeft: "1rem",
                fontSize: "0.875rem",
                color: "#4A4A4A",
                fontWeight: 600,
              }}
            >
              {date}
            </span>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}
          >
            <strong style={{ fontSize: "1.25rem", color: "#22C24F" }}>
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
        </Header>
        <Main>
          <NewContent>{content}</NewContent>
          <Sentiments>
            <hr />
            <div className="flex w-full items-center justify-around">
              <ScoreChartContainer>
                <span style={{ maxWidth: "14rem", height: "3rem" }}>
                  Sentimento da Menção
                </span>
                <div style={{ maxWidth: "14rem", margin: "auto" }}>
                  <ScoreChart score={sentiment} id="mentionSentiment" />
                </div>
              </ScoreChartContainer>
              {comments.length !== 0 && (
                <ScoreChartContainer>
                  <span style={{ maxWidth: "14rem", height: "3rem" }}>
                    Sentimento médio dos comentários
                  </span>
                  <div style={{ maxWidth: "14rem", margin: "auto" }}>
                    <ScoreChart
                      score={commentSentiment}
                      id="commentsSentiment"
                    />
                  </div>
                </ScoreChartContainer>
              )}
            </div>
            <hr style={{ margin: "2rem 0" }} />
          </Sentiments>

          {comments.length !== 0 && (
            <>
              <CommentsHeader>
                <div className="title">
                  <TitleWithBar content="Comentários" barColor="#12A9E7" />
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      padding: "0.5rem",
                    }}
                  >
                    <strong
                      onClick={() =>
                        document
                          .getElementById("comments-order-select")
                          ?.focus()
                      }
                    >
                      Ordenar por:
                    </strong>
                    <OrderSelect
                      selectedValue={selectedValue}
                      values={values}
                      setSelectedValue={setSelectedValue}
                      id="comments-order-select"
                    />
                  </div>
                </div>
              </CommentsHeader>

              <Comments>
                {comments.slice(0, 5).map((comment: any) => (
                  <CommentComponent type={"instagram"} comment={comment} />
                ))}
              </Comments>
            </>
          )}
        </Main>
      </Content>
    </ModalContainer>
  );
}
