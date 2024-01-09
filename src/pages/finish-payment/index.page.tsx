import { Footer } from "@/components/register-account/Footer";
import { AccessButton, Container } from "./styles";
import Theme from "@/styles/themes";
import { useRouter } from "next/router";
import Image from "next/image";

export default function FinishPayment() {
  const router = useRouter();

  return (
    <>
      <Container className="bg-gradient-to-br from-[#0D123C] to-[#34374C]">
        <img
          src={"AxioonLogoWhite.svg"}
          alt=""
          className={`w-1/2 md:w-1/4 transition ease-linear duration-1000 delay-100`}
        />
        <div className="flex flex-col items-center">
          <strong>Pagamento aprovado!</strong>
          <span
            style={{
              color: Theme.color.gray_60,
              maxWidth: "480px",
              textAlign: "center",
            }}
            className="mt-3 mb-3"
          >
            Seu Pagamento foi aprovado, acesse agora mesmo a Axioon e desfrute
            de todos os benefícios.
          </span>
          <img src="/verify.svg" alt="" className="w-25 h-25 self-center" />
          <AccessButton
            className="bg-white text-black font-bold"
            onClick={() => router.push("/plan")}
          >
            Monitorar Agentes Políticos
          </AccessButton>
        </div>
      </Container>
      <Footer type={"dark"} />
    </>
  );
}
