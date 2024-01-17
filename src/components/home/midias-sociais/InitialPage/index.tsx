import { TitleWithBar } from "@/components/Global/TitleWithBar";
import { ChartTip } from "../ChartTip";
import { KeyIndicators } from "../KeyIndicators";
import {
  ChartCenterInfo,
  ChartContainer,
  ChartsContainer,
  EngagmentDataContainer,
  EngagmentLegendContainer,
  FollowerDataLegendContainer,
  KeyIndicatorsContainer,
  WordCloudContainer,
} from "./styles";
import { SimpleWordcloud } from "../WordCloud";
import { EngagmentChart } from "../EngagementData";
import Image from "next/image";
import { FollowerData } from "../FollowerData";
import { FollowerDataLegend } from "../FollowerData/Legend";

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

  const colors = ["#2F5CFC", "#0A2BA0", "#000411", "#E5E8F0"];

  const sortedFollowerData = followerData.sort((a, b) => b.count - a.count);

  const engagmentData = [
    {
      name: "Instagram",
      count: 40000,
      color: "#E7298A",
      imgSrc: "/dashboard/instagramIcon.png",
    },
    {
      name: "Facebook",
      count: 40000,
      color: "#2F5CFC",
      imgSrc: "/dashboard/facebookIcon.png",
    },
    {
      name: "Youtube",
      count: 40000,
      color: "#E73F3F",
      imgSrc: "/dashboard/youtubeIcon.png",
    },
    {
      name: "Tiktok",
      count: 20000,
      color: "#29282C",
      imgSrc: "/dashboard/tiktokIcon.svg",
    },
  ];

  return (
    <div className="ChartsContainer grid grid-cols-[100%] md:grid-cols-[20rem_20rem] xl:grid-cols-[30rem_30rem] 2xl:grid-cols-[35rem_35rem] justify-center items-center gap-12 mt-5">
      {/* Score */}

      <div className="followerChartContainer flex flex-col bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] md:h-[55vh] lg:h-[55vh] xl:h-[35vh]">
        <TitleWithBar content="Dados de Seguidores" />
        <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center">
          <div className="chartCenterInfo flex absolute top-1/3 md:top-[30%] lg:top-1/3 xl:top-1/2 3xl:top-1/3 left-[50%] lg:left-1/2 xl:left-[35%] 2xl:left-[30%] translate-x-[-50%]">
            <strong className="gain flex text-sm">
              <img src="/dashboard/arrow-up.svg" alt="" /> +6.5%
            </strong>
          </div>
          <FollowerData data={followerData} />

          <div className="Legends flex flex-col gap-2">
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

      <div className="engagementChartContainer flex flex-col bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] md:h-[55vh] lg:h-[55vh] xl:h-[35vh]">
        <div>
          <TitleWithBar
            content="Dados de Engajamento"
            barColor="#12A9E7"
            subTitle
          />
          <ChartTip content="my text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when a..." />
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
                        ? "bg-[#E7298A]"
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

      <div className="wordCloudContainer flex flex-col bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] md:h-[55vh] lg:h-[55vh] xl:h-[35vh]">
        <div>
          <TitleWithBar
            barColor="#080E45"
            content="Nuvem de palavras Geral"
            subTitle
            className="mb-3"
          />
          <ChartTip content="my text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when a..." />
        </div>
        <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center">
          <SimpleWordcloud socialMediaData={SocialMidiaData.wordCloud} />
        </div>
      </div>

      {/* <KeyIndicatorsContainer>
        <TitleWithBar
          content="Indicadores Chave:"
          barColor="#12A9E7"
          subTitle
        />
        <ChartTip content="my text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when a..." />
        <KeyIndicators pageData={SocialMidiaData} />
      </KeyIndicatorsContainer> */}
    </div>
  );
}
