import { Footer } from "@/components/register-account/Footer";
import { loginVerifyAPI } from "@/lib/axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

export default function FinishRegisterAccount() {
  const router = useRouter();
  const [background, setBackground] = useState(false);
  const [finished, setFinished] = useState(false);
  const handleClick = () => {
    setBackground(!background);
  };

  const handleFinish = () => {
    setFinished(true);
    setBackground(false);
    setTimeout(() => {
      router.push("/plan");
    }, 500);
  };

  async function handleVerify() {
    const connect = await loginVerifyAPI();
    if (connect !== 200) {
      return router.push("/login");
    }
  }

  useEffect(() => {
    handleVerify();
  }, []);

  return (
    <>
      <div>
        <div
          className={`
          bg-gradient-to-br from-[#0D123C] to-[#34374C] ${
            background ? "opacity-100" : "opacity-0"
          } transition ease-linear duration-200  absolute w-full h-full`}
        />
        <div className="Container flex flex-col relative min-h-screen items-center">
          {background ? (
            <div className="flex flex-col items-center w-full gap-4">
              <img
                src={"AxioonLogoWhite.svg"}
                alt=""
                className={`w-1/2 md:w-1/4 xl:w-1/5 mt-20 opacity-${
                  background ? 1 : 0
                } transition ease-linear duration-200 delay-100`}
              />
              <div
                className={`w-11/12 lg:w-7/12 xl:w-7/12 transition ease-in duration-1000 delay-1000 ${
                  background ? "opacity-100" : "opacity-0"
                }
              ${background ? "z-0" : "-z-10"} ${finished ? "hidden" : ""}
              `}
              >
                <ReactPlayer
                  url={"/video.mp4"}
                  playing
                  width={"100%"}
                  height={"100%"}
                  onEnded={handleFinish}
                  muted
                />
              </div>
            </div>
          ) : (
            <div
              className={`flex flex-col items-center w-full gap-4 ${
                background ? "opacity-0" : "opacity-100"
              } transition ease-linear duration-1000 delay-100 ${
                background && !finished ? "invisible" : ""
              }`}
            >
              <img
                src={"AxioonLogo.svg"}
                alt=""
                className={`w-1/2 md:w-1/4 xl:w-1/5 mt-20 opacity-${
                  background && !finished ? 0 : !background && finished ? 1 : 1
                } transition ease-linear duration-200 delay-100`}
              />
              <div
                className={`flex flex-col ${finished ? "invisible" : ""} items-center`}
              >
                <strong className="text-2xl md:text-5xl">
                  Cadastro aprovado!
                </strong>
                <span className="text-lg md:text-2xl my-3 text-gray-80 text-center max-w-80">
                  Acesse agora mesmo o sistema Axion e ganhe tempo tomando
                  decisões inteligentes.
                </span>
                <img
                  src="/verify.svg"
                  alt=""
                  className="w-25 h-25 self-center"
                />
                <button
                  className="bg-darkBlueAxion text-gray-10 py-2 px-20 md:py-4 md:px-40 border-0 rounded mt-8 transition duration-300 hover:bg-darkBlue"
                  onClick={handleClick}
                >
                  Concluir Acesso
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={"text-white"}>
        <Footer type={background ? "dark" : "light"} variant />
      </div>
    </>
  );
}
