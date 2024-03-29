import { ChartTip } from "../ChartTip";
import { EngagmentChart } from "../EngagementData";
import { FollowerData } from "../FollowerData";
import { FollowerDataLegend } from "../FollowerData/Legend";
import { SimpleWordcloud } from "../WordCloud";
import { TitleWithBar } from "@/components/Global/TitleWithBar";
import Image from "next/image";

interface InitialProps {
  SocialMidiaData: any;
}
export function InitialPage({ SocialMidiaData }: InitialProps) {
  const followerData = [
    { name: "Instagram", count: SocialMidiaData?.followers.current.instagram },
    { name: "Facebook", count: SocialMidiaData?.followers.current.facebook },
    { name: "Youtube", count: SocialMidiaData?.followers.current.youtube },
    { name: "Tiktok", count: SocialMidiaData?.followers.current.tiktok },
  ];

  const sortedFollowerData = followerData.sort((a, b) => b.count - a.count);

  const engagmentData = [
    {
      name: "Instagram",
      count: SocialMidiaData.engagement.instagram,
      color: "#6A45BE",
      imgSrc: "/dashboard/instagramIcon.png",
    },
    {
      name: "Facebook",
      count: SocialMidiaData.engagement.facebook,
      color: "#2F5CFC",
      imgSrc: "/dashboard/facebookIcon.png",
    },
    {
      name: "Youtube",
      count: SocialMidiaData.engagement.youtube,
      color: "#E73F3F",
      imgSrc: "/dashboard/youtubeIcon.png",
    },
    {
      name: "Tiktok",
      count: SocialMidiaData.engagement.tiktok,
      color: "#29282C",
      imgSrc: "/dashboard/tiktokIcon.svg",
    },
  ];

  return (
    <div className="ChartsContainer grid grid-cols-[100%] md:grid-cols-[20rem_20rem] xl:grid-cols-[30rem_30rem] 2xl:grid-cols-[35rem_35rem] justify-center items-center gap-12 mt-5">
      <div className="followerChartContainer flex flex-col justify-around bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] h-auto min-h-[30vh] md:min-h-[55vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
        <TitleWithBar content="Dados de Seguidores" />
        <ChartTip content="Este gráfico mostra o total de seguidores de cada rede social." />

        <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center">
          <FollowerData data={followerData} />
          <div className="Legends flex flex-wrap xl:flex-nowrap xl:flex-col gap-2 justify-center">
            {sortedFollowerData.map((item, index) => (
              <FollowerDataLegend
                key={index}
                name={item.name}
                count={item.count}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="engagementChartContainer flex flex-col justify-around bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] h-auto min-h-[30vh] md:min-h-[55vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
        <div>
          <TitleWithBar
            content="Dados de Engajamento"
            barColor="#12A9E7"
            subTitle
          />
          <ChartTip content="Dados de engajamento calculados pela nossa Inteligência Artificial, determina qual Rede Social a sua presença esta mais engajada." />
        </div>
        <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center">
          <EngagmentChart chartData={engagmentData} />
          <div className="Legends flex flex-col gap-2">
            {engagmentData.map((item) => {
              return (
                <div className="EngagmentLegend flex justify-between items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      item.name === "Instagram"
                        ? "bg-[#6A45BE]"
                        : item.name === "Facebook"
                          ? "bg-[#2F5CFC]"
                          : item.name === "Youtube"
                            ? "bg-[#E73F3F]"
                            : "bg-[#29282C]"
                    }
                    `}
                  />
                  <strong className="w-auto md:w-16 text-xs font-semibold">
                    {item.name}
                  </strong>
                  <Image src={item.imgSrc} width={32} height={32} alt="" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="wordCloudContainer flex flex-col justify-around bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] h-auto min-h-[30vh] md:min-h-[55vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
        <div>
          <TitleWithBar
            barColor="#080E45"
            content="Nuvem de palavras Geral"
            subTitle
          />
          <ChartTip content="Nuvem de palavras mais relevantes Filtradas pela nossa Inteligência Artificial, com base em dados gerais." />
        </div>
        <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center">
          <SimpleWordcloud socialMediaData={SocialMidiaData.wordCloud} />
        </div>
      </div>
    </div>
  );
}
