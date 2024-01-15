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
      <CardContainer onClick={() => setShowNewsModal(true)}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              paddingLeft: "0.5rem",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                top: "0.5rem",
                width: "0.25rem",
                height: "2.75rem",
                borderRadius: "2px",
                backgroundColor: color,
              }}
            />
            <strong
              style={{
                fontSize: "1.125rem",
                lineHeight: 0.9,
                paddingTop: "0.5rem",
              }}
            >
              {source}
            </strong>
            <span
              style={{ fontSize: "0.7rem", color: "#4A4A4A", fontWeight: 600 }}
            >
              {date}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
            <strong style={{ fontSize: "0.75rem", color: color }}>
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
        <div
          style={{
            marginTop: "1rem",
            padding: "0 0 0 0.5rem",
            fontSize: "1.5rem",
            lineHeight: "1.2",
          }}
        >
          <p style={{ margin: 0 }} className="content">
            {content}
          </p>
        </div>
        <div
          style={{
            paddingTop: "0.6rem",
            color: "#626262",
            fontSize: "0.75rem",
          }}
        >
          <p
            style={{
              margin: "1rem 0 0",
              textAlign: "center",
              fontStyle: "italic",
              fontWeight: 500,
            }}
          >
            Clique para ser redirecionado para a notícia
          </p>
        </div>
      </CardContainer>
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
