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
import { ComparisonHeaderComponent } from "@/components/Comparison/Header";
import { authGetAPI } from "@/lib/axios";
import { TitleWithBar } from "@/components/Global/TitleWithBar";
import { PostEngagement } from "@/components/home/midias-sociais/PostEngagement";
import { ComparisonType } from "@/components/Comparison/ComparisonCharts";
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

  const [selectedComparison, setSelectedComparison] =
    useState("MÍDIAS SOCIAIS");
  const [selectedPage, setSelectedPage] = useState("facebook");
  const [facebookDataMain, setFacebookDataMain] = useState();
  const [instagramDataMain, setInstagramDataMain] = useState();
  const [tiktokDataMain, setTiktokDataMain] = useState();
  const [youtubeDataMain, setYoutubeDataMain] = useState();
  const [loadingMain, setLoadingMain] = useState(false);
  const [mentionsDataMain, setMentionsDataMain] = useState<any>();
  const [facebookDataSecondary, setFacebookDataSecondary] = useState();
  const [instagramDataSecondary, setInstagramDataSecondary] = useState();
  const [tiktokDataSecondary, setTiktokDataSecondary] = useState();
  const [youtubeDataSecondary, setYoutubeDataSecondary] = useState();
  const [loadingSecondary, setLoadingSecondary] = useState(false);
  const [mentionsDataSecondary, setMentionsDataSecondary] = useState<any>();
  const [selectedProfileMain, setSelectedProfileMain] = useState({
    name: "",
    politicalGroup: "",
    id: "",
  });
  const [selectedProfileSecondary, setSelectedProfileSecondary] = useState({
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

  async function getIndividualDetailsMain() {
    setLoadingMain(true);
    setFacebookDataMain(undefined);
    setInstagramDataMain(undefined);
    setTiktokDataMain(undefined);
    setYoutubeDataMain(undefined);
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
    const [facebook, instagram, tiktok, youtube] = await Promise.all([
      authGetAPI(
        `/profile/facebook/${selectedProfileMain.id}?period=${selectedTimeValues.value}`
      ),
      authGetAPI(
        `/profile/instagram/${selectedProfileMain.id}?period=${selectedTimeValues.value}`
      ),
      authGetAPI(
        `/profile/tiktok/${selectedProfileMain.id}?period=${selectedTimeValues.value}`
      ),
      authGetAPI(
        `/profile/youtube/${selectedProfileMain.id}?period=${selectedTimeValues.value}`
      ),
    ]);
    if (facebook.status === 200) {
      setFacebookDataMain(facebook.body);
    }
    if (instagram.status === 200) {
      setInstagramDataMain(instagram.body);
    }
    if (tiktok.status === 200) {
      setTiktokDataMain(tiktok.body);
    }
    if (youtube.status === 200) {
      setYoutubeDataMain(youtube.body);
    }
    return setLoadingMain(false);
  }

  useEffect(() => {
    if (selectedProfileMain.id) {
      if (typeof window !== "undefined") {
        setSelectedTimeValues({
          value: Number(localStorage.getItem("selectedTime")),
          name: String(localStorage.getItem("selectedTimeName")),
        });
      }
      getIndividualDetailsMain();
    }
  }, [
    selectedProfileMain,
    typeof window !== "undefined" ? localStorage.getItem("selectedTime") : null,
  ]);

  async function GetMentionsMain() {
    setLoadingMain(true);
    setMentionsDataMain(undefined);
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
      `/profile/mentions/${selectedProfileMain.id}?period=${selectedTimeValues.value}`
    );
    console.log("connect: ", connect);
    if (connect.status !== 200) {
      return alert(connect.body);
    }
    setMentionsDataMain(connect.body);
    return setLoadingMain(false);
  }

  useEffect(() => {
    if (selectedProfileMain.id) {
      if (typeof window !== "undefined") {
        setSelectedTimeValues({
          value: Number(localStorage.getItem("selectedTime")),
          name: String(localStorage.getItem("selectedTimeName")),
        });
      }
      GetMentionsMain();
    }
  }, [
    selectedProfileMain,
    typeof window !== "undefined" ? localStorage.getItem("selectedTime") : null,
  ]);

  async function getIndividualDetailsSecondary() {
    setLoadingSecondary(true);
    setFacebookDataSecondary(undefined);
    setInstagramDataSecondary(undefined);
    setTiktokDataSecondary(undefined);
    setYoutubeDataSecondary(undefined);
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
    const [facebook, instagram, tiktok, youtube] = await Promise.all([
      authGetAPI(
        `/profile/facebook/${selectedProfileSecondary.id}?period=${selectedTimeValues.value}`
      ),
      authGetAPI(
        `/profile/instagram/${selectedProfileSecondary.id}?period=${selectedTimeValues.value}`
      ),
      authGetAPI(
        `/profile/tiktok/${selectedProfileSecondary.id}?period=${selectedTimeValues.value}`
      ),
      authGetAPI(
        `/profile/youtube/${selectedProfileSecondary.id}?period=${selectedTimeValues.value}`
      ),
    ]);
    if (facebook.status === 200) {
      setFacebookDataSecondary(facebook.body);
    }
    if (instagram.status === 200) {
      setInstagramDataSecondary(instagram.body);
    }
    if (tiktok.status === 200) {
      setTiktokDataSecondary(tiktok.body);
    }
    if (youtube.status === 200) {
      setYoutubeDataSecondary(youtube.body);
    }
    return setLoadingSecondary(false);
  }

  useEffect(() => {
    if (selectedProfileSecondary.id) {
      if (typeof window !== "undefined") {
        setSelectedTimeValues({
          value: Number(localStorage.getItem("selectedTime")),
          name: String(localStorage.getItem("selectedTimeName")),
        });
      }
      getIndividualDetailsSecondary();
    }
  }, [
    selectedProfileSecondary,
    typeof window !== "undefined" ? localStorage.getItem("selectedTime") : null,
  ]);

  async function GetMentionsSecondary() {
    setLoadingSecondary(true);
    setMentionsDataSecondary(undefined);
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
      `/profile/mentions/${selectedProfileSecondary.id}?period=${selectedTimeValues.value}`
    );
    console.log("connect: ", connect);
    if (connect.status !== 200) {
      return alert(connect.body);
    }
    setMentionsDataSecondary(connect.body);
    return setLoadingSecondary(false);
  }

  useEffect(() => {
    if (selectedProfileSecondary.id) {
      if (typeof window !== "undefined") {
        setSelectedTimeValues({
          value: Number(localStorage.getItem("selectedTime")),
          name: String(localStorage.getItem("selectedTimeName")),
        });
      }
      GetMentionsSecondary();
    }
  }, [
    selectedProfileSecondary,
    typeof window !== "undefined" ? localStorage.getItem("selectedTime") : null,
  ]);

  // async function getComparison() {
  //   const connect = await authGetAPI(
  //     `/profile/comparison/${selectedProfileMain.id}?period=${15}`
  //   );
  // }

  // useEffect(() => {
  //   if (selectedProfileMain.id !== "") {
  //     getComparison();
  //   }
  // }, [selectedProfileMain.id]);

  return (
    <main ref={main}>
      <RootLayout fadeOut={() => fadeOut()}>
        <div
          className="mainContent bg-gray-10 relative m-1 rounded-tl-2xl rounded-bl-2xl pb-12 px-2 pt-2 w-full left-full lg:w-[calc(100%-18rem)] lg:left-[calc(100%-18rem)]"
          ref={content}
          style={{ opacity: 1 }}
        >
          <ComparisonHeaderComponent
            selectedComparison={selectedComparison}
            setSelectedComparison={setSelectedComparison}
            selectedProfileMain={selectedProfileMain}
            setSelectedProfileMain={setSelectedProfileMain}
            selectedProfileSecondary={selectedProfileSecondary}
            setSelectedProfileSecondary={setSelectedProfileSecondary}
            fadeOut={fadeOut}
            timeValues={timeValues}
            selectedTimeValues={selectedTimeValues}
            setSelectedTimeValues={setSelectedTimeValues}
            setLoading={setLoadingMain}
          />
          {selectedComparison === "MÍDIAS SOCIAIS" ? (
            <>
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
                  selectedComparison={selectedComparison}
                  id={"scoreComparison"}
                  pageType="facebook"
                  pageDataMain={facebookDataMain}
                  pageDataSecondary={facebookDataSecondary}
                  loadingMain={loadingMain}
                  loadingSecondary={loadingSecondary}
                />
              )}
              {selectedPage === "instagram" && (
                <ComparisonType
                  selectedComparison={selectedComparison}
                  id={"scoreComparison"}
                  pageType="instagram"
                  pageDataMain={instagramDataMain}
                  pageDataSecondary={instagramDataSecondary}
                  loadingMain={loadingMain}
                  loadingSecondary={loadingSecondary}
                />
              )}
              {selectedPage === "tiktok" && (
                <ComparisonType
                  selectedComparison={selectedComparison}
                  id={"scoreComparison"}
                  pageType="tiktok"
                  pageDataMain={tiktokDataMain}
                  pageDataSecondary={tiktokDataSecondary}
                  loadingMain={loadingMain}
                  loadingSecondary={loadingSecondary}
                />
              )}
              {selectedPage === "youtube" && (
                <ComparisonType
                  selectedComparison={selectedComparison}
                  id={"scoreComparison"}
                  pageType="youtube"
                  pageDataMain={youtubeDataMain}
                  pageDataSecondary={youtubeDataSecondary}
                  loadingMain={loadingMain}
                  loadingSecondary={loadingSecondary}
                />
              )}
            </>
          ) : (
            <ComparisonType
              selectedComparison={selectedComparison}
              id={"mentionsComparison"}
              pageType=""
              pageDataMain={mentionsDataMain}
              pageDataSecondary={mentionsDataSecondary}
              loadingMain={loadingMain}
              loadingSecondary={loadingSecondary}
            />
          )}
        </div>
      </RootLayout>
    </main>
  );
}
