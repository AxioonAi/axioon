import { Footer } from "@/components/register-account/Footer";
import { AccessButton, Container } from "./styles";
import Theme from "@/styles/themes";
import { useRouter } from "next/router";
import Image from "next/image";

export default function FinishPayment() {
  const router = useRouter();

  return (
    <>
      <div className="Container relative flex flex-col min-h-screen items-center">
        <div className="flex flex-col items-center w-full gap-4">
          <img
            src={"AxioonLogo.svg"}
            alt=""
            className="w-1/2 md:w-1/4 xl:w-1/5 mt-20"
          />
          <div className="flex flex-col items-center">
            <strong className="text-darkBlueAxion text-2xl md:text-5xl">
              Pagamento aprovado!
            </strong>
            <span className="text-lg md:text-2xl my-3 text-gray-80 text-center max-w-80">
              Seu Pagamento foi aprovado, acesse agora mesmo a Axioon e desfrute
              de todos os benefícios.
            </span>
            <img src="/verify.svg" alt="" className="w-25 h-25 self-center" />
            <button
              className="bg-darkBlueAxion text-gray-10 py-2 px-20 md:py-4 md:px-40 border-0 rounded mt-8 transition duration-300 hover:bg-darkBlue"
              onClick={() => router.push("/")}
            >
              Monitorar Agentes Políticos
            </button>
          </div>
        </div>
      </div>
      <div className="text-white">
        <Footer type={"light"} />
      </div>
    </>
  );
}
