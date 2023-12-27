import RootLayout from "@/components/Layout";
import { HeaderComponent } from "@/components/home/Header";
import { InitialPage } from "@/components/home/midias-sociais/InitialPage";
import { LikesAndComentsCard } from "@/components/home/midias-sociais/LikesAndComentsCard";
import { SocialMidiaPage } from "@/components/home/midias-sociais/SocialMidiaPage";
import gsap from "gsap";
import { useLayoutEffect, useRef, useState } from "react";
import { Content, LikesAndComentsContainer, Main } from "./styles";

export default function MidiasSociais() {
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
            {selectedPage === "facebook" && (
              <SocialMidiaPage id={"score"} pageType="facebook" />
            )}
            {selectedPage === "instagram" && (
              <SocialMidiaPage id={"score"} pageType="instagram" />
            )}
            {selectedPage === "tiktok" && (
              <SocialMidiaPage id={"score"} pageType="tiktok" />
            )}
            {selectedPage === "youtube" && (
              <SocialMidiaPage id={"score"} pageType="youtube" />
            )}
          </Main>
        </Content>
      </RootLayout>
    </main>
  );
}
