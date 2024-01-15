import { TitleWithBar } from "@/components/Global/TitleWithBar";
import { HeaderComponent } from "@/components/home/Header";
import { NewsCard } from "@/components/home/mencoes/NewsCard";
import { SentimentChart } from "@/components/home/mencoes/SentimentChart";
import { TitleBottomBar } from "@/components/home/mencoes/TitleBottomBar";
import { TotalQuotes } from "@/components/home/mencoes/TotalQuotes";
import { useRouter } from "next/router";
import { CardsContainer, Content, Main, TopCardsContainer } from "./styles";
import RootLayout from "@/components/Layout";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScoreChart } from "@/components/home/ScoreChart";
import { NewsModal } from "@/components/home/mencoes/NewsModal";
import { MentionsCard } from "@/components/home/mencoes/MentionsCard";
import { authGetAPI } from "@/lib/axios";
import { Spinner } from "react-bootstrap";

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
  const [mentionsData, setMentionsData] = useState<any>();

  async function GetMentions() {
    const connect = await authGetAPI(
      `/profile/mentions/${selectedProfile.id}?period=30`
    );
    if (connect.status !== 200) {
      return alert(connect.body);
    }
    setMentionsData(connect.body);
  }

  useEffect(() => {
    if (selectedProfile.id) {
      GetMentions();
    }
  }, [selectedProfile]);

  console.log("mentionsData: ", mentionsData);

  return (
    <main ref={main}>
      <RootLayout fadeOut={() => fadeOut()}>
        <Content className="mainContent" ref={content} style={{ opacity: 1 }}>
          <HeaderComponent
            selectedProfile={selectedProfile}
            setSelectedProfile={setSelectedProfile}
            fadeOut={() => fadeOut()}
          />
          {mentionsData ? (
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
                    <ScoreChart
                      score={Number(
                        mentionsData?.currentFormat.news.average.toFixed(2)
                      )}
                      id="newsScore"
                    />
                  </div>
                </div>
                <TotalQuotes
                  value={mentionsData?.currentFormat.news.total}
                  firstDate={new Date(
                    new Date().setDate(new Date().getDate() - 30)
                  ).toLocaleDateString("pt-BR")}
                  lastDate={new Date().toLocaleDateString("pt-BR")}
                />

                <div className="sentimentChartContainer">
                  <SentimentChart
                    positive={mentionsData?.currentFormat.news.positive}
                    negative={mentionsData?.currentFormat.news.negative}
                    neutral={mentionsData?.currentFormat.news.neutral}
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
                    <ScoreChart
                      score={Number(
                        mentionsData?.currentFormat.mentions.average.toFixed(2)
                      )}
                      id="mentionsScore"
                    />
                  </div>
                </div>
                <TotalQuotes
                  value={Number(mentionsData?.currentFormat.mentions.total)}
                  firstDate={new Date(
                    new Date().setDate(new Date().getDate() - 30)
                  ).toLocaleDateString("pt-BR")}
                  lastDate={new Date().toLocaleDateString("pt-BR")}
                />

                <div className="sentimentChartContainer">
                  <SentimentChart
                    positive={mentionsData?.currentFormat.mentions.positive}
                    negative={mentionsData?.currentFormat.mentions.negative}
                    neutral={mentionsData?.currentFormat.mentions.neutral}
                  />
                </div>
              </TopCardsContainer>
              <TitleBottomBar title="Notícias em Destaque" className="mt-4" />
              <CardsContainer>
                {mentionsData?.currentFormat.news.news
                  .slice(0, 3)
                  .map((item: any) => (
                    <NewsCard
                      sentimentClassification={item.sentimentClassification}
                      sentiment={item.sentiment}
                      source="Só Notícias"
                      url={item.url}
                      date={item.date
                        .split("T")[0]
                        .split("-")
                        .reverse()
                        .join("/")}
                      content={item.title}
                    />
                  ))}
              </CardsContainer>

              <TitleBottomBar title="Menções em Destaque" />
              <CardsContainer>
                {mentionsData?.currentFormat.mentions.mentions
                  .slice(0, 3)
                  .map((item: any) => (
                    <MentionsCard
                      sentimentClassification={item.sentimentClassification}
                      sentiment={item.sentiment}
                      source={item.profile}
                      comments={item.comments}
                      commentSentiment={item.commentSentiment}
                      url={item.url}
                      date={item.date
                        .split("T")[0]
                        .split("-")
                        .reverse()
                        .join("/")}
                      content={item.title}
                    />
                  ))}
              </CardsContainer>
            </Main>
          ) : (
            <Spinner animation="border" />
          )}
        </Content>
      </RootLayout>
    </main>
  );
}
