import { DateSelectorDropdown } from "@/components/Global/Dropdown/DateSelector";
import RootLayout from "@/components/Layout";
import { LikesAndComentsCard } from "@/components/home/midias-sociais/LikesAndComentsCard";
import { SocialMidiaPage } from "@/components/home/midias-sociais/SocialMidiaPage";
import Theme from "@/styles/themes";
import gsap from "gsap";
import { useLayoutEffect, useRef, useState } from "react";
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
// import { Dropdown } from "@/components/Global/Dropdown";
export default function Comparison() {
  const main = useRef(null);
  const content = useRef(null);
  const [comparison1, setComparison1] = useState("Roberto Dorner");
  const [comparison2, setComparison2] = useState("Emanuel Pinheiro");
  const [comparisonValue, setComparisonValue] = useState("Engajamento");
  const user1Values = [
    {
      type: "instagram",
      percentage: 23,
      value: 1533,
    },
    {
      type: "facebook",
      percentage: 38,
      value: 4901,
    },
    {
      type: "tiktok",
      percentage: 40,
      value: 2804,
    },
    {
      type: "youtube",
      percentage: 12,
      value: 920,
    },
  ];
  const user2Values = [
    {
      type: "instagram",
      percentage: 82,
      value: 8056,
    },
    {
      type: "facebook",
      percentage: 74,
      value: 11590,
    },
    {
      type: "tiktok",
      percentage: 49,
      value: 3569,
    },
    {
      type: "youtube",
      percentage: 93,
      value: 2805,
    },
  ];
  const array: number[] = Array(19).fill(0);

  const handlePercentage = ({
    value1,
    value2,
  }: {
    value1: number;
    value2: number;
  }) => {
    const percentage = (value1 / (value1 + value2)) * 100;
    return percentage;
  };

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

  return (
    <main ref={main}>
      <RootLayout fadeOut={() => fadeOut()}>
        <Content className="mainContent" ref={content} style={{ opacity: 1 }}>
          <DateSelectorDropdown />
          <Main>
            <header>
              <h1>Gráfico de Comparativo</h1>
              <label>
                my text of the printing and typesetting industry. Lorem Ipsum
                has been the industry's standard dummy text ever since the
                1500s, when an...
              </label>
            </header>
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
            <HeadToHeadBar>
              <Dropdown
                style={{
                  alignSelf: "center",
                }}
              >
                <Dropdown.Toggle
                  variant="danger"
                  style={{
                    backgroundColor: Theme.color.darkBlueAxion,
                    color: "white",
                    fontSize: 20,
                  }}
                >
                  {comparison1}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => setComparison1("Últimas 24 horas")}
                  >
                    Something else
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => setComparison1("Últimos 7 dias")}
                  >
                    Another action
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => setComparison1("Últimos 30 dias")}
                  >
                    Action
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <CenterContainer>
                <ImageCircle style={{ marginLeft: "-10%" }}>
                  <Image
                    src={"/dashboard/user.png"}
                    width={100}
                    height={100}
                    alt=""
                  />
                </ImageCircle>
                <ImageCircle style={{ marginRight: "-10%" }}>
                  <Image
                    src={"/dashboard/user.png"}
                    width={100}
                    height={100}
                    alt=""
                  />
                </ImageCircle>
              </CenterContainer>
              <Dropdown
                style={{
                  alignSelf: "center",
                }}
              >
                <Dropdown.Toggle
                  variant="danger"
                  style={{
                    backgroundColor: Theme.color.darkBlueAxion,
                    color: "white",
                    fontSize: 20,
                  }}
                >
                  {comparison2}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => setComparison2("Últimas 24 horas")}
                  >
                    Something else
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => setComparison2("Últimos 7 dias")}
                  >
                    Another action
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => setComparison2("Últimos 30 dias")}
                  >
                    Action
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </HeadToHeadBar>
            <Grid>
              <IndividualContainer>
                {selectedPage === "facebook" && (
                  <SocialMidiaPage id={"comparison1a"} pageType="facebook" />
                )}
                {selectedPage === "instagram" && (
                  <SocialMidiaPage id={"comparison1b"} pageType="instagram" />
                )}
                {selectedPage === "tiktok" && (
                  <SocialMidiaPage id={"comparison1c"} pageType="tiktok" />
                )}
                {selectedPage === "youtube" && (
                  <SocialMidiaPage id={"comparison1d"} pageType="youtube" />
                )}
              </IndividualContainer>

              <IndividualContainer>
                {selectedPage === "facebook" && (
                  <SocialMidiaPage id={"comparison2a"} pageType="facebook" />
                )}
                {selectedPage === "instagram" && (
                  <SocialMidiaPage id={"comparison2b"} pageType="instagram" />
                )}
                {selectedPage === "tiktok" && (
                  <SocialMidiaPage id={"comparison2c"} pageType="tiktok" />
                )}
                {selectedPage === "youtube" && (
                  <SocialMidiaPage id={"comparison2d"} pageType="youtube" />
                )}
              </IndividualContainer>
            </Grid>
          </Main>
        </Content>
      </RootLayout>
    </main>
  );
}
