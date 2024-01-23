import { DateSelectorDropdown } from "@/components/Global/Dropdown/DateSelector";
import RootLayout from "@/components/Layout";
import { LikesAndComentsCard } from "@/components/home/midias-sociais/LikesAndComentsCard";
import { SocialMidiaPage } from "@/components/home/midias-sociais/SocialMidiaPage";
import Theme from "@/styles/themes";
import gsap from "gsap";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { LikesAndComentsContainer } from "../home/midias-sociais/styles";
import {
  CenterContainer,
  Content,
  Grid,
  HeadToHeadBar,
  Image,
  ImageCircle,
  IndividualContainer,
  Main,
} from "./styles";
import { ComparisonHeaderComponent } from "@/components/Comparison";
import { authGetAPI } from "@/lib/axios";
import { TitleWithBar } from "@/components/Global/TitleWithBar";
import { PostEngagement } from "@/components/home/midias-sociais/PostEngagement";
import { ComparisonType } from "@/components/home/Comparison";
// import { Dropdown } from "@/components/Global/Dropdown";
export default function Comparison() {
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
  const [socialMidiaData, setSocialMidiaData] = useState<any>();
  const [facebookData, setFacebookData] = useState();
  const [metaadsData, setMetaadsData] = useState();
  const [instagramData, setInstagramData] = useState();
  const [tiktokData, setTiktokData] = useState();
  const [youtubeData, setYoutubeData] = useState();
  const [loading, setLoading] = useState(false);
  const [locked, setLocked] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState({
    name: "",
    politicalGroup: "",
    id: "",
  });
  const [selectedTimeValues, setSelectedTimeValues] = useState({
    value: 7,
    name: "Últimos 7 Dias",
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

  console.log("selectedTimeValues", selectedTimeValues);

  async function getComparison() {
    const connect = await authGetAPI(
      `/profile/comparison/${selectedProfile.id}?period=${15}`
    );
  }

  useEffect(() => {
    if (selectedProfile.id !== "") {
      getComparison();
    }
  }, [selectedProfile.id]);

  return (
    <main ref={main}>
      <RootLayout fadeOut={() => fadeOut()}>
        <div
          className="mainContent bg-gray-10 relative m-1 rounded-tl-2xl rounded-bl-2xl pb-12 px-2 pt-2 w-full left-full lg:w-[calc(100%-18rem)] lg:left-[calc(100%-18rem)]"
          ref={content}
          style={{ opacity: 1 }}
        >
          <ComparisonHeaderComponent
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
            selectedProfile={selectedProfile}
            setSelectedProfile={setSelectedProfile}
            fadeOut={fadeOut}
            timeValues={timeValues}
            selectedTimeValues={selectedTimeValues}
            setSelectedTimeValues={setSelectedTimeValues}
            loading={loading}
            setLoading={setLoading}
          />
          <div className="LikesAndCommentsContainer flex justify-around gap-1 mt-8 flex-wrap">
            <LikesAndComentsCard
              type="facebook"
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
              coments={1}
              likes={25}
              name="Youtube"
              onClick={() => setSelectedPage("youtube")}
              isSelected={
                selectedPage === "youtube" || selectedPage === "initial"
              }
            />
          </div>
          {selectedPage === "facebook" && (
            <ComparisonType
              loading={loading}
              id={"scoreComparison"}
              pageType="facebook"
              pageData={facebookData}
              locked={locked}
            />
          )}
          {selectedPage === "instagram" && (
            <ComparisonType
              loading={loading}
              id={"scoreComparison"}
              pageType="instagram"
              pageData={instagramData}
            />
          )}
          {selectedPage === "tiktok" && (
            <ComparisonType
              loading={loading}
              id={"scoreComparison"}
              pageType="tiktok"
              pageData={tiktokData}
            />
          )}
          {selectedPage === "youtube" && (
            <ComparisonType
              loading={loading}
              id={"scoreComparison"}
              pageType="youtube"
              pageData={youtubeData}
            />
          )}
        </div>
      </RootLayout>
    </main>
  );
}
