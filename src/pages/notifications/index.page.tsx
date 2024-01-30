import { Content, Main, NotificationsRows } from "./styles";
import { GlobalButton } from "@/components/Global/Button";
import { DateSelectorDropdown } from "@/components/Global/Dropdown/DateSelector";
import RootLayout from "@/components/Layout";
import { authGetAPI, loginVerifyAPI, user_type } from "@/lib/axios";
import Theme from "@/styles/themes";
import gsap from "gsap";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Dropdown, Spinner } from "react-bootstrap";
import { Global } from "recharts";

// import { Dropdown } from "@/components/Global/Dropdown";
export default function Notifications() {
  const main = useRef(null);
  const content = useRef(null);
  const router = useRouter();
  const [notifications, setNotifications] = useState<any>([]);

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
        <div
          className="mainContent bg-gray-10 relative m-1 rounded-tl-2xl rounded-bl-2xl pb-12 px-2 pt-2 w-full left-full lg:w-[calc(100%-18rem)] lg:left-[calc(100%-18rem)]"
          ref={content}
          style={{ opacity: 1 }}
        >
          {notifications && notifications.length !== 0 ? (
            <main className="Main flex flex-col p-4 m-0 rounded-lg md:m-2">
              {notifications.length === 0 && (
                <div className="noNotifications text-2xl font-semibold">
                  Nenhuma notificação ativa
                </div>
              )}
              {notifications.filter(
                (item: any) =>
                  new Date(item.date).toLocaleDateString("pt-BR") ===
                  new Date().toLocaleDateString("pt-BR"),
              ).length !== 0 ? (
                <>
                  <header className="flex w-full mt-4">
                    <div className="flex w-full items-center justify-between">
                      <div className="flex gap-4 items-center">
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
                  <div className="NotificationRows flex w-full items-center justify-between m-12 pb-4 border-b-[1px] border-gray-20 text-darkBlueAxion">
                    <div className="flex items-center gap-4">
                      <img src="/NotificationsIcon4.svg" alt="" />
                      {""} Notificações
                    </div>
                    <div className="flex self-center">Data</div>
                    <div></div>
                  </div>
                  {notifications
                    .filter(
                      (item: any) =>
                        new Date(item.date).toLocaleDateString("pt-BR") ===
                        new Date().toLocaleDateString("pt-BR"),
                    )
                    .map((notification: any, index: any) => (
                      <div className="NotificationRows flex w-full items-center justify-between pb-4 border-b-[1px] border-gray-20 text-darkBlueAxion">
                        <div className="flex flex-col w-2/5 items-start">
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
                              className="w-5 h-5 mr-2"
                            />
                            {notification.type}
                          </div>
                          <div className="ml-2">
                            <strong>{notification.description}</strong>
                          </div>
                        </div>
                        <div className="flex flex-col items-center w-1/5 self-center">
                          {new Date(notification.date).toLocaleDateString(
                            "pt-BR",
                          )}
                        </div>
                        <div className="flex flex-col lg:flex-row w-1/5 gap-2 items-center justify-evenly">
                          {notification.opened === true ? (
                            <GlobalButton
                              background="#fff"
                              color={Theme.color.darkBlueAxion}
                              fontSize={10}
                              width="auto"
                              height="auto"
                              className="rounded p-2 flex flex-row border-b-2 border-darkBlueAxion"
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
                                className="p-2 rounded"
                                style={{ border: "2px solid rgb(13, 18, 60)" }}
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
                      </div>
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
                      new Date().setDate(new Date().getDate() - 7),
                    ).toLocaleDateString("pt-BR"),
              ).length !== 0 ? (
                <>
                  <header className="flex w-full mt-4">
                    <div className="flex w-full items-center justify-between">
                      <div className="flex gap-4 items-center">
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
                  <div className="NotificationRows flex w-full items-center justify-between m-12 pb-4 border-b-[1px] border-gray-20 text-darkBlueAxion">
                    <div className="flex items-center gap-4">
                      <img src="/NotificationsIcon4.svg" alt="" />
                      {""} Notificações
                    </div>
                    <div className="flex self-center">Data</div>
                    <div></div>
                  </div>
                  {notifications
                    .filter(
                      (item: any) =>
                        new Date(item.date).toLocaleDateString("pt-BR") <
                          new Date().toLocaleDateString("pt-BR") &&
                        new Date(item.date).toLocaleDateString("pt-BR") >=
                          new Date(
                            new Date().setDate(new Date().getDate() - 7),
                          ).toLocaleDateString("pt-BR"),
                    )
                    .map((notification: any, index: any) => (
                      <div className="NotificationRows flex w-full items-center justify-between pb-4 border-b-[1px] border-gray-20 text-darkBlueAxion">
                        <div className="flex flex-col w-2/5 items-start">
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
                              className="w-5 h-5 mr-2"
                            />
                            {notification.type}
                          </div>
                          <div className="ml-2">
                            <strong>{notification.description}</strong>
                          </div>
                        </div>
                        <div className="flex flex-col items-center w-1/5 self-center">
                          {new Date(notification.date).toLocaleDateString(
                            "pt-BR",
                          )}
                        </div>
                        <div className="flex flex-col lg:flex-row w-1/5 gap-2 items-center justify-evenly">
                          {notification.opened === true ? (
                            <GlobalButton
                              background="#fff"
                              color={Theme.color.darkBlueAxion}
                              fontSize={10}
                              width="auto"
                              height="auto"
                              className="rounded p-2 flex flex-row border-b-2 border-darkBlueAxion"
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
                                className="p-2 rounded"
                                style={{ border: "2px solid rgb(13, 18, 60)" }}
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
                      </div>
                    ))}
                </>
              ) : (
                <></>
              )}

              {notifications.filter(
                (item: any) =>
                  new Date(item.date).toLocaleDateString("pt-BR") <
                  new Date(
                    new Date().setDate(new Date().getDate() - 7),
                  ).toLocaleDateString("pt-BR"),
              ).length !== 0 ? (
                <>
                  <header className="flex w-full mt-4">
                    <div className="flex w-full items-center justify-between">
                      <div className="flex gap-4 items-center">
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
                  <div className="NotificationRows flex w-full items-center justify-between m-12 pb-4 border-b-[1px] border-gray-20 text-darkBlueAxion">
                    <div className="flex items-center gap-4">
                      <img src="/NotificationsIcon4.svg" alt="" />
                      {""} Notificações
                    </div>
                    <div className="flex self-center">Data</div>
                    <div></div>
                  </div>
                  {notifications
                    .filter(
                      (item: any) =>
                        new Date(item.date).toLocaleDateString("pt-BR") <
                        new Date(
                          new Date().setDate(new Date().getDate() - 7),
                        ).toLocaleDateString("pt-BR"),
                    )
                    .map((notification: any, index: any) => (
                      <div className="NotificationRows flex w-full items-center justify-between pb-4 border-b-[1px] border-gray-20 text-darkBlueAxion">
                        <div className="flex flex-col w-2/5 items-start">
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
                              className="w-5 h-5 mr-2"
                            />
                            {notification.type}
                          </div>
                          <div className="ml-2">
                            <strong>{notification.description}</strong>
                          </div>
                        </div>
                        <div className="flex flex-col items-center w-1/5 self-center">
                          {new Date(notification.date).toLocaleDateString(
                            "pt-BR",
                          )}
                        </div>
                        <div className="flex flex-col lg:flex-row w-1/5 gap-2 items-center justify-evenly">
                          {notification.opened === true ? (
                            <GlobalButton
                              background="#fff"
                              color={Theme.color.darkBlueAxion}
                              fontSize={10}
                              width="auto"
                              height="auto"
                              className="rounded p-2 flex flex-row border-b-2 border-darkBlueAxion"
                              content="Marcar como Não Lida"
                            ></GlobalButton>
                          ) : (
                            <div>
                              <GlobalButton
                                background="#fff"
                                color={Theme.color.darkBlueAxion}
                                fontSize={10}
                                width="auto"
                                height="auto"
                                className="p-2 rounded"
                                style={{ border: "2px solid rgb(13, 18, 60)" }}
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
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                </>
              ) : (
                <></>
              )}
            </main>
          ) : (
            <div className="flex w-full h-full items-center justify-center">
              <Spinner animation="border" />
            </div>
          )}
        </div>
      </RootLayout>
    </main>
  );
}
