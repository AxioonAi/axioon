import RootLayout from "@/components/Layout";
import { HeaderComponent } from "@/components/home/Header";
import { InitialPage } from "@/components/home/midias-sociais/InitialPage";
import { LikesAndComentsCard } from "@/components/home/midias-sociais/LikesAndComentsCard";
import { SocialMidiaPage } from "@/components/home/midias-sociais/SocialMidiaPage";
import gsap from "gsap";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Content, LikesAndComentsContainer, Main } from "./styles";
import { authGetAPI } from "@/lib/axios";
import { Spinner } from "react-bootstrap";

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
  const [selectedProfile, setSelectedProfile] = useState({
    name: "",
    politicalGroup: "",
    id: "",
  });
  const [socialMidiaData, setSocialMidiaData] = useState<any>();
  const [facebookData, setFacebookData] = useState();
  const [metaadsData, setMetaadsData] = useState();
  const [instagramData, setInstagramData] = useState();
  const [tiktokData, setTiktokData] = useState();
  const [youtubeData, setYoutubeData] = useState();

  async function getSocialMidiaDetails() {
    const connect = await authGetAPI(
      `/profile/social/home/${selectedProfile.id}?period=15`
    );
    if (connect.status !== 200) {
      return alert(connect.body);
    }
    setSocialMidiaData(connect.body);
  }

  async function getIndividualDetails() {
    const [facebook, metaads, instagram, tiktok, youtube] = await Promise.all([
      authGetAPI(`/profile/facebook/${selectedProfile.id}?period=${30}`),
      authGetAPI(`/profile/advertising/${selectedProfile.id}?period=${30}`),
      authGetAPI(`/profile/instagram/${selectedProfile.id}?period=${30}`),
      authGetAPI(`/profile/tiktok/${selectedProfile.id}?period=${30}`),
      authGetAPI(`/profile/youtube/${selectedProfile.id}?period=${30}`),
    ]);
    if (facebook.status !== 200) {
      return alert("facebook");
    }
    if (metaads.status !== 200) {
      return alert("metaads");
    }
    if (instagram.status !== 200) {
      return alert("instagram");
    }
    if (tiktok.status !== 200) {
      return alert("tiktok");
    }
    if (youtube.status !== 200) {
      return alert("youtube");
    }
    setFacebookData(facebook.body);
    setMetaadsData(metaads.body);
    setInstagramData(instagram.body);
    setTiktokData(tiktok.body);
    setYoutubeData(youtube.body);
  }

  console.log("socialMidiaData: ", socialMidiaData);
  console.log("facebookData: ", facebookData);
  console.log("metaadsData: ", metaadsData);
  console.log("instagramData: ", instagramData);
  console.log("tiktokData: ", tiktokData);
  console.log("youtubeData: ", youtubeData);

  useEffect(() => {
    if (selectedProfile.id) {
      getSocialMidiaDetails();
      getIndividualDetails();
    }
  }, [selectedProfile]);

  return (
    <main ref={main}>
      <RootLayout fadeOut={() => fadeOut()}>
        <Content className="mainContent" ref={content} style={{ opacity: 1 }}>
          <HeaderComponent
            selectedProfile={selectedProfile}
            setSelectedProfile={setSelectedProfile}
            fadeOut={() => fadeOut()}
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
          />
          {socialMidiaData ? (
            <Main>
              <h1>Redes Sociais</h1>
              <LikesAndComentsContainer>
                <LikesAndComentsCard
                  type="facebook"
                  barColor="#5162FF"
                  coments={socialMidiaData.staticData.facebook.followers}
                  likes={socialMidiaData.staticData.facebook.like}
                  name="Facebook"
                  onClick={() => setSelectedPage("facebook")}
                  isSelected={
                    selectedPage === "facebook" || selectedPage === "initial"
                  }
                />
                <LikesAndComentsCard
                  type="instagram"
                  barColor="#5162FF"
                  coments={socialMidiaData.staticData.instagram.followers}
                  likes={socialMidiaData.staticData.instagram.posts}
                  name="Instagram"
                  onClick={() => setSelectedPage("instagram")}
                  isSelected={
                    selectedPage === "instagram" || selectedPage === "initial"
                  }
                />
                <LikesAndComentsCard
                  type="tiktok"
                  barColor="#5162FF"
                  coments={socialMidiaData.staticData.tiktok.followers}
                  likes={socialMidiaData.staticData.tiktok.likes}
                  name="TikTok"
                  onClick={() => setSelectedPage("tiktok")}
                  isSelected={
                    selectedPage === "tiktok" || selectedPage === "initial"
                  }
                />
                <LikesAndComentsCard
                  type="youtube"
                  barColor="#5162FF"
                  coments={socialMidiaData.staticData.youtube.views}
                  likes={socialMidiaData.staticData.youtube.subs}
                  name="Youtube"
                  onClick={() => setSelectedPage("youtube")}
                  isSelected={
                    selectedPage === "youtube" || selectedPage === "initial"
                  }
                />
              </LikesAndComentsContainer>
              {selectedPage === "initial" && (
                <InitialPage SocialMidiaData={socialMidiaData} />
              )}
              {selectedPage === "facebook" && (
                <SocialMidiaPage
                  id={"score"}
                  pageType="facebook"
                  pageData={facebookData}
                  metaads={metaadsData}
                />
              )}
              {selectedPage === "instagram" && (
                <SocialMidiaPage
                  id={"score"}
                  pageType="instagram"
                  pageData={instagramData}
                />
              )}
              {selectedPage === "tiktok" && (
                <SocialMidiaPage
                  id={"score"}
                  pageType="tiktok"
                  pageData={tiktokData}
                />
              )}
              {selectedPage === "youtube" && (
                <SocialMidiaPage
                  id={"score"}
                  pageType="youtube"
                  pageData={youtubeData}
                />
              )}
            </Main>
          ) : (
            <Spinner animation="border" />
          )}
        </Content>
      </RootLayout>
    </main>
  );
}
