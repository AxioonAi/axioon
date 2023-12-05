import { Sidebar } from "@/components/Global/Sidebar";
import { TitleWithBar } from "@/components/Global/TitleWithBar";
import { HeaderComponent } from "@/components/home/Header";
import { EngagmentChart } from "@/components/home/midias-sociais/EngagementData";
import { FollowerData } from "@/components/home/midias-sociais/FollowerData";
import { LikesAndComentsCard } from "@/components/home/midias-sociais/LikesAndComentsCard";
import { VotersActive } from "@/components/home/midias-sociais/VotersActive";
import { SimpleWordcloud } from "@/components/home/midias-sociais/WordCloud";
import {
  ChartCenterInfo,
  ChartContainer,
  ChartsContainer,
  Content,
  FollowerDataLegendContainer,
  LikesAndComentsContainer,
  Main,
  Tip,
} from "./styles";
import { FollowerDataLegend } from "@/components/home/midias-sociais/FollowerData/Legend";
import RootLayout from "@/components/Layout";
import gsap from "gsap";
import { useLayoutEffect, useRef, useState } from "react";
import { PostEngagement } from "@/components/home/midias-sociais/PostEngagement";
import { ScoreChart } from "@/components/home/ScoreChart";
import { InitialPage } from "@/components/home/midias-sociais/InitialPage";
import { SocialMidiaPage } from "@/components/home/midias-sociais/SocialMidiaPage";

export default function MidiasSociais() {
  const main = useRef(null);
  const content = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".mainContent", {
        x: "-100%",
        opacity: 1,
        duration: 0.5,
        delay: 0.2,
      });
    }, main);
    return () => ctx.revert();
  }, []);

  const fadeOut = () => {
    const ctx = gsap.context(() => {
      gsap.to(".mainContent", {
        opacity: 0,
        duration: 0.5,
      });
    }, main);
    return () => ctx.revert();
  };

  const [selectedPage, setSelectedPage] = useState("initial");

  return (
    <main ref={main}>
      <RootLayout fadeOut={() => fadeOut()}>
        <Content className="mainContent" ref={content} style={{ opacity: 1 }}>
          <HeaderComponent fadeOut={() => fadeOut()} />
          <Main>
            <h1>Redes Sociais</h1>
            <LikesAndComentsContainer>
              <LikesAndComentsCard
                type="facebook"
                barColor="#5162FF"
                coments={1}
                likes={25}
                name="Facebook"
                onClick={() => setSelectedPage("facebook")}
                isSelected={
                  selectedPage === "facebook" || selectedPage === "initial"
                }
              />
              <LikesAndComentsCard
                type="instagram"
                barColor="#5162FF"
                coments={1}
                likes={25}
                name="Instagram"
                onClick={() => setSelectedPage("instagram")}
                isSelected={
                  selectedPage === "instagram" || selectedPage === "initial"
                }
              />
              <LikesAndComentsCard
                type="tiktok"
                barColor="#5162FF"
                coments={1}
                likes={25}
                name="TikTok"
                onClick={() => setSelectedPage("tiktok")}
                isSelected={
                  selectedPage === "tiktok" || selectedPage === "initial"
                }
              />
              <LikesAndComentsCard
                type="youtube"
                barColor="#5162FF"
                coments={1}
                likes={25}
                name="Youtube"
                onClick={() => setSelectedPage("youtube")}
                isSelected={
                  selectedPage === "youtube" || selectedPage === "initial"
                }
              />
            </LikesAndComentsContainer>

            {selectedPage === "initial" && <InitialPage />}
            {selectedPage === "facebook" && <SocialMidiaPage />}
            {selectedPage === "instagram" && <SocialMidiaPage />}
            {selectedPage === "tiktok" && <SocialMidiaPage />}
            {selectedPage === "youtube" && <SocialMidiaPage />}
          </Main>
        </Content>
      </RootLayout>
    </main>
  );
}
