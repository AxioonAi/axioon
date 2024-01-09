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
    <ChartsContainer>
      {/* Score */}

      <ChartContainer>
        <TitleWithBar content="Dados de Seguidores" barColor="#080E45" />
        <div className="chartContent">
          <ChartCenterInfo>
            <strong className="percentage">34%</strong>
            <strong className="gain">
              <img src="/dashboard/arrow-up.svg" alt="" /> +6.5%
            </strong>
            <span className="description">de ganho em processos</span>
          </ChartCenterInfo>
          <FollowerData data={followerData} />

          <FollowerDataLegendContainer>
            {sortedFollowerData.map((item, index) => (
              <FollowerDataLegend
                key={index}
                name={item.name}
                count={item.count}
                circleColor={colors[index]}
              />
            ))}
          </FollowerDataLegendContainer>
        </div>
      </ChartContainer>

      <EngagmentDataContainer>
        <TitleWithBar
          content="Dados de Engajamento"
          barColor="#12A9E7"
          subTitle
        />
        <ChartTip content="my text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when a..." />
        <div className="chartContent">
          <div className="chart">
            <EngagmentChart chartData={engagmentData} />
          </div>
          <div className="legends">
            {engagmentData.map((item) => {
              return (
                <EngagmentLegendContainer circleColor={item.color}>
                  <div className="circle" />
                  <strong style={{}}>{item.name}</strong>
                  <Image src={item.imgSrc} width={32} height={32} alt="" />
                </EngagmentLegendContainer>
              );
            })}
          </div>
        </div>
      </EngagmentDataContainer>

      <WordCloudContainer>
        <div className="title">
          <TitleWithBar
            barColor="#080E45"
            content="Nuvem de palavras Geral"
            subTitle
            className="mb-3"
          />
        </div>
        <ChartTip content="my text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when a..." />
        <SimpleWordcloud />
      </WordCloudContainer>

      <KeyIndicatorsContainer>
        <TitleWithBar
          content="Indicadores Chave:"
          barColor="#12A9E7"
          subTitle
        />
        <ChartTip content="my text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when a..." />
        <KeyIndicators pageData={SocialMidiaData} />
      </KeyIndicatorsContainer>
    </ChartsContainer>
  );
}
