import {
  Content,
  Footer,
  Header,
  Main,
  ModalContainer,
  NewContent,
  NewNameAndSentiment,
  ScoreChartContainer,
} from "./styles";
import { TitleWithBar } from "@/components/Global/TitleWithBar";
import Image from "next/image";
import { ScoreChart } from "../../ScoreChart";

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
    <ModalContainer show={show} onHide={onHide} size="lg">
      <Content>
        <Header>
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
        </Header>
        <Main>
          <NewNameAndSentiment>
            <h1 style={{ fontSize: "2.25rem", textAlign: "center" }}>
              {content}
            </h1>
            <hr />
            <ScoreChartContainer>
              <div
                style={{ maxWidth: "14rem", margin: "auto", marginTop: "5%" }}
              >
                <ScoreChart score={sentiment} id="newScore" />
              </div>
            </ScoreChartContainer>

            {/* <hr style={{ margin: "2rem 0" }} /> */}
          </NewNameAndSentiment>
          {/* <NewContent>
            my text of the printing and typesetting industry. Lorem Ipsum has
            been the industry's standard dummy text ever since the 1500s, when
            an my text of the printing and typesetting industry. Lorem Ipsum has
            been the industry's standard dummy text ever since the 1500s, when
            an my text of the printing and typesetting industry. Lorem Ipsum has
            been the industry's standard dummy text ever since the 1500s, when
            an...
          </NewContent> */}
        </Main>

        <Footer>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="bg-[#0D123C] text-white p-3 rounded cursor-pointer hover:scale-105 transition duration-100 ease-in"
          >
            Ver notícia completa
          </a>
        </Footer>
      </Content>
    </ModalContainer>
  );
}
