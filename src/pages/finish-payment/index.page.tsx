import { Footer } from "@/components/register-account/Footer";
import { AccessButton, Container } from "./styles";
import Theme from "@/styles/themes";
import { useRouter } from "next/router";
import Image from "next/image";

export default function FinishPayment() {
  const router = useRouter();

  return (
    <>
      <Container>
        <div className="logo mb-5 mt-3">
          <Image width={267} height={52} src={'/axionLogo.png'} alt="" />
        </div>
        <strong>Pagamento Aprovado!</strong>
        <span
          style={{
            color: Theme.color.gray_80,
            maxWidth: "480px",
            textAlign: "center",
          }}
          className="mt-3 mb-3"
        >
          Acesse agora mesmo o sistema Axioon e saia na frente tomando decisões
          inteligentes.
        </span>
        <img src="/verify.svg" alt="" />
        <AccessButton onClick={() => router.push("/register-candidate")}>
          Utilizar Inteligência de Dados
        </AccessButton>
      </Container>
      <Footer />
    </>
  );
}
