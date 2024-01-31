import { ComparisonType } from "@/components/Comparison/ComparisonCharts";
import { ComparisonStaticCards } from "@/components/Comparison/ComparisonStaticCards";
import { ComparisonHeaderComponent } from "@/components/Comparison/Header";
import RootLayout from "@/components/Layout";
import { authGetAPI } from "@/lib/axios";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { Spinner } from "react-bootstrap";

export default function Comparison() {
  const main = useRef(null);
  const content = useRef(null);

  useEffect(() => {
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
  const [facebookEmpty, setFacebookEmpty] = useState("");
  const [instagramEmpty, setInstagramEmpty] = useState("");
  const [tiktokEmpty, setTiktokEmpty] = useState("");
  const [youtubeEmpty, setYoutubeEmpty] = useState("");
  const [selectedProfileMain, setSelectedProfileMain] = useState({
    name: "",
    politicalGroup: "",
    id: "",
    image: "",
    campaignNumber: 0,
  });
  const [selectedProfileSecondary, setSelectedProfileSecondary] = useState({
    name: "",
    politicalGroup: "",
    id: "",
    image: "",
    campaignNumber: 0,
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
        `/profile/social/home/${selectedProfileMain.id}?period=${selectedTimeValues.value}`,
      ),
      authGetAPI(
        `/profile/social/home/${selectedProfileSecondary.id}?period=${selectedTimeValues.value}`,
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
        `/profile/facebook/${selectedProfileMain.id}?period=${selectedTimeValues.value}`,
      ),
      authGetAPI(
        `/profile/facebook/${selectedProfileSecondary.id}?period=${selectedTimeValues.value}`,
      ),
      authGetAPI(
        `/profile/instagram/${selectedProfileMain.id}?period=${selectedTimeValues.value}`,
      ),
      authGetAPI(
        `/profile/instagram/${selectedProfileSecondary.id}?period=${selectedTimeValues.value}`,
      ),
      authGetAPI(
        `/profile/tiktok/${selectedProfileMain.id}?period=${selectedTimeValues.value}`,
      ),
      authGetAPI(
        `/profile/tiktok/${selectedProfileSecondary.id}?period=${selectedTimeValues.value}`,
      ),
      authGetAPI(
        `/profile/youtube/${selectedProfileMain.id}?period=${selectedTimeValues.value}`,
      ),
      authGetAPI(
        `/profile/youtube/${selectedProfileSecondary.id}?period=${selectedTimeValues.value}`,
      ),
    ]);
    if (facebookMain.status === 401 && facebookSecondary.status === 401) {
      setFacebookEmpty(facebookMain.body);
    }
    if (instagramMain.status === 401 && instagramSecondary.status === 401) {
      setInstagramEmpty(instagramMain.body);
    }
    if (tiktokMain.status === 401 && tiktokSecondary.status === 401) {
      setTiktokEmpty(tiktokMain.body);
    }
    if (youtubeMain.status === 401 && youtubeSecondary.status === 401) {
      setYoutubeEmpty(youtubeMain.body);
    }
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
        `/profile/mentions/${selectedProfileMain.id}?period=${selectedTimeValues.value}`,
      ),
      authGetAPI(
        `/profile/mentions/${selectedProfileSecondary.id}?period=${selectedTimeValues.value}`,
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
                        : null
                    }
                    likesMain={
                      generalDataMain !== undefined
                        ? generalDataMain.staticData.facebook === null
                          ? null
                          : generalDataMain?.staticData.facebook.like
                        : null
                    }
                    comentsSecondary={
                      generalDataSecondary !== undefined
                        ? generalDataSecondary.staticData.facebook === null
                          ? null
                          : generalDataSecondary?.staticData.facebook.followers
                        : null
                    }
                    likesSecondary={
                      generalDataSecondary !== undefined
                        ? generalDataSecondary.staticData.facebook === null
                          ? null
                          : generalDataSecondary?.staticData.facebook.like
                        : null
                    }
                    name="Facebook"
                    onClick={
                      generalDataMain.staticData.facebook === null &&
                      generalDataSecondary.staticData.facebook === null
                        ? () => {}
                        : () => setSelectedPage("facebook")
                    }
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
                        : null
                    }
                    likesMain={
                      generalDataMain !== undefined
                        ? generalDataMain.staticData.instagram === null
                          ? null
                          : generalDataMain?.staticData.instagram.followers
                        : null
                    }
                    comentsSecondary={
                      generalDataSecondary !== undefined
                        ? generalDataSecondary.staticData.instagram === null
                          ? null
                          : generalDataSecondary?.staticData.instagram.posts
                        : null
                    }
                    likesSecondary={
                      generalDataSecondary !== undefined
                        ? generalDataSecondary.staticData.instagram === null
                          ? null
                          : generalDataSecondary?.staticData.instagram.followers
                        : null
                    }
                    name="Instagram"
                    onClick={
                      generalDataMain.staticData.instagram === null &&
                      generalDataSecondary.staticData.instagram === null
                        ? () => {}
                        : () => setSelectedPage("instagram")
                    }
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
                        : null
                    }
                    likesMain={
                      generalDataMain !== undefined
                        ? generalDataMain.staticData.tiktok === null
                          ? null
                          : generalDataMain?.staticData.tiktok.likes
                        : null
                    }
                    comentsSecondary={
                      generalDataSecondary !== undefined
                        ? generalDataSecondary.staticData.tiktok === null
                          ? null
                          : generalDataSecondary?.staticData.tiktok.followers
                        : null
                    }
                    likesSecondary={
                      generalDataSecondary !== undefined
                        ? generalDataSecondary.staticData.tiktok === null
                          ? null
                          : generalDataSecondary?.staticData.tiktok.likes
                        : null
                    }
                    name="TikTok"
                    onClick={
                      generalDataMain.staticData.tiktok === null &&
                      generalDataSecondary.staticData.tiktok === null
                        ? () => {}
                        : () => setSelectedPage("tiktok")
                    }
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
                        : null
                    }
                    likesMain={
                      generalDataMain !== undefined
                        ? generalDataMain.staticData.youtube === null
                          ? null
                          : generalDataMain?.staticData.youtube.subs
                        : null
                    }
                    comentsSecondary={
                      generalDataSecondary !== undefined
                        ? generalDataSecondary.staticData.youtube === null
                          ? null
                          : generalDataSecondary?.staticData.youtube.views
                        : null
                    }
                    likesSecondary={
                      generalDataSecondary !== undefined
                        ? generalDataSecondary.staticData.youtube === null
                          ? null
                          : generalDataSecondary?.staticData.youtube.subs
                        : null
                    }
                    name="Youtube"
                    onClick={
                      generalDataMain.staticData.youtube === null &&
                      generalDataSecondary.staticData.youtube === null
                        ? () => {}
                        : () => setSelectedPage("youtube")
                    }
                    isSelected={
                      selectedPage === "youtube" || selectedPage === "initial"
                    }
                  />
                </div>
                {selectedPage === "facebook" && (
                  <ComparisonType
                    selectedTimeValues={selectedTimeValues}
                    nameMain={selectedProfileMain.name}
                    nameSecondary={selectedProfileSecondary.name}
                    selectedComparison={selectedComparison}
                    id={"scoreComparison"}
                    pageType="facebook"
                    pageDataMain={facebookDataMain}
                    pageDataSecondary={facebookDataSecondary}
                    loadingMain={loadingMain}
                    loadingSecondary={loadingSecondary}
                    pageEmpty={facebookEmpty}
                  />
                )}
                {selectedPage === "instagram" && (
                  <ComparisonType
                    selectedTimeValues={selectedTimeValues}
                    nameMain={selectedProfileMain.name}
                    nameSecondary={selectedProfileSecondary.name}
                    selectedComparison={selectedComparison}
                    id={"scoreComparison"}
                    pageType="instagram"
                    pageDataMain={instagramDataMain}
                    pageDataSecondary={instagramDataSecondary}
                    loadingMain={loadingMain}
                    loadingSecondary={loadingSecondary}
                    pageEmpty={instagramEmpty}
                  />
                )}
                {selectedPage === "tiktok" && (
                  <ComparisonType
                    selectedTimeValues={selectedTimeValues}
                    nameMain={selectedProfileMain.name}
                    nameSecondary={selectedProfileSecondary.name}
                    selectedComparison={selectedComparison}
                    id={"scoreComparison"}
                    pageType="tiktok"
                    pageDataMain={tiktokDataMain}
                    pageDataSecondary={tiktokDataSecondary}
                    loadingMain={loadingMain}
                    loadingSecondary={loadingSecondary}
                    pageEmpty={tiktokEmpty}
                  />
                )}
                {selectedPage === "youtube" && (
                  <ComparisonType
                    selectedTimeValues={selectedTimeValues}
                    nameMain={selectedProfileMain.name}
                    nameSecondary={selectedProfileSecondary.name}
                    selectedComparison={selectedComparison}
                    id={"scoreComparison"}
                    pageType="youtube"
                    pageDataMain={youtubeDataMain}
                    pageDataSecondary={youtubeDataSecondary}
                    loadingMain={loadingMain}
                    loadingSecondary={loadingSecondary}
                    pageEmpty={youtubeEmpty}
                  />
                )}
              </>
            ) : (
              <ComparisonType
                selectedTimeValues={selectedTimeValues}
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
            <div className="LikesAndCommentsContainer flex justify-around gap-1 mt-8 flex-wrap">
              <div className="Container relative flex items-center justify-center w-64 h-28 bg-gray-10 py-2 px-8 shadow-md border-1 opacity-50 rounded-xl border-[#959595]">
                <Spinner animation="border" />
              </div>
              <div className="Container relative flex items-center justify-center w-64 h-28 bg-gray-10 py-2 px-8 shadow-md border-1 opacity-50 rounded-xl border-[#959595]">
                <Spinner animation="border" />
              </div>
              <div className="Container relative flex items-center justify-center w-64 h-28 bg-gray-10 py-2 px-8 shadow-md border-1 opacity-50 rounded-xl border-[#959595]">
                <Spinner animation="border" />
              </div>
              <div className="Container relative flex items-center justify-center w-64 h-28 bg-gray-10 py-2 px-8 shadow-md border-1 opacity-50 rounded-xl border-[#959595]">
                <Spinner animation="border" />
              </div>
            </div>
          )}
        </div>
      </RootLayout>
    </main>
  );
}
