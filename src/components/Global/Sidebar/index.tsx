import { useEffect, useState } from "react";
import { Dashboard } from "../../../../public/sidebar/dashboard";
import { FinancialSVG } from "../../../../public/sidebar/financial";
import { NotificationSVG } from "../../../../public/sidebar/notification";
import { ProfileSVG } from "../../../../public/sidebar/profile";
import { SettingsSVG } from "../../../../public/sidebar/settings";
import { UsersSVG } from "../../../../public/sidebar/users";
import { LinkComponent } from "./Link";
import { AxionLogoContainer, SidebarContainer, SidebarContent } from "./styles";
import { loginVerifyAPI, user_type } from "@/lib/axios";

interface SidebarProps {
  fadeOut: any;
}

export function Sidebar({ fadeOut }: SidebarProps) {
  const [type, setType] = useState("");
  async function handleVerify() {
    const connect = await loginVerifyAPI();
    if (connect === 200) {
      setType(String(localStorage.getItem(user_type)));
    }
  }

  useEffect(() => {
    handleVerify();
  }, []);
  // const isHeightAbove991 = useWindowDimensions();

  return (
    <nav className="hidden position-sticky top-0 bg-black text-white w-72 lg:flex">
      <div className="position-fixed top-0 w-72">
        <div className="flex justify-center align-center">
          <img
            src="/sidebar/axion-white.svg"
            alt=""
            className="w-44 mt-12 mx-auto"
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2vh",
            marginTop: "3rem",
            paddingLeft: "2rem",
            paddingBottom: "5rem",
          }}
        >
          <LinkComponent
            fadeOut={() => fadeOut()}
            name="Dashboard"
            imgSrc={<Dashboard />}
            href="/home/seu-eleitorado"
          />
          <LinkComponent
            fadeOut={() => fadeOut()}
            name="Comparativo"
            imgSrc={<FinancialSVG />}
            href="/comparison"
          />
          {type === "user" && (
            <>
              <LinkComponent
                fadeOut={() => fadeOut()}
                name="Notificações"
                imgSrc={<NotificationSVG />}
                href="/notifications"
              />
              <LinkComponent
                fadeOut={() => fadeOut()}
                name="Meu Perfil"
                imgSrc={<ProfileSVG />}
                href="/profile"
              />
            </>
          )}
          <LinkComponent
            fadeOut={() => fadeOut()}
            name="Ajuda"
            imgSrc={<img src="/sidebar/HelpSVG.svg" alt="" />}
            href="/help"
          />
        </div>
      </div>
    </nav>
  );
}
