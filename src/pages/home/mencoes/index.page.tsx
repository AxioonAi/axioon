import { TitleWithBar } from "@/components/Global/TitleWithBar";
import { HeaderComponent } from "@/components/home/Header";
import { NewsCard } from "@/components/home/mencoes/NewsCard";
import { SentimentChart } from "@/components/home/mencoes/SentimentChart";
import { TitleBottomBar } from "@/components/home/mencoes/TitleBottomBar";
import { TotalQuotes } from "@/components/home/mencoes/TotalQuotes";
import { useRouter } from "next/router";
import { CardsContainer, Content, Main, TopCardsContainer } from "./styles";
import RootLayout from "@/components/Layout";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScoreChart } from "@/components/home/ScoreChart";
import { NewsModal } from "@/components/home/mencoes/NewsModal";
import { MentionsCard } from "@/components/home/mencoes/MentionsCard";

export default function SeuEleitorado() {
  const main = useRef(null);
  const content = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".mainContent", {
        x: "-100%",
        opacity: 1,
        duration: 1,
        delay: 0.2,
      });
    }, main);
    return () => ctx.revert();
  }, []);

  const fadeOut = () => {
    const ctx = gsap.context(() => {
      gsap.to(".mainContent", {
        opacity: 0,
        duration: 1,
      });
    }, main);
    return () => ctx.revert();
  };

  const [selectedProfile, setSelectedProfile] = useState({
    name: "",
    politicalGroup: "",
    id: "",
  });

  return (
    <main ref={main}>
      <RootLayout fadeOut={() => fadeOut()}>
        <Content className="mainContent" ref={content} style={{ opacity: 1 }}>
          <HeaderComponent
            selectedProfile={selectedProfile}
            setSelectedProfile={setSelectedProfile}
            fadeOut={() => fadeOut()}
          />
          <Main>
            <h2
              style={{
                fontSize: "1.875rem",
                fontWeight: 500,
                marginBottom: "1.25rem",
              }}
            >
              Sites de Notícias
            </h2>
            <TopCardsContainer>
              <div
                style={{
                  width: "17.25rem",
                  height: "100%",
                  backgroundColor: "white",
                  padding: "1rem 1.25rem",
                  borderRadius: 10,
                }}
              >
                <TitleWithBar content="Score Total" barColor="#D38945" />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "0 8%",
                  }}
                >
                  <ScoreChart score={750} id="newsScore" />
                </div>
              </div>
              <TotalQuotes />

              <div className="sentimentChartContainer">
                <SentimentChart
                  positive={343349}
                  negative={243312}
                  neutral={103231}
                />
              </div>
            </TopCardsContainer>
            <h2
              style={{
                fontSize: "1.875rem",
                fontWeight: 500,
                marginBottom: "1.25rem",
              }}
              className="mt-3"
            >
              Menções
            </h2>
            <TopCardsContainer>
              <div
                style={{
                  width: "17.25rem",
                  height: "100%",
                  backgroundColor: "white",
                  padding: "1rem 1.25rem",
                  borderRadius: 10,
                }}
              >
                <TitleWithBar content="Score Total" barColor="#D38945" />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "0 8%",
                  }}
                >
                  <ScoreChart score={750} id="mentionsScore" />
                </div>
              </div>
              <TotalQuotes />

              <div className="sentimentChartContainer">
                <SentimentChart
                  positive={343349}
                  negative={243312}
                  neutral={103231}
                />
              </div>
            </TopCardsContainer>
            <TitleBottomBar title="Notícias em Destaque" className="mt-4" />
            <CardsContainer>
              <NewsCard
                sentiment="positive"
                source="Só Notícias"
                date="22/10/2023"
                content="Candidato a Prefeitura de Sinop é acusado de corrupção"
              />
              <NewsCard
                sentiment="neutral"
                source="Só Notícias"
                date="22/10/2023"
                content="Candidato a Prefeitura de Sinop é acusado de corrupção"
              />
              <NewsCard
                sentiment="negative"
                source="Só Notícias"
                date="22/10/2023"
                content="Candidato a Prefeitura de Sinop é acusado de corrupção"
              />
            </CardsContainer>

            <TitleBottomBar title="Menções em Destaque" />
            <CardsContainer>
              <MentionsCard
                sentiment="positive"
                source="Só Notícias"
                date="22/10/2023"
                content="Candidato a Prefeitura de Sinop é acusado de corrupção"
              />
              <MentionsCard
                sentiment="neutral"
                source="Só Notícias"
                date="22/10/2023"
                content="Candidato a Prefeitura de Sinop é acusado de corrupção"
              />
              <MentionsCard
                sentiment="negative"
                source="Só Notícias"
                date="22/10/2023"
                content="Candidato a Prefeitura de Sinop é acusado de corrupção"
              />
            </CardsContainer>
          </Main>
        </Content>
      </RootLayout>
    </main>
  );
}
