import { TitleWithBar } from "@/components/Global/TitleWithBar";
import RootLayout from "@/components/Layout";
import { HeaderComponent } from "@/components/home/Header";
import { ScoreChart } from "@/components/home/ScoreChart";
import { MentionsCard } from "@/components/home/mencoes/MentionsCard";
import { NewsCard } from "@/components/home/mencoes/NewsCard";
import { SentimentChart } from "@/components/home/mencoes/SentimentChart";
import { TitleBottomBar } from "@/components/home/mencoes/TitleBottomBar";
import { TotalQuotes } from "@/components/home/mencoes/TotalQuotes";
import { authGetAPI } from "@/lib/axios";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { Spinner } from "react-bootstrap";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

export default function SeuEleitorado() {
  const main = useRef(null);
  const content = useRef(null);

  useEffect(() => {
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
    name: "Carregando...",
    politicalGroup: "",
    id: "",
    image: "",
    campaignNumber: 0,
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
  const [seeMoreNews, setSeeMoreNews] = useState(false);
  const [seeMoreMentions, setSeeMoreMentions] = useState(false);

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
      `/profile/mentions/${selectedProfile.id}?period=${selectedTimeValues.value}`,
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
            <div className="rounded-lg max-w-[1080px] my-[2%] mx-auto">
              <h2 className="text-[1.875rem] font-medium mb-[1.25rem]">
                Sites de Notícias
              </h2>
              <div className="flex gap-4 bg-white flex-wrap items-center justify-around lg:mx-auto md:justify-center">
                <div className="bg-white p-4 rounded-lg w-[17.25rem] h-full">
                  <TitleWithBar content="Score Total" barColor="#D38945" />
                  <div className="flex justify-center p-[0_8%]">
                    <ScoreChart
                      score={
                        mentionsData.currentFormat.news.news.length !== 0
                          ? Number(
                              mentionsData?.currentFormat.news.average.toFixed(
                                0,
                              ),
                            )
                          : 0
                      }
                      id="newsScore"
                    />
                  </div>
                </div>
                <TotalQuotes
                  value={
                    mentionsData.currentFormat.news.news.length !== 0
                      ? mentionsData?.currentFormat.news.total
                      : 0
                  }
                  firstDate={new Date(
                    new Date().setDate(
                      new Date().getDate() - selectedTimeValues.value,
                    ),
                  ).toLocaleDateString("pt-BR")}
                  lastDate={new Date().toLocaleDateString("pt-BR")}
                />
                <div className="sentimentChartContainer w-full lg:w-[30rem]">
                  <SentimentChart
                    positive={
                      mentionsData.currentFormat.news.news.length !== 0
                        ? mentionsData?.currentFormat.news.positive
                        : 0
                    }
                    negative={
                      mentionsData.currentFormat.news.news.length !== 0
                        ? mentionsData?.currentFormat.news.negative
                        : 0
                    }
                    neutral={
                      mentionsData.currentFormat.news.news.length !== 0
                        ? mentionsData?.currentFormat.news.neutral
                        : 0
                    }
                  />
                </div>
              </div>
              <h2 className="text-[1.875rem] font-medium mb-[1.25rem]">
                Menções
              </h2>
              <div className="flex gap-4 bg-white flex-wrap items-center justify-around lg:mx-auto md:justify-center">
                <div className="bg-white p-4 rounded-lg w-[17.25rem] h-full">
                  <TitleWithBar content="Score Total" barColor="#D38945" />
                  <div className="flex justify-center p-[0_8%]">
                    <ScoreChart
                      score={
                        mentionsData.currentFormat.mentions.mentions.length !==
                        0
                          ? Number(
                              mentionsData?.currentFormat.mentions.average.toFixed(
                                0,
                              ),
                            )
                          : 0
                      }
                      id="mentionsScore"
                    />
                  </div>
                </div>
                <TotalQuotes
                  value={
                    mentionsData.currentFormat.mentions.mentions.length !== 0
                      ? mentionsData?.currentFormat.mentions.total
                      : 0
                  }
                  firstDate={new Date(
                    new Date().setDate(
                      new Date().getDate() - selectedTimeValues.value,
                    ),
                  ).toLocaleDateString("pt-BR")}
                  lastDate={new Date().toLocaleDateString("pt-BR")}
                />
                <div className="sentimentChartContainer w-full lg:w-[30rem]">
                  <SentimentChart
                    positive={
                      mentionsData.currentFormat.mentions.mentions.length !== 0
                        ? mentionsData?.currentFormat.mentions.positive
                        : 0
                    }
                    negative={
                      mentionsData.currentFormat.mentions.mentions.length !== 0
                        ? mentionsData?.currentFormat.mentions.negative
                        : 0
                    }
                    neutral={
                      mentionsData.currentFormat.mentions.mentions.length !== 0
                        ? mentionsData?.currentFormat.mentions.neutral
                        : 0
                    }
                  />
                </div>
              </div>

              {mentionsData.currentFormat.news.news.length !== 0 && (
                <>
                  <div className="flex justify-between items-center mt-4">
                    <TitleBottomBar title="Notícias em Destaque" />
                    <span
                      className="underline"
                      onClick={() => setSeeMoreNews(!seeMoreNews)}
                    >
                      {seeMoreNews ? "Menos" : "Mais"}
                    </span>
                  </div>
                  <div className="flex flex-col xl:flex-row w-full h-full xl:h-52 xl:p-0 items-center justify-center gap-4 my-4 lg:justify-around">
                    <div className="hidden lg:block w-full">
                      <Swiper
                        slidesPerView={seeMoreNews ? 3.5 : 3}
                        className="mySwiper"
                      >
                        {mentionsData?.currentFormat.news.news
                          .slice(
                            0,
                            seeMoreNews
                              ? mentionsData.currentFormat.news.news.length
                              : 3,
                          )
                          .map((item: any, index: any) => (
                            <SwiperSlide className="lg:ml-0 xl:ml-4">
                              <NewsCard
                                key={index}
                                sentimentClassification={
                                  item.sentimentClassification
                                }
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
                            </SwiperSlide>
                          ))}
                      </Swiper>
                    </div>
                    <div className="lg:hidden flex flex-col gap-1 h-[70vh]">
                      <Swiper
                        direction="vertical"
                        slidesPerView={seeMoreNews ? 3.5 : 3}
                        className="mySwiper2 h-full"
                      >
                        {mentionsData?.currentFormat.news.news
                          .slice(
                            0,
                            seeMoreNews
                              ? mentionsData.currentFormat.news.news.length
                              : 3,
                          )
                          .map((item: any, index: any) => (
                            <SwiperSlide>
                              <NewsCard
                                key={index}
                                sentimentClassification={
                                  item.sentimentClassification
                                }
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
                            </SwiperSlide>
                          ))}
                      </Swiper>
                    </div>
                  </div>
                </>
              )}
              {mentionsData.currentFormat.mentions.mentions.length !== 0 && (
                <>
                  <div className="flex justify-between items-center mt-4">
                    <TitleBottomBar title="Menções em Destaque" />
                    <span
                      className="underline"
                      onClick={() => setSeeMoreMentions(!seeMoreMentions)}
                    >
                      {seeMoreMentions ? "Menos" : "Mais"}
                    </span>
                  </div>
                  <div className="flex flex-col xl:flex-row w-full h-full xl:h-52 xl:p-0 items-center justify-center gap-4 my-4 lg:justify-around">
                    <div className="hidden lg:block w-full">
                      <Swiper
                        slidesPerView={seeMoreMentions ? 3.5 : 3}
                        className="mySwiper2"
                      >
                        {mentionsData?.currentFormat.mentions.mentions
                          .slice(
                            0,
                            seeMoreMentions
                              ? mentionsData.currentFormat.mentions.mentions
                                  .length
                              : 3,
                          )
                          .map((item: any, index: any) => (
                            <SwiperSlide className="lg:ml-0 xl:ml-4">
                              <MentionsCard
                                key={index}
                                sentimentClassification={
                                  item.sentimentClassification
                                }
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
                            </SwiperSlide>
                          ))}
                      </Swiper>
                    </div>
                    <div className="lg:hidden flex flex-col gap-1 h-[70vh]">
                      <Swiper
                        direction="vertical"
                        slidesPerView={seeMoreMentions ? 3.5 : 3}
                        className="mySwiper2 h-full"
                      >
                        {mentionsData?.currentFormat.mentions.mentions
                          .slice(
                            0,
                            seeMoreMentions
                              ? mentionsData.currentFormat.mentions.mentions
                                  .length
                              : 3,
                          )
                          .map((item: any, index: any) => (
                            <SwiperSlide>
                              <MentionsCard
                                key={index}
                                sentimentClassification={
                                  item.sentimentClassification
                                }
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
                            </SwiperSlide>
                          ))}
                      </Swiper>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center rounded-lg max-w-[1080px] h-1/2 my-[2%] mx-auto">
              <Spinner animation="border" />
            </div>
          )}
        </div>
      </RootLayout>
    </main>
  );
}
