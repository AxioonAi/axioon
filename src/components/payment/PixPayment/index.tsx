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
    <div className="Container flex flex-col w-full h-full items-center justify-center md:w-[35rem]">
      <div className="flex items-center justify-center min-h-64">
        {step === 1 &&
          (pix.encodedImage ? (
            <img src={`data:image/png;base64, ${pix.encodedImage}`} />
          ) : (
            <Spinner animation="border" />
          ))}
      </div>
      <button
        onClick={handleCreatePix}
        className="w-80 bg-green-50 h-14 rounded text-darkBlueAxion font-bold hover:bg-green-60 transition duration-300"
      >
        Gerar Pix
      </button>
    </div>
  );
}
