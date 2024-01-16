import { useState } from "react";
import { FinishPayment, PixPaymentContainer, QrCodeContainer } from "./styles";
import { useRouter } from "next/router";
import { Spinner } from "react-bootstrap";

interface PixProps {
  handlePix: any;
  pix: {
    encodedImage: string;
    expirationDate: string;
    payload: string;
    payment_id: string;
    value: number;
  };
}
export function PixPayment({ handlePix, pix }: PixProps) {
  const [step, setStep] = useState(0);
  const router = useRouter();

  const handleCreatePix = () => {
    setStep(1);
    handlePix();
  };

  return (
    <PixPaymentContainer>
      <QrCodeContainer className="flex items-center justify-center">
        {step === 1 &&
          (pix.encodedImage ? (
            <img src={`data:image/png;base64, ${pix.encodedImage}`} />
          ) : (
            <Spinner animation="border" />
          ))}
      </QrCodeContainer>
      <FinishPayment>
        <button
          onClick={handleCreatePix}
          className={`${step === 1 && "hidden"}`}
        >
          Gerar Pix
        </button>

        <button
          onClick={() => router.push("/finish-payment")}
          className={`${step === 0 && "hidden"}`}
        >
          Finalizar Pagamento
        </button>
      </FinishPayment>
    </PixPaymentContainer>
  );
}
