import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import RootLayout from "@/components/Layout";
import { Cards, Content, Main } from "./styles";
import { Dropdown } from "react-bootstrap";
import Theme from "@/styles/themes";
import { GlobalButton } from "@/components/Global/Button";
import { DateSelectorDropdown } from "@/components/Global/Dropdown/DateSelector";
import { NewPasswordModal } from "@/components/help/NewPasswordModal";
// import { Dropdown } from "@/components/Global/Dropdown";
export default function Help() {
  const main = useRef(null);
  const content = useRef(null);
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [showVideo, setShowVideo] = useState(false);

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

  return (
    <main ref={main}>
      <RootLayout fadeOut={() => fadeOut()}>
        <Content className="mainContent" ref={content} style={{ opacity: 1 }}>
          <DateSelectorDropdown />
          <Main>
            <header>
              <h2>Como Utilizar a Plataforma</h2>
            </header>
            <div
              style={{
                display: "flex",
                alignSelf: "center",
                alignItems: "center",
                justifyContent: "center",
                width: "90%",
                height: "100%",
                flexWrap: "wrap",
                paddingBottom: "5%",
                borderBottom: `1px solid ${Theme.color.gray_20}`,
              }}
            >
              {array.map((item) => (
                <Cards key={item}>
                  <h2>Dashboard</h2>
                  psum has been the industry's standard dummy text ever since
                  the 1500s, when an unknown printer took, 500s, when an unknown
                  printer took
                  <GlobalButton
                    content="Ver Vídeo"
                    onClick={() => setShowVideo(true)}
                  />
                </Cards>
              ))}
            </div>
            <div
              style={{
                marginTop: "5%",
                flexDirection: "column",
                display: "flex",
                width: "100%",
              }}
            >
              <h3>Não Encontrou o quê estava procurando?</h3>
              <GlobalButton
                content="Fale Diretamente com nosso Time para que possamos te Ajudar"
                style={{ width: "30%", alignSelf: "center", marginTop: "5%" }}
              />
            </div>
          </Main>
        </Content>
      </RootLayout>
      <NewPasswordModal show={showVideo} onHide={() => setShowVideo(false)} />
    </main>
  );
}
