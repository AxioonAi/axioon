import RootLayout from "@/components/Layout";
import { HeaderComponent } from "@/components/home/Header";
import { InitialPage } from "@/components/home/midias-sociais/InitialPage";
import { LikesAndComentsCard } from "@/components/home/midias-sociais/LikesAndComentsCard";
import { SocialMidiaPage } from "@/components/home/midias-sociais/SocialMidiaPage";
import { authGetAPI } from "@/lib/axios";
import gsap from "gsap";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Spinner } from "react-bootstrap";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

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
      `/profile/social/home/${selectedProfile.id}?period=${selectedTimeValues.value}`,
    );
    // console.log("connect: ", connect);
    if (connect.status !== 200) {
      return alert(connect.body);
    }
    setSocialMidiaData(connect.body.data);
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
        `/profile/facebook/${selectedProfile.id}?period=${selectedTimeValues.value}`,
      ),
      authGetAPI(
        `/profile/advertising/${selectedProfile.id}?period=${selectedTimeValues.value}`,
      ),
      authGetAPI(
        `/profile/instagram/${selectedProfile.id}?period=${selectedTimeValues.value}`,
      ),
      authGetAPI(
        `/profile/tiktok/${selectedProfile.id}?period=${selectedTimeValues.value}`,
      ),
      authGetAPI(
        `/profile/youtube/${selectedProfile.id}?period=${selectedTimeValues.value}`,
      ),
    ]);
    // console.log("metaads", metaads.body);
    // console.log("facebook", facebook.body);
    // console.log("instagram", instagram.body);
    // console.log("tiktok", tiktok.body);
    // console.log("youtube", youtube.body);
    if (metaads.status !== 200) {
      setLocked(true);
    }
    if (facebook.status === 200) {
      setFacebookData(facebook.body.data);
    }
    if (metaads.status === 200) {
      setMetaadsData(metaads.body);
      setLocked(false);
    }
    if (instagram.status === 200) {
      setInstagramData(instagram.body.data);
    }
    if (tiktok.status === 200) {
      setTiktokData(tiktok.body.data);
    }
    if (youtube.status === 200) {
      setYoutubeData(youtube.body.data);
    }
    return setLoading(false);
  }

  useEffect(() => {
    if (selectedProfile.id) {
      setSocialMidiaData(undefined);
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
          <main className="Main m-0 rounded-lg md:m-2">
            <h1 className="text-2xl py-8 font-extrabold">Redes Sociais</h1>
            {socialMidiaData ? (
              <>
                <div className="LikesAndCommentsContainer flex w-full">
                  <Swiper
                    className=" p-2 w-full"
                    slidesPerView={1.2}
                    breakpoints={{
                      550: {
                        slidesPerView: 2,
                      },
                      768: {
                        slidesPerView: 2.6,
                      },
                      1360: {
                        slidesPerView: 4,
                      },
                    }}
                  >
                    <SwiperSlide>
                      <LikesAndComentsCard
                        type="facebook"
                        coments={
                          socialMidiaData !== undefined
                            ? socialMidiaData.staticData.facebook === null
                              ? null
                              : socialMidiaData.staticData.facebook.followers
                            : 0
                        }
                        likes={
                          socialMidiaData !== undefined
                            ? socialMidiaData.staticData.facebook === null
                              ? null
                              : socialMidiaData.staticData.facebook.like
                            : 0
                        }
                        name="Facebook"
                        onClick={
                          socialMidiaData.staticData.facebook === null
                            ? () => {}
                            : () => setSelectedPage("facebook")
                        }
                        isSelected={
                          selectedPage === "facebook" ||
                          selectedPage === "initial"
                        }
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <LikesAndComentsCard
                        type="instagram"
                        coments={
                          socialMidiaData !== undefined
                            ? socialMidiaData.staticData.instagram === null
                              ? null
                              : socialMidiaData.staticData.instagram.followers
                            : 0
                        }
                        likes={
                          socialMidiaData !== undefined
                            ? socialMidiaData.staticData.instagram === null
                              ? null
                              : socialMidiaData.staticData.instagram.posts
                            : 0
                        }
                        name="Instagram"
                        onClick={
                          socialMidiaData.staticData.instagram === null
                            ? () => {}
                            : () => setSelectedPage("instagram")
                        }
                        isSelected={
                          selectedPage === "instagram" ||
                          selectedPage === "initial"
                        }
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <LikesAndComentsCard
                        type="tiktok"
                        coments={
                          socialMidiaData !== undefined
                            ? socialMidiaData.staticData.tiktok === null
                              ? null
                              : socialMidiaData.staticData.tiktok.followers
                            : 0
                        }
                        likes={
                          socialMidiaData !== undefined
                            ? socialMidiaData.staticData.tiktok === null
                              ? null
                              : socialMidiaData.staticData.tiktok.likes
                            : 0
                        }
                        name="TikTok"
                        onClick={
                          socialMidiaData.staticData.tiktok === null
                            ? () => {}
                            : () => setSelectedPage("tiktok")
                        }
                        isSelected={
                          selectedPage === "tiktok" ||
                          selectedPage === "initial"
                        }
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <LikesAndComentsCard
                        type="youtube"
                        coments={
                          socialMidiaData !== undefined
                            ? socialMidiaData.staticData.youtube === null
                              ? null
                              : socialMidiaData.staticData.youtube.views
                            : 0
                        }
                        likes={
                          socialMidiaData !== undefined
                            ? socialMidiaData.staticData.youtube === null
                              ? null
                              : socialMidiaData.staticData.youtube.subs
                            : 0
                        }
                        name="Youtube"
                        onClick={
                          socialMidiaData.staticData.youtube === null
                            ? () => {}
                            : () => setSelectedPage("youtube")
                        }
                        isSelected={
                          selectedPage === "youtube" ||
                          selectedPage === "initial"
                        }
                      />
                    </SwiperSlide>
                  </Swiper>
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
              </>
            ) : (
              <>
                <div className="LikesAndCommentsContainer flex w-full">
                  <Swiper
                    className=" p-2 w-full"
                    slidesPerView={1.2}
                    breakpoints={{
                      550: {
                        slidesPerView: 2,
                      },
                      768: {
                        slidesPerView: 2.6,
                      },
                      1360: {
                        slidesPerView: 4,
                      },
                    }}
                  >
                    <SwiperSlide>
                      <LikesAndComentsCard
                        type="facebook"
                        name="Facebook"
                        coments={0}
                        likes={0}
                        onClick={() => setSelectedPage("facebook")}
                        isSelected={
                          selectedPage === "facebook" ||
                          selectedPage === "initial"
                        }
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <LikesAndComentsCard
                        type="instagram"
                        name="Instagram"
                        coments={0}
                        likes={0}
                        onClick={() => setSelectedPage("instagram")}
                        isSelected={
                          selectedPage === "instagram" ||
                          selectedPage === "initial"
                        }
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <LikesAndComentsCard
                        type="tiktok"
                        name="TikTok"
                        coments={0}
                        likes={0}
                        onClick={() => setSelectedPage("tiktok")}
                        isSelected={
                          selectedPage === "tiktok" ||
                          selectedPage === "initial"
                        }
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <LikesAndComentsCard
                        type="youtube"
                        name="Youtube"
                        coments={0}
                        likes={0}
                        onClick={() => setSelectedPage("youtube")}
                        isSelected={
                          selectedPage === "youtube" ||
                          selectedPage === "initial"
                        }
                      />
                    </SwiperSlide>
                  </Swiper>
                </div>
                <div className="ChartsContainer grid grid-cols-[100%] md:grid-cols-[20rem_20rem] xl:grid-cols-[30rem_30rem] 2xl:grid-cols-[35rem_35rem] justify-center items-center gap-12 mt-5">
                  <div className="flex flex-col justify-center items-center bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] h-auto min-h-[30vh] md:min-h-[55vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                    <Spinner animation="border" />
                  </div>
                  <div className="flex flex-col justify-center items-center bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] h-auto min-h-[30vh] md:min-h-[55vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                    <Spinner animation="border" />
                  </div>
                  <div className="flex flex-col justify-center items-center bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] h-auto min-h-[30vh] md:min-h-[55vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                    <Spinner animation="border" />
                  </div>
                </div>
              </>
            )}
          </main>
        </div>
      </RootLayout>
    </main>
  );
}
