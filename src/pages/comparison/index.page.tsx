import { DateSelectorDropdown } from "@/components/Global/Dropdown/DateSelector";
import RootLayout from "@/components/Layout";
import { SocialMidiaPage } from "@/components/home/midias-sociais/SocialMidiaPage";
import Theme from "@/styles/themes";
import gsap from "gsap";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Dropdown, Spinner } from "react-bootstrap";
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
import { ComparisonStaticCards } from "@/components/Comparison/ComparisonStaticCards";
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
  const [selectedPage, setSelectedPage] = useState("initial");
  const [generalDataMain, setGeneralDataMain] = useState<any>();
  const [facebookDataMain, setFacebookDataMain] = useState<any>();
  const [instagramDataMain, setInstagramDataMain] = useState();
  const [tiktokDataMain, setTiktokDataMain] = useState();
  const [youtubeDataMain, setYoutubeDataMain] = useState();
  const [loadingMain, setLoadingMain] = useState(false);
  const [mentionsDataMain, setMentionsDataMain] = useState();
  const [generalDataSecondary, setGeneralDataSecondary] = useState<any>();
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

  async function getGeneralDetails() {
    setLoadingMain(true);
    setLoadingSecondary(true);
    setGeneralDataMain(undefined);
    setGeneralDataSecondary(undefined);
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
    const [generalMain, generalSecondary] = await Promise.all([
      authGetAPI(
        `/profile/social/home/${selectedProfileMain.id}?period=${selectedTimeValues.value}`
      ),
      authGetAPI(
        `/profile/social/home/${selectedProfileSecondary.id}?period=${selectedTimeValues.value}`
      ),
    ]);
    if (generalMain.status === 200) {
      setGeneralDataMain(generalMain.body.data);
    }
    if (generalSecondary.status === 200) {
      setGeneralDataSecondary(generalSecondary.body.data);
    }
    setLoadingMain(false);
    setLoadingSecondary(false);
  }

  async function getIndividualDetails() {
    setLoadingMain(true);
    setLoadingSecondary(true);
    setFacebookDataMain(undefined);
    setFacebookDataSecondary(undefined);
    setInstagramDataMain(undefined);
    setInstagramDataSecondary(undefined);
    setTiktokDataMain(undefined);
    setTiktokDataSecondary(undefined);
    setYoutubeDataMain(undefined);
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
    const [
      facebookMain,
      facebookSecondary,
      instagramMain,
      instagramSecondary,
      tiktokMain,
      tiktokSecondary,
      youtubeMain,
      youtubeSecondary,
    ] = await Promise.all([
      authGetAPI(
        `/profile/facebook/${selectedProfileMain.id}?period=${selectedTimeValues.value}`
      ),
      authGetAPI(
        `/profile/facebook/${selectedProfileSecondary.id}?period=${selectedTimeValues.value}`
      ),
      authGetAPI(
        `/profile/instagram/${selectedProfileMain.id}?period=${selectedTimeValues.value}`
      ),
      authGetAPI(
        `/profile/instagram/${selectedProfileSecondary.id}?period=${selectedTimeValues.value}`
      ),
      authGetAPI(
        `/profile/tiktok/${selectedProfileMain.id}?period=${selectedTimeValues.value}`
      ),
      authGetAPI(
        `/profile/tiktok/${selectedProfileSecondary.id}?period=${selectedTimeValues.value}`
      ),
      authGetAPI(
        `/profile/youtube/${selectedProfileMain.id}?period=${selectedTimeValues.value}`
      ),
      authGetAPI(
        `/profile/youtube/${selectedProfileSecondary.id}?period=${selectedTimeValues.value}`
      ),
    ]);
    if (facebookMain.status === 200) {
      setFacebookDataMain(facebookMain.body.data);
    }
    if (facebookSecondary.status === 200) {
      setFacebookDataSecondary(facebookSecondary.body.data);
    }
    if (instagramMain.status === 200) {
      setInstagramDataMain(instagramMain.body.data);
    }
    if (instagramSecondary.status === 200) {
      setInstagramDataSecondary(instagramSecondary.body.data);
    }
    if (tiktokMain.status === 200) {
      setTiktokDataMain(tiktokMain.body.data);
    }
    if (tiktokSecondary.status === 200) {
      setTiktokDataSecondary(tiktokSecondary.body.data);
    }
    if (youtubeMain.status === 200) {
      setYoutubeDataMain(youtubeMain.body.data);
    }
    if (youtubeSecondary.status === 200) {
      setYoutubeDataSecondary(youtubeSecondary.body.data);
    }
    setLoadingMain(false);
    setLoadingSecondary(false);
  }

  async function getMentions() {
    setLoadingMain(true);
    setLoadingSecondary(true);
    setMentionsDataMain(undefined);
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
    const [mentionsMain, mentionsSecondary] = await Promise.all([
      authGetAPI(
        `/profile/mentions/${selectedProfileMain.id}?period=${selectedTimeValues.value}`
      ),
      authGetAPI(
        `/profile/mentions/${selectedProfileSecondary.id}?period=${selectedTimeValues.value}`
      ),
    ]);
    if (mentionsMain.status === 200) {
      setMentionsDataMain(mentionsMain.body);
    }
    if (mentionsSecondary.status === 200) {
      setMentionsDataSecondary(mentionsSecondary.body);
    }
    setLoadingMain(false);
    setLoadingSecondary(false);
  }

  useEffect(() => {
    if (selectedProfileMain.id && selectedProfileSecondary.id) {
      if (typeof window !== "undefined") {
        setSelectedTimeValues({
          value: Number(localStorage.getItem("selectedTime")),
          name: String(localStorage.getItem("selectedTimeName")),
        });
      }
      getGeneralDetails();
      getIndividualDetails();
      getMentions();
    }
  }, [
    selectedProfileMain,
    selectedProfileSecondary,
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
          {generalDataMain && generalDataSecondary ? (
            selectedComparison === "MÍDIAS SOCIAIS" ? (
              <>
                <div className="LikesAndCommentsContainer flex justify-around gap-1 mt-8 flex-wrap">
                  <ComparisonStaticCards
                    type="facebook"
                    comentsMain={
                      generalDataMain !== undefined
                        ? generalDataMain.staticData.facebook === null
                          ? null
                          : generalDataMain?.staticData.facebook.followers
                        : 0
                    }
                    likesMain={
                      generalDataMain !== undefined
                        ? generalDataMain.staticData.facebook === null
                          ? null
                          : generalDataMain?.staticData.facebook.like
                        : 0
                    }
                    comentsSecondary={
                      generalDataSecondary !== undefined
                        ? generalDataSecondary.staticData.facebook === null
                          ? null
                          : generalDataSecondary?.staticData.facebook.followers
                        : 0
                    }
                    likesSecondary={
                      generalDataSecondary !== undefined
                        ? generalDataSecondary.staticData.facebook === null
                          ? null
                          : generalDataSecondary?.staticData.facebook.like
                        : 0
                    }
                    name="Facebook"
                    onClick={() => setSelectedPage("facebook")}
                    isSelected={
                      selectedPage === "facebook" || selectedPage === "initial"
                    }
                  />
                  <ComparisonStaticCards
                    type="instagram"
                    comentsMain={
                      generalDataMain !== undefined
                        ? generalDataMain.staticData.instagram === null
                          ? null
                          : generalDataMain?.staticData.instagram.posts
                        : 0
                    }
                    likesMain={
                      generalDataMain !== undefined
                        ? generalDataMain.staticData.instagram === null
                          ? null
                          : generalDataMain?.staticData.instagram.followers
                        : 0
                    }
                    comentsSecondary={
                      generalDataSecondary !== undefined
                        ? generalDataSecondary.staticData.instagram === null
                          ? null
                          : generalDataSecondary?.staticData.instagram.posts
                        : 0
                    }
                    likesSecondary={
                      generalDataSecondary !== undefined
                        ? generalDataSecondary.staticData.instagram === null
                          ? null
                          : generalDataSecondary?.staticData.instagram.followers
                        : 0
                    }
                    name="Instagram"
                    onClick={() => setSelectedPage("instagram")}
                    isSelected={
                      selectedPage === "instagram" || selectedPage === "initial"
                    }
                  />
                  <ComparisonStaticCards
                    type="tiktok"
                    comentsMain={
                      generalDataMain !== undefined
                        ? generalDataMain.staticData.tiktok === null
                          ? null
                          : generalDataMain?.staticData.tiktok.followers
                        : 0
                    }
                    likesMain={
                      generalDataMain !== undefined
                        ? generalDataMain.staticData.tiktok === null
                          ? null
                          : generalDataMain?.staticData.tiktok.likes
                        : 0
                    }
                    comentsSecondary={
                      generalDataSecondary !== undefined
                        ? generalDataSecondary.staticData.tiktok === null
                          ? null
                          : generalDataSecondary?.staticData.tiktok.followers
                        : 0
                    }
                    likesSecondary={
                      generalDataSecondary !== undefined
                        ? generalDataSecondary.staticData.tiktok === null
                          ? null
                          : generalDataSecondary?.staticData.tiktok.likes
                        : 0
                    }
                    name="TikTok"
                    onClick={() => setSelectedPage("tiktok")}
                    isSelected={
                      selectedPage === "tiktok" || selectedPage === "initial"
                    }
                  />
                  <ComparisonStaticCards
                    type="youtube"
                    comentsMain={
                      generalDataMain !== undefined
                        ? generalDataMain.staticData.youtube === null
                          ? null
                          : generalDataMain?.staticData.youtube.views
                        : 0
                    }
                    likesMain={
                      generalDataMain !== undefined
                        ? generalDataMain.staticData.youtube === null
                          ? null
                          : generalDataMain?.staticData.youtube.subs
                        : 0
                    }
                    comentsSecondary={
                      generalDataSecondary !== undefined
                        ? generalDataSecondary.staticData.youtube === null
                          ? null
                          : generalDataSecondary?.staticData.youtube.views
                        : 0
                    }
                    likesSecondary={
                      generalDataSecondary !== undefined
                        ? generalDataSecondary.staticData.youtube === null
                          ? null
                          : generalDataSecondary?.staticData.youtube.subs
                        : 0
                    }
                    name="Youtube"
                    onClick={() => setSelectedPage("youtube")}
                    isSelected={
                      selectedPage === "youtube" || selectedPage === "initial"
                    }
                  />
                </div>
                {selectedPage === "facebook" && (
                  <ComparisonType
                    nameMain={selectedProfileMain.name}
                    nameSecondary={selectedProfileSecondary.name}
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
                    nameMain={selectedProfileMain.name}
                    nameSecondary={selectedProfileSecondary.name}
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
                    nameMain={selectedProfileMain.name}
                    nameSecondary={selectedProfileSecondary.name}
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
                    nameMain={selectedProfileMain.name}
                    nameSecondary={selectedProfileSecondary.name}
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
                nameMain={selectedProfileMain.name}
                nameSecondary={selectedProfileSecondary.name}
                selectedComparison={selectedComparison}
                id={"mentionsComparison"}
                pageType=""
                pageDataMain={mentionsDataMain}
                pageDataSecondary={mentionsDataSecondary}
                loadingMain={loadingMain}
                loadingSecondary={loadingSecondary}
              />
            )
          ) : (
            <Spinner animation="border" />
          )}
        </div>
      </RootLayout>
    </main>
  );
}
