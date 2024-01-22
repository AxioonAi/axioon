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
  const [selectedProfile, setSelectedProfile] = useState({
    name: "",
    politicalGroup: "",
    id: "",
  });
  const [selectedTimeValues, setSelectedTimeValues] = useState({
    value: 7,
    name: "Últimos 7 Dias",
  });

  console.log("selectedProfile: ", selectedProfile);
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

  async function getComparison() {
    const connect = await authGetAPI(
      `/profile/comparison/${selectedProfile.id}?period=${15}`
    );
    console.log("connect: ", connect);
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
          <div className="Main flex flex-col items-center justify-center bg-white mx-4 rounded-lg p-4 mt-4">
            <div className="engagementChartContainer flex flex-col justify-around bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] h-auto min-h-[30vh] md:min-h-[45vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
              <div className="flex flex-col">
                <TitleWithBar
                  content="Engajamento de Publicações"
                  barColor="#12A9E7"
                />
                <PostEngagement pageData={undefined} />
              </div>
            </div>
          </div>
        </div>
      </RootLayout>
    </main>
  );
}
