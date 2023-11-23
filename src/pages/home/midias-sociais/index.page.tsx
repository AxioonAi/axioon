import { Sidebar } from "@/components/Global/Sidebar";
import { TitleWithBar } from "@/components/Global/TitleWithBar";
import { LikesAndComentsCard } from "@/components/home/Charts/LikesCard";
import { EngagmentChart } from "@/components/home/Charts/PieChart";
import { VotersActive } from "@/components/home/Charts/VotersActive";
import { LineChartComponent } from "@/components/home/Charts/recharts/linechart";
import { BarChartComponent } from "@/components/home/Charts/recharts/verticalBarChart";
import { HeaderComponent } from "@/components/home/Header";
import { useRouter } from "next/router";
import {
  ChartCenterInfo,
  ChartContainer,
  ChartsContainer,
  Container,
  Content,
  LikesAndComentsContainer,
  Main,
  Tip,
} from "./styles";
import { DoughnutChart } from "@/components/home/Charts/DoughnutChart";
import { FollowerData } from "@/components/home/Charts/FollowerData";
import ReactWordcloud from "react-wordcloud";
import { SimpleWordcloud } from "@/components/home/Charts/WordCloud";
import { useEffect, useState } from "react";

export default function MidiasSociais() {
  const router = useRouter();
  return (
    <Container>
      <Sidebar />
      <Content>
        <HeaderComponent />
        <Main>
          <h1>Redes Sociais</h1>
          <LikesAndComentsContainer>
            <LikesAndComentsCard
              barColor="#5162FF"
              coments={1}
              likes={25}
              name="Facebook"
            />
            <LikesAndComentsCard
              barColor="#5162FF"
              coments={1}
              likes={25}
              name="Facebook"
            />
            <LikesAndComentsCard
              barColor="#5162FF"
              coments={1}
              likes={25}
              name="Facebook"
            />
            <LikesAndComentsCard
              barColor="#5162FF"
              coments={1}
              likes={25}
              name="Facebook"
            />
          </LikesAndComentsContainer>

          <ChartsContainer>
            <ChartContainer>
              <TitleWithBar content="Dados de Seguidores" barColor="#080E45" />
              <div className="content">
                <ChartCenterInfo>
                  <strong className="percentage">34%</strong>
                  <strong className="gain">
                    <img src="/dashboard/arrow-up.svg" alt="" /> +6.5%
                  </strong>
                  <span className="description">de ganho em processos</span>
                </ChartCenterInfo>
                <FollowerData />
                <p>teste</p>
              </div>
            </ChartContainer>
            <ChartContainer>
              <TitleWithBar content="Dados de Engajamento" barColor="#12A9E7" />
              <div
                style={{ height: "100%", width: "auto", marginLeft: "4rem" }}
              >
                <EngagmentChart />
              </div>
            </ChartContainer>
            <ChartContainer
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <TitleWithBar
                barColor="#080E45"
                content="Nuvem de palavras Geral"
                subTitle
              />
              <SimpleWordcloud />
            </ChartContainer>
            <ChartContainer style={{ height: "400px" }}>
              <TitleWithBar
                content="Horário que os Eleitores estão mais Ativos em Sua Rede Social:"
                barColor="#12A9E7"
                subTitle
              />
              <div
                style={{
                  height: "300px",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <VotersActive />
              </div>

              <Tip>
                <img src="/dashboard/userIcon.svg" alt="" />
                <p>
                  Se quiser ter um maior alcance nas Redes Sociais se atente a
                  estes horários.
                </p>
              </Tip>
            </ChartContainer>
          </ChartsContainer>
        </Main>
      </Content>
    </Container>
  );
}
