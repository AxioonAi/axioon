import { RegisterAccountHeader } from "@/components/register-account/Header";
import {
  ArtContainer,
  Container,
  Main,
  PaymentContainer,
  PaymentSelector,
  RadioGroup,
  RadioSelector,
  SelectedPlan,
} from "./styles";
import { Footer } from "@/components/register-account/Footer";
import { useEffect, useState } from "react";
import Image from "next/image";
import { CreditCardForm } from "@/components/payment/CreditCardForm";
import { TitleBottomBar } from "@/components/home/mencoes/TitleBottomBar";
import { windowWidth } from "@/utils/windowWidth";
import { PixPayment } from "@/components/payment/PixPayment";
import { AuthPostAPI, loginVerifyAPI } from "@/lib/axios";
import { useRouter } from "next/router";

export default function Payment() {
  const [selectedMethod, setSelectedMethod] = useState("creditCard");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [pix, setPix] = useState({
    encodedImage: "",
    expirationDate: "",
    payload: "",
    payment_id: "",
    value: 0,
  });
  const [cardFormData, setCardFormData] = useState({
    creditCard: {
      holderName: "",
      number: "",
      expiryDate: "",
      ccv: "",
    },
    creditCardHolderInfo: {
      name: "",
      email: "",
      cpfCnpj: "",
      postalCode: "",
      addressNumber: "",
      phone: "",
    },
    installmentCount: 1,
    saveCreditCard: false,
  });
  const router = useRouter();
  const query: any = router.query;

  const handleRadioChange = (event: { target: { value: string } }) => {
    setSelectedMethod(event.target.value);
  };

  async function handlePix() {
    const connect = await AuthPostAPI(`/pix/${query.id}`, {});
    if (connect.status !== 200) {
      return alert(connect.body);
    }
    setPix(connect.body.payment.payment);
  }

  async function handleCard() {
    setLoading(true);
    const connect = await AuthPostAPI(`/new-credit-card/${query.id}`, {
      ...cardFormData,
      creditCard: {
        ...cardFormData.creditCard,
        expiryMonth: cardFormData.creditCard.expiryDate.split("/")[0],
        expiryYear: cardFormData.creditCard.expiryDate.split("/")[1],
      },
    });
    if (connect.status !== 200) {
      alert(connect.body);
      return setLoading(false);
    }
    router.push("/finish-payment");
    return setLoading(false);
  }

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
    <div className="Container relative min-h-screen pb-16 md:pb-32">
      <RegisterAccountHeader />
      <main className="flex flex-col lg:flex-row justify-between max-w-[1440px] m-auto">
        {/* <div className="bg-darkBlueAxion flex lg:hidden w-full h-40">
          <img src="/payment/art.png" alt="" className="object-contain" />
        </div> */}
        <div className="paymentContainer min-h-[32rem] px-4 w-full md:px-16 m-auto lg:m-0">
          <div className="paymentSelector flex flex-col gap-8 pt-8">
            <div className="radioGroup flex gap-2 items-center">
              <label
                className="radioSelector flex items-center justify-center w-6 h-6 border border-gray-60 rounded-full"
                htmlFor="creditCard"
              >
                <div
                  className={`transition duration-300 w-5 h-5 rounded-full ${selectedMethod === "creditCard" ? "bg-gray-60" : "bg-transparent"}`}
                />
              </label>
              <input
                className="hidden"
                type="radio"
                name="payMethod"
                id="creditCard"
                value="creditCard"
                checked={selectedMethod === "creditCard"}
                onChange={handleRadioChange}
              />
              <label htmlFor="creditCard">
                {!windowWidth(768) ? (
                  <img src="/payment/cardFlags.png" />
                ) : (
                  <img src="/payment/cardFlagsMobile.png" className="w-52" />
                )}
              </label>
            </div>
            <div className="radioGroup flex gap-2 items-center">
              <label
                className="radioSelector flex items-center justify-center w-6 h-6 border border-gray-60 rounded-full"
                htmlFor="pix"
              >
                <div
                  className={`transition duration-300 w-5 h-5 rounded-full ${selectedMethod === "pix" ? "bg-gray-60" : "bg-transparent"}`}
                />
              </label>
              <input
                className="hidden"
                type="radio"
                name="payMethod"
                id="pix"
                value="pix"
                checked={selectedMethod === "pix"}
                onChange={handleRadioChange}
              />
              <label htmlFor="pix">
                <Image width={25} height={25} src={"/payment/pix.png"} alt="" />
              </label>
            </div>
          </div>

          {selectedMethod === "creditCard" ? (
            <CreditCardForm
              cardFormData={cardFormData}
              setCardFormData={setCardFormData}
              step={step}
              setStep={setStep}
              handleCard={handleCard}
              value={query.value}
              loading={loading}
              setLoading={setLoading}
            />
          ) : selectedMethod === "pix" ? (
            <PixPayment handlePix={handlePix} pix={pix} />
          ) : (
            <div style={{ paddingBottom: "14rem" }} />
          )}
        </div>
        {/* <div className="bg-darkBlueAxion flex">
          <img
            src="/payment/art.png"
            alt=""
            className="hidden lg:block object-fill"
          />
        </div> */}
      </main>
      <Footer />
    </div>
  );
}
