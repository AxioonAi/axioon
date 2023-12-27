import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import RootLayout from "@/components/Layout";
import { Content, Main, NotificationsRows } from "./styles";
import { Dropdown } from "react-bootstrap";
import Theme from "@/styles/themes";
import { GlobalButton } from "@/components/Global/Button";
import { Global } from "recharts";
import { DateSelectorDropdown } from "@/components/Global/Dropdown/DateSelector";
// import { Dropdown } from "@/components/Global/Dropdown";
export default function Notifications() {
  const main = useRef(null);
  const content = useRef(null);
  const Notifications = [
    {
      platform: "Instagram",
      description: "Roberto Dorner foi marcado em uma publicação",
      date: "05/12/2023 - 19:00",
      action: "Read",
    },
    {
      platform: "Facebook",
      description: "Roberto Dorner foi marcado em uma publicação",
      date: "05/12/2023 - 19:00",
      action: "Unread",
    },
    {
      platform: "Tiktok",
      description: "Roberto Dorner foi marcado em uma publicação",
      date: "05/12/2023 - 19:00",
      action: "Unread",
    },
  ];

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
            <header style={{ display: "flex", width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "1rem",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={"/NotificationsIcon1.svg"}
                    width={50}
                    height={50}
                    alt=""
                  />
                  <h2>Hoje</h2>
                </div>
                <GlobalButton content="Limpar Notificações" />
              </div>
            </header>
            <NotificationsRows>
              <div
                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
              >
                <img src="/NotificationsIcon4.svg" alt="" />
                {""} Notificações
              </div>
              <div style={{ display: "flex", alignSelf: "center" }}>Data</div>
              <div></div>
            </NotificationsRows>
            {Notifications.map((notification, index) => (
              <NotificationsRows
                style={{
                  borderBottom: `1px solid ${Theme.color.gray_100}`,
                  marginTop: "1rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    maxWidth: "40%",
                    alignItems: "flex-start",
                  }}
                >
                  <div>
                    <img
                      src={
                        notification.platform === "Instagram"
                          ? "/InstagramLogo.svg"
                          : notification.platform === "Facebook"
                          ? "/FacebookLogo.svg"
                          : notification.platform === "Tiktok"
                          ? "/TiktokLogo.svg"
                          : "/YoutubeLogo.svg"
                      }
                      alt=""
                      style={{ width: 25, height: 25, marginRight: 10 }}
                    />
                    {notification.platform}
                  </div>
                  <div style={{ marginLeft: 35 }}>
                    <strong>{notification.description}</strong>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    maxWidth: "20%",
                    alignSelf: "center",
                  }}
                >
                  {notification.date}
                </div>
                <div
                  style={{
                    width: "20%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                  }}
                >
                  {notification.action === "Read" ? (
                    <GlobalButton content="Marcar como Não Lida" />
                  ) : (
                    <>
                      <GlobalButton content="Acessar" />
                      <GlobalButton content="Visto" />
                    </>
                  )}
                </div>
              </NotificationsRows>
            ))}
            <header
              style={{ display: "flex", width: "100%", marginTop: "5rem" }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "1rem",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={"/NotificationsIcon1.svg"}
                    width={50}
                    height={50}
                    alt=""
                  />
                  <h2>Últimos 7 Dias</h2>
                </div>
              </div>
            </header>
            <NotificationsRows>
              <div
                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
              >
                <img src="/NotificationsIcon4.svg" alt="" />
                {""} Notificações
              </div>
              <div style={{ display: "flex", alignSelf: "center" }}>Data</div>
              <div></div>
            </NotificationsRows>
            {Notifications.map((notification, index) => (
              <NotificationsRows
                style={{
                  borderBottom: `1px solid ${Theme.color.gray_100}`,
                  marginTop: "1rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    maxWidth: "40%",
                    alignItems: "flex-start",
                  }}
                >
                  <div>
                    <img
                      src={
                        notification.platform === "Instagram"
                          ? "/InstagramLogo.svg"
                          : notification.platform === "Facebook"
                          ? "/FacebookLogo.svg"
                          : notification.platform === "Tiktok"
                          ? "/TiktokLogo.svg"
                          : "/YoutubeLogo.svg"
                      }
                      alt=""
                      style={{ width: 25, height: 25, marginRight: 10 }}
                    />
                    {notification.platform}
                  </div>
                  <div style={{ marginLeft: 35 }}>
                    <strong>{notification.description}</strong>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    maxWidth: "20%",
                    alignSelf: "center",
                  }}
                >
                  {notification.date}
                </div>
                <div
                  style={{
                    width: "20%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                  }}
                >
                  {notification.action === "Read" ? (
                    <GlobalButton content="Marcar como Não Lida" />
                  ) : (
                    <>
                      <GlobalButton content="Acessar" />
                      <GlobalButton content="Visto" />
                    </>
                  )}
                </div>
              </NotificationsRows>
            ))}
            <header
              style={{ display: "flex", width: "100%", marginTop: "5rem" }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "1rem",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={"/NotificationsIcon1.svg"}
                    width={50}
                    height={50}
                    alt=""
                  />
                  <h2>Anterior</h2>
                </div>
              </div>
            </header>
            <NotificationsRows>
              <div
                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
              >
                <img src="/NotificationsIcon4.svg" alt="" />
                {""} Notificações
              </div>
              <div style={{ display: "flex", alignSelf: "center" }}>Data</div>
              <div></div>
            </NotificationsRows>
            {Notifications.map((notification, index) => (
              <NotificationsRows
                style={{
                  borderBottom: `1px solid ${Theme.color.gray_100}`,
                  marginTop: "1rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    maxWidth: "40%",
                    alignItems: "flex-start",
                  }}
                >
                  <div>
                    <img
                      src={
                        notification.platform === "Instagram"
                          ? "/InstagramLogo.svg"
                          : notification.platform === "Facebook"
                          ? "/FacebookLogo.svg"
                          : notification.platform === "Tiktok"
                          ? "/TiktokLogo.svg"
                          : "/YoutubeLogo.svg"
                      }
                      alt=""
                      style={{ width: 25, height: 25, marginRight: 10 }}
                    />
                    {notification.platform}
                  </div>
                  <div style={{ marginLeft: 35 }}>
                    <strong>{notification.description}</strong>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    maxWidth: "20%",
                    alignSelf: "center",
                  }}
                >
                  {notification.date}
                </div>
                <div
                  style={{
                    width: "20%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                  }}
                >
                  {notification.action === "Read" ? (
                    <GlobalButton content="Marcar como Não Lida" />
                  ) : (
                    <>
                      <GlobalButton content="Acessar" />
                      <GlobalButton content="Visto" />
                    </>
                  )}
                </div>
              </NotificationsRows>
            ))}
          </Main>
        </Content>
      </RootLayout>
    </main>
  );
}
