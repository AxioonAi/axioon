import { Dashboard } from "../../../../public/sidebar/dashboard";
import { FinancialSVG } from "../../../../public/sidebar/financial";
import { NotificationSVG } from "../../../../public/sidebar/notification";
import { ProfileSVG } from "../../../../public/sidebar/profile";
import { LinkComponent } from "./Link";
import { loginVerifyAPI, user_type } from "@/lib/axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Offcanvas } from "react-bootstrap";

interface SidebarProps {
  fadeOut: any;
}

export function HeaderComponent({ fadeOut }: SidebarProps) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  return (
    <>
      <header className="flex w-full items-center justify-center relative h-16 lg:hidden">
        <button className="absolute left-4 top-1/4 bg-transparent border-0">
          <Image
            onClick={handleShow}
            style={{ cursor: "pointer" }}
            width={40}
            height={40}
            src={"/menuIcon.svg"}
            alt=""
          />
        </button>

        <Image
          width={250}
          height={46}
          src={"/sidebar/axion-white.svg"}
          alt={""}
          className="w-52 h-auto self-center"
        />
      </header>

      <Offcanvas
        style={{ backgroundColor: "#111", maxWidth: "15rem" }}
        show={show}
        onHide={handleClose}
      >
        <Offcanvas.Header
          style={{ marginTop: "1rem" }}
          closeButton
          closeVariant="white"
        >
          <div></div>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2vh",
              marginTop: "1em",
              // paddingLeft: "2rem",
              paddingBottom: "5rem",
            }}
          >
            <LinkComponent
              fadeOut={() => fadeOut()}
              name="Dashboard"
              imgSrc={<Dashboard />}
              href="/home"
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
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
