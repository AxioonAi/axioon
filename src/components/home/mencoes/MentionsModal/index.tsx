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
}

export function MentionsModal({ show, onHide }: Props) {
  const [selectedValue, setSelectedValue] = useState("Relevância");
  const values = ["Relevância", "Mais recente"];

  return (
    <ModalContainer show={show} onHide={onHide} size="lg">
      <Content>
        <Header>
          <div>
            <TitleWithBar content="Só Notícias" barColor="#22C24F" />
            <span
              style={{
                marginLeft: "1rem",
                fontSize: "0.875rem",
                color: "#4A4A4A",
                fontWeight: 600,
              }}
            >
              02/10/2023
            </span>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}
          >
            <strong style={{ fontSize: "1.25rem", color: "#22C24F" }}>
              Positiva{" "}
            </strong>
            <Image
              width={36}
              height={36}
              src="/dashboard/positive.svg"
              alt=""
            />
          </div>
        </Header>
        <Main>
          <NewContent>
            my text of the printing and typesetting industry. Lorem Ipsum has
            been the industry's standard dummy text ever since the 1500s, when
            an my text of the printing and typesetting industry. Lorem Ipsum has
            been the industry's standard dummy text ever since the 1500s, when
            an my text of the printing and typesetting industry. Lorem Ipsum has
            been the industry's standard dummy text ever since the 1500s, when
            an...
          </NewContent>
          <Sentiments>
            <hr />
            <div className="scores">
              <ScoreChartContainer>
                <span style={{ maxWidth: "14rem", height: "3rem" }}>
                  Sentimento da Menção
                </span>
                <div style={{ maxWidth: "14rem", margin: "auto" }}>
                  <ScoreChart score={690} id="mentionSentiment" />
                </div>
              </ScoreChartContainer>
              <ScoreChartContainer>
                <span style={{ maxWidth: "14rem", height: "3rem" }}>
                  Sentimento médio dos comentários
                </span>
                <div style={{ maxWidth: "14rem", margin: "auto" }}>
                  <ScoreChart score={690} id="commentsSentiment" />
                </div>
              </ScoreChartContainer>
            </div>
            <hr style={{ margin: "2rem 0" }} />
          </Sentiments>

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
                    document.getElementById("comments-order-select")?.focus()
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
            <CommentComponent
              type={"instagram"}
              comment={Math.floor(Math.random() * 5000)}
              commentScore={700}
            />
            <CommentComponent
              type={"instagram"}
              comment={Math.floor(Math.random() * 5000)}
              commentScore={700}
            />
            <CommentComponent
              type={"instagram"}
              comment={Math.floor(Math.random() * 5000)}
              commentScore={700}
            />
            <CommentComponent
              type={"instagram"}
              comment={Math.floor(Math.random() * 5000)}
              commentScore={700}
            />
            <CommentComponent
              type={"instagram"}
              comment={Math.floor(Math.random() * 5000)}
              commentScore={700}
            />
          </Comments>
        </Main>
      </Content>
    </ModalContainer>
  );
}
