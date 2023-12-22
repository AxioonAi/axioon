import { useState } from "react";
import { FinishPayment, PixPaymentContainer, QrCodeContainer } from "./styles";

export function PixPayment() {
  const [step, setStep] = useState(0);

  return (
    <PixPaymentContainer>
      <QrCodeContainer>
        {step === 1 && <img src="/payment/qrCode.png" />}
      </QrCodeContainer>
      <FinishPayment>
        <button onClick={() => setStep(1)}>Gerar Pix</button>

        <button>Finalizar Pagamento</button>
      </FinishPayment>
    </PixPaymentContainer>
  );
}
