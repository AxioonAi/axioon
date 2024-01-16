import { TitleWithBar } from "@/components/Global/TitleWithBar";
import { HeaderComponent } from "@/components/home/Header";
import { NewsCard } from "@/components/home/mencoes/NewsCard";
import { SentimentChart } from "@/components/home/mencoes/SentimentChart";
import { TitleBottomBar } from "@/components/home/mencoes/TitleBottomBar";
import { TotalQuotes } from "@/components/home/mencoes/TotalQuotes";
import { useRouter } from "next/router";
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
  const timeValues = [
    {
      value: 7,
      name: "Últimos 7 Dias",
    },
    {
      value: 15,
      name: "Últimos 15 Dias",
    },
    {
      value: 30,
      name: "Últimos 30 Dias",
    },
  ];
  const [selectedTimeValues, setSelectedTimeValues] = useState({
    value: 7,
    name: "Últimos 7 Dias",
  });
  const [loading, setLoading] = useState(false);

  async function GetMentions() {
    setLoading(true);
    setMentionsData(undefined);
    if (localStorage.getItem("selectedTime") === null) {
      setSelectedTimeValues({
        value: 7,
        name: "Últimos 7 Dias",
      });
    } else {
      setSelectedTimeValues({
        value: Number(localStorage.getItem("selectedTime")),
        name: String(localStorage.getItem("selectedTimeName")),
      });
    }
    const connect = await authGetAPI(
      `/profile/mentions/${selectedProfile.id}?period=${selectedTimeValues.value}`
    );
    if (connect.status !== 200) {
      return alert(connect.body);
    }
    setMentionsData(connect.body);
    return setLoading(false);
  }

  useEffect(() => {
    if (selectedProfile.id) {
      if (typeof window !== "undefined") {
        setSelectedTimeValues({
          value: Number(localStorage.getItem("selectedTime")),
          name: String(localStorage.getItem("selectedTimeName")),
        });
      }
      GetMentions();
    }
  }, [
    selectedProfile,
    typeof window !== "undefined" ? localStorage.getItem("selectedTime") : null,
  ]);

  return (
    <main ref={main}>
      <RootLayout fadeOut={fadeOut}>
        <div
          className="mainContent bg-gray-10 rounded-tl-2xl rounded-bl-2xl
          p-4 my-2 w-full lg:w-[calc(100%-18rem)] relative left-full
          lg:left-[calc(100%-17.5rem)]"
          ref={content}
        >
          <HeaderComponent
            selectedProfile={selectedProfile}
            setSelectedProfile={setSelectedProfile}
            fadeOut={fadeOut}
            timeValues={timeValues}
            selectedTimeValues={selectedTimeValues}
            setSelectedTimeValues={setSelectedTimeValues}
            loading={loading}
            setLoading={setLoading}
          />
          {mentionsData ? (
            <div className=" rounded-lg max-w-[1080px] my-[2%] mx-auto">
              <h2 className="text-[1.875rem] font-medium mb-[1.25rem]">
                Sites de Notícias
              </h2>
              <div className="flex gap-4 flex-wrap justify-around lg:max-w-[800px] lg:mx-auto lg:justify-between md:justify-center">
                <div className="bg-white p-4 rounded-lg w-[17.25rem] h-full">
                  <TitleWithBar content="Score Total" barColor="#D38945" />
                  <div className="flex justify-center p-[0_8%]">
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
                <div className="sentimentChartContainer w-[30rem] lg:w-full md:w-full">
                  <SentimentChart
                    positive={mentionsData?.currentFormat.news.positive}
                    negative={mentionsData?.currentFormat.news.negative}
                    neutral={mentionsData?.currentFormat.news.neutral}
                  />
                </div>
              </div>
              <h2 className="text-[1.875rem] font-medium mb-[1.25rem] mt-3">
                Menções
              </h2>
              <div className="flex gap-4 flex-wrap justify-around lg:max-w-[800px] lg:mx-auto lg:justify-between md:justify-center">
                {/* Conteúdo similar para os cards de menções */}
              </div>
              <TitleBottomBar title="Notícias em Destaque" className="mt-4" />
              <div className="w-full flex justify-between flex-wrap gap-4 my-7 lg:justify-around">
                {mentionsData?.currentFormat.news.news
                  .slice(0, 3)
                  .map((item: any, index: any) => (
                    <NewsCard
                      key={index}
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
              </div>
              <TitleBottomBar title="Menções em Destaque" />
              <div className="w-full flex justify-between flex-wrap gap-4 my-7 lg:justify-around">
                {mentionsData?.currentFormat.mentions.mentions
                  .slice(0, 3)
                  .map((item: any, index: any) => (
                    <MentionsCard
                      key={index}
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
              </div>
            </div>
          ) : (
            <Spinner animation="border" />
          )}
        </div>
      </RootLayout>
    </main>
  );
}
