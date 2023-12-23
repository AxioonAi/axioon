import { useState } from "react";
import { FinishPayment, PixPaymentContainer, QrCodeContainer } from "./styles";
import { useRouter } from "next/router";

export function PixPayment() {
  const [step, setStep] = useState(0);
  const router = useRouter();

  return (
    <PixPaymentContainer>
      <QrCodeContainer>
        {step === 1 && <img src="/payment/qrCode.png" />}
      </QrCodeContainer>
      <FinishPayment>
        <button onClick={() => setStep(1)}>Gerar Pix</button>

        <button onClick={() => router.push("/finish-payment")}>Finalizar Pagamento</button>
      </FinishPayment>
    </PixPaymentContainer>
  );
}
