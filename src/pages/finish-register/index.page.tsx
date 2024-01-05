import { Footer } from "@/components/register-account/Footer";
import { AccessButton, Container } from "./styles";
import Theme from "@/styles/themes";
import { useRouter } from "next/router";
import Image from "next/image";
import { useState } from "react";
import ReactPlayer from "react-player";
import FinishPayment from "../finish-payment/index.page";

export default function FinishRegisterAccount() {
  const router = useRouter();
  const [background, setBackground] = useState(false);
  const [finished, setFinished] = useState(false);
  const handleClick = () => {
    setBackground(!background);
  };

  const handleFinish = () => {
    setFinished(true);
    setTimeout(() => {
      router.push("/finish-payment");
    }, 500);
  };

  return (
    <>
      <div>
        <div
          className={`bg-gradient-to-br from-[#0D123C] to-[#34374C] ${
            background ? "opacity-100" : "opacity-0"
          }  transition ease-linear duration-500  absolute w-full h-full`}
        />
        <Container>
          {!background ? (
            <img
              src={"AxioonLogo.svg"}
              alt=""
              className={`w-1/2 md:w-1/4 opacity-${
                background ? 0 : 1
              } transition ease-linear duration-1000 delay-100`}
            />
          ) : (
            <img
              src={"AxioonLogoWhite.svg"}
              alt=""
              className={`w-1/2 md:w-1/4 opacity-${
                background ? 1 : 0
              } transition ease-linear duration-1000 delay-100`}
            />
          )}
          <div
            className={`flex flex-col ${
              background ? "opacity-0" : "opacity-100"
            } transition ease-linear duration-1000 delay-100 ${
              background ? "invisible" : ""
            }`}
          >
            <strong>Cadastro aprovado!</strong>
            <span
              style={{
                color: Theme.color.gray_80,
                maxWidth: "480px",
                textAlign: "center",
              }}
              className="mt-3 mb-3"
            >
              Acesse agora mesmo o sistema Axion e ganhe tempo tomando decisões
              inteligentes.
            </span>
            <img src="/verify.svg" alt="" className="w-25 h-25 self-center" />
            <AccessButton onClick={handleClick}>Concluir Acesso</AccessButton>
          </div>
          <div
            className={`w-5/6 h-4/6  absolute top-36 ${
              background ? "opacity-100" : "opacity-0"
            }
            ${
              background ? "z-0" : "-z-10"
            } transition ease-in duration-200 delay-500 ${
              finished ? "hidden" : ""
            }
          `}
          >
            {background ? (
              <ReactPlayer
                url={"/video.mp4"}
                playing
                width={"100%"}
                height={"100%"}
                onEnded={handleFinish}
              />
            ) : (
              <></>
            )}
          </div>
        </Container>
      </div>
      <div className={"text-white"}>
        <Footer type={background ? "dark" : "light"} />
      </div>
    </>
  );
}
