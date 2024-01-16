import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import RootLayout from "@/components/Layout";
import { Content, Main, NotificationsRows } from "./styles";
import { Dropdown, Spinner } from "react-bootstrap";
import Theme from "@/styles/themes";
import { GlobalButton } from "@/components/Global/Button";
import { Global } from "recharts";
import { DateSelectorDropdown } from "@/components/Global/Dropdown/DateSelector";
import { authGetAPI, loginVerifyAPI, user_type } from "@/lib/axios";
import { useRouter } from "next/router";
// import { Dropdown } from "@/components/Global/Dropdown";
export default function Notifications() {
  const main = useRef(null);
  const content = useRef(null);
  const router = useRouter();
  const [notifications, setNotifications] = useState<any>([]);

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

  async function getNotifications() {
    const connect = await authGetAPI("/notification");
    if (connect.status !== 200) {
      return alert(connect.body);
    }
    setNotifications(connect.body.notification);
  }

  const [type, setType] = useState("");

  async function handleVerify() {
    const connect = await loginVerifyAPI();
    const type = localStorage.getItem(user_type);
    if (type !== "user") {
      alert("Somente administradores podem acessar esta página");
      return router.push("/");
    }
    getNotifications();
  }

  useEffect(() => {
    handleVerify();
  }, []);

  return (
    <main ref={main}>
      <RootLayout fadeOut={() => fadeOut()}>
        <Content className="mainContent" ref={content} style={{ opacity: 1 }}>
          <DateSelectorDropdown />
          <Main>
            {notifications.length === 0 && (
              <div className="noNotifications text-2xl font-semibold">
                Nenhuma notificação ativa
              </div>
            )}
            {notifications.filter(
              (item: any) =>
                new Date(item.date).toLocaleDateString("pt-BR") ===
                new Date().toLocaleDateString("pt-BR")
            ).length !== 0 ? (
              <>
                <header
                  style={{
                    display: "flex",
                    width: "100%",
                    marginTop: "5rem",
                  }}
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
                      <h2>Hoje</h2>
                    </div>
                  </div>
                </header>
                <NotificationsRows>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <img src="/NotificationsIcon4.svg" alt="" />
                    {""} Notificações
                  </div>
                  <div style={{ display: "flex", alignSelf: "center" }}>
                    Data
                  </div>
                  <div></div>
                </NotificationsRows>
                {notifications
                  .filter(
                    (item: any) =>
                      new Date(item.date).toLocaleDateString("pt-BR") ===
                      new Date().toLocaleDateString("pt-BR")
                  )
                  .map((notification: any, index: any) => (
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
                        <div className="flex flex-row">
                          <img
                            src={
                              notification.type === "INSTAGRAM"
                                ? "/InstagramLogo.svg"
                                : notification.type === "FACEBOOK"
                                  ? "/FacebookLogo.svg"
                                  : notification.type === "TIKTOK"
                                    ? "/TiktokLogo.svg"
                                    : "/YoutubeLogo.svg"
                            }
                            alt=""
                            style={{
                              width: 25,
                              height: 25,
                              marginRight: 10,
                            }}
                          />
                          {notification.type}
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
                        {new Date(notification.date).toLocaleDateString(
                          "pt-BR"
                        )}
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
                          <GlobalButton
                            background="#fff"
                            color={Theme.color.darkBlueAxion}
                            fontSize={10}
                            width="auto"
                            height="auto"
                            className="rounded p-2 flex flex-row"
                            style={{
                              border: `2px solid ${Theme.color.darkBlueAxion}`,
                            }}
                            content="Marcar como Não Lida"
                          ></GlobalButton>
                        ) : (
                          <>
                            <GlobalButton
                              background="#fff"
                              color={Theme.color.darkBlueAxion}
                              fontSize={10}
                              width="auto"
                              height="auto"
                              className="rounded p-2 flex flex-row"
                              style={{
                                border: `2px solid ${Theme.color.darkBlueAxion}`,
                              }}
                              content="Acessar"
                            />
                            <GlobalButton
                              background={Theme.color.darkBlueAxion}
                              color={Theme.color.gray_10}
                              fontSize={10}
                              width="auto"
                              height="auto"
                              className="rounded p-2 flex flex-row"
                              content="Visto"
                            />
                          </>
                        )}
                      </div>
                    </NotificationsRows>
                  ))}
              </>
            ) : (
              <></>
            )}

            {notifications.filter(
              (item: any) =>
                new Date(item.date).toLocaleDateString("pt-BR") <
                  new Date().toLocaleDateString("pt-BR") &&
                new Date(item.date).toLocaleDateString("pt-BR") >=
                  new Date(
                    new Date().setDate(new Date().getDate() - 7)
                  ).toLocaleDateString("pt-BR")
            ).length !== 0 ? (
              <>
                <header
                  style={{
                    display: "flex",
                    width: "100%",
                    marginTop: "5rem",
                  }}
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
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <img src="/NotificationsIcon4.svg" alt="" />
                    {""} Notificações
                  </div>
                  <div style={{ display: "flex", alignSelf: "center" }}>
                    Data
                  </div>
                  <div></div>
                </NotificationsRows>
                {notifications
                  .filter(
                    (item: any) =>
                      new Date(item.date).toLocaleDateString("pt-BR") <
                        new Date().toLocaleDateString("pt-BR") &&
                      new Date(item.date).toLocaleDateString("pt-BR") >=
                        new Date(
                          new Date().setDate(new Date().getDate() - 7)
                        ).toLocaleDateString("pt-BR")
                  )
                  .map((notification: any, index: any) => (
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
                        <div className="flex flex-row">
                          <img
                            src={
                              notification.type === "INSTAGRAM"
                                ? "/InstagramLogo.svg"
                                : notification.type === "FACEBOOK"
                                  ? "/FacebookLogo.svg"
                                  : notification.type === "TIKTOK"
                                    ? "/TiktokLogo.svg"
                                    : "/YoutubeLogo.svg"
                            }
                            alt=""
                            style={{
                              width: 25,
                              height: 25,
                              marginRight: 10,
                            }}
                          />
                          {notification.type}
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
                        {new Date(notification.date).toLocaleDateString(
                          "pt-BR"
                        )}
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
                          <GlobalButton
                            background="#fff"
                            color={Theme.color.darkBlueAxion}
                            fontSize={10}
                            width="auto"
                            height="auto"
                            className="rounded p-2 flex flex-row"
                            style={{
                              border: `2px solid ${Theme.color.darkBlueAxion}`,
                            }}
                            content="Marcar como Não Lida"
                          ></GlobalButton>
                        ) : (
                          <>
                            <GlobalButton
                              background="#fff"
                              color={Theme.color.darkBlueAxion}
                              fontSize={10}
                              width="auto"
                              height="auto"
                              className="rounded p-2 flex flex-row"
                              style={{
                                border: `2px solid ${Theme.color.darkBlueAxion}`,
                              }}
                              content="Acessar"
                            />
                            <GlobalButton
                              background={Theme.color.darkBlueAxion}
                              color={Theme.color.gray_10}
                              fontSize={10}
                              width="auto"
                              height="auto"
                              className="rounded p-2 flex flex-row"
                              content="Visto"
                            />
                          </>
                        )}
                      </div>
                    </NotificationsRows>
                  ))}
              </>
            ) : (
              <></>
            )}

            {notifications.filter(
              (item: any) =>
                new Date(item.date).toLocaleDateString("pt-BR") <
                new Date(
                  new Date().setDate(new Date().getDate() - 7)
                ).toLocaleDateString("pt-BR")
            ).length !== 0 ? (
              <>
                <header
                  style={{
                    display: "flex",
                    width: "100%",
                    marginTop: "5rem",
                  }}
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
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <img src="/NotificationsIcon4.svg" alt="" />
                    {""} Notificações
                  </div>
                  <div style={{ display: "flex", alignSelf: "center" }}>
                    Data
                  </div>
                  <div></div>
                </NotificationsRows>
                {notifications
                  .filter(
                    (item: any) =>
                      new Date(item.date).toLocaleDateString("pt-BR") <
                      new Date(
                        new Date().setDate(new Date().getDate() - 7)
                      ).toLocaleDateString("pt-BR")
                  )
                  .map((notification: any, index: any) => (
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
                        <div className="flex flex-row">
                          <img
                            src={
                              notification.type === "INSTAGRAM"
                                ? "/InstagramLogo.svg"
                                : notification.type === "FACEBOOK"
                                  ? "/FacebookLogo.svg"
                                  : notification.type === "TIKTOK"
                                    ? "/TiktokLogo.svg"
                                    : "/YoutubeLogo.svg"
                            }
                            alt=""
                            style={{
                              width: 25,
                              height: 25,
                              marginRight: 10,
                            }}
                          />
                          {notification.type}
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
                        {new Date(notification.date).toLocaleDateString(
                          "pt-BR"
                        )}
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
                          <GlobalButton
                            background="#fff"
                            color={Theme.color.darkBlueAxion}
                            fontSize={10}
                            width="auto"
                            height="auto"
                            className="rounded p-2 flex flex-row"
                            style={{
                              border: `2px solid ${Theme.color.darkBlueAxion}`,
                            }}
                            content="Marcar como Não Lida"
                          ></GlobalButton>
                        ) : (
                          <>
                            <GlobalButton
                              background="#fff"
                              color={Theme.color.darkBlueAxion}
                              fontSize={10}
                              width="auto"
                              height="auto"
                              className="rounded p-2 flex flex-row"
                              style={{
                                border: `2px solid ${Theme.color.darkBlueAxion}`,
                              }}
                              content="Acessar"
                            />
                            <GlobalButton
                              background={Theme.color.darkBlueAxion}
                              color={Theme.color.gray_10}
                              fontSize={10}
                              width="auto"
                              height="auto"
                              className="rounded p-2 flex flex-row"
                              content="Visto"
                            />
                          </>
                        )}
                      </div>
                    </NotificationsRows>
                  ))}
              </>
            ) : (
              <></>
            )}
          </Main>
        </Content>
      </RootLayout>
    </main>
  );
}
