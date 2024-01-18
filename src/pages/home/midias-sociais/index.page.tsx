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

  const [selectedPage, setSelectedPage] = useState("facebook");
  const [selectedProfile, setSelectedProfile] = useState({
    name: "",
    politicalGroup: "",
    id: "",
  });
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
  const [socialMidiaData, setSocialMidiaData] = useState<any>();
  const [facebookData, setFacebookData] = useState();
  const [metaadsData, setMetaadsData] = useState();
  const [instagramData, setInstagramData] = useState();
  const [tiktokData, setTiktokData] = useState();
  const [youtubeData, setYoutubeData] = useState();
  const [loading, setLoading] = useState(false);
  const [locked, setLocked] = useState(true);

  async function getSocialMidiaDetails() {
    const connect = await authGetAPI(
      `/profile/social/home/${selectedProfile.id}?period=${selectedTimeValues.value}`
    );
    if (connect.status !== 200) {
      return alert(connect.body);
    }
    setSocialMidiaData(connect.body);
  }

  async function getIndividualDetails() {
    setLoading(true);
    setFacebookData(undefined);
    setMetaadsData(undefined);
    setInstagramData(undefined);
    setTiktokData(undefined);
    setYoutubeData(undefined);
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
    const [facebook, metaads, instagram, tiktok, youtube] = await Promise.all([
      authGetAPI(
        `/profile/facebook/${selectedProfile.id}?period=${selectedTimeValues.value}`
      ),
      authGetAPI(
        `/profile/advertising/${selectedProfile.id}?period=${selectedTimeValues.value}`
      ),
      authGetAPI(
        `/profile/instagram/${selectedProfile.id}?period=${selectedTimeValues.value}`
      ),
      authGetAPI(
        `/profile/tiktok/${selectedProfile.id}?period=${selectedTimeValues.value}`
      ),
      authGetAPI(
        `/profile/youtube/${selectedProfile.id}?period=${selectedTimeValues.value}`
      ),
    ]);
    if (metaads.status !== 200) {
      setLocked(true);
    }
    if (facebook.status === 200) {
      setFacebookData(facebook.body);
    }
    if (metaads.status === 200) {
      setMetaadsData(metaads.body);
      setLocked(false);
    }
    if (instagram.status === 200) {
      setInstagramData(instagram.body);
    }
    if (tiktok.status === 200) {
      setTiktokData(tiktok.body);
    }
    if (youtube.status === 200) {
      setYoutubeData(youtube.body);
    }
    return setLoading(false);
  }

  useEffect(() => {
    if (selectedProfile.id) {
      getSocialMidiaDetails();
      if (typeof window !== "undefined") {
        setSelectedTimeValues({
          value: Number(localStorage.getItem("selectedTime")),
          name: String(localStorage.getItem("selectedTimeName")),
        });
      }
      getIndividualDetails();
    }
  }, [
    selectedProfile,
    typeof window !== "undefined" ? localStorage.getItem("selectedTime") : null,
  ]);

  return (
    <main ref={main}>
      <RootLayout fadeOut={() => fadeOut()}>
        <div
          className="mainContent bg-gray-10 relative m-1 rounded-tl-2xl rounded-bl-2xl pb-12 px-2 pt-2 w-full left-full lg:w-[calc(100%-18rem)] lg:left-[calc(100%-18rem)]"
          ref={content}
          style={{ opacity: 1 }}
        >
          <HeaderComponent
            selectedProfile={selectedProfile}
            setSelectedProfile={setSelectedProfile}
            fadeOut={() => fadeOut()}
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
            timeValues={timeValues}
            selectedTimeValues={selectedTimeValues}
            setSelectedTimeValues={setSelectedTimeValues}
            getIndividualDetails={getIndividualDetails}
            loading={loading}
            setLoading={setLoading}
          />
          {socialMidiaData ? (
            <main className="Main m-0 rounded-lg md:m-2">
              <h1 className="text-2xl py-8 font-extrabold">Redes Sociais</h1>
              <div className="LikesAndCommentsContainer flex justify-around gap-1 flex-wrap">
                <LikesAndComentsCard
                  type="facebook"
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
                  coments={socialMidiaData.staticData.youtube.views}
                  likes={socialMidiaData.staticData.youtube.subs}
                  name="Youtube"
                  onClick={() => setSelectedPage("youtube")}
                  isSelected={
                    selectedPage === "youtube" || selectedPage === "initial"
                  }
                />
              </div>
              {selectedPage === "initial" && (
                <InitialPage SocialMidiaData={socialMidiaData} />
              )}
              {selectedPage === "facebook" && (
                <SocialMidiaPage
                  loading={loading}
                  id={"score"}
                  pageType="facebook"
                  pageData={facebookData}
                  metaads={metaadsData}
                  locked={locked}
                />
              )}
              {selectedPage === "instagram" && (
                <SocialMidiaPage
                  loading={loading}
                  id={"score"}
                  pageType="instagram"
                  pageData={instagramData}
                />
              )}
              {selectedPage === "tiktok" && (
                <SocialMidiaPage
                  loading={loading}
                  id={"score"}
                  pageType="tiktok"
                  pageData={tiktokData}
                />
              )}
              {selectedPage === "youtube" && (
                <SocialMidiaPage
                  loading={loading}
                  id={"score"}
                  pageType="youtube"
                  pageData={youtubeData}
                />
              )}
            </main>
          ) : (
            <Spinner animation="border" />
          )}
        </div>
      </RootLayout>
    </main>
  );
}
