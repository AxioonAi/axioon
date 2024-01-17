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
import { AuthPostAPI } from "@/lib/axios";
import { useRouter } from "next/router";

export default function Payment() {
  const [selectedMethod, setSelectedMethod] = useState("creditCard");
  const [step, setStep] = useState(3);
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
    const connect = await AuthPostAPI(`/new-credit-card/${query.id}`, {
      ...cardFormData,
      creditCard: {
        ...cardFormData.creditCard,
        expiryMonth: cardFormData.creditCard.expiryDate.split("/")[0],
        expiryYear: cardFormData.creditCard.expiryDate.split("/")[1],
      },
    });
  }

  return (
    <Container>
      <RegisterAccountHeader />
      <Main>
        <PaymentContainer>
          <PaymentSelector>
            <RadioGroup>
              <RadioSelector
                htmlFor="creditCard"
                checked={selectedMethod === "creditCard"}
              >
                <div />
              </RadioSelector>
              <input
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
                  <img
                    src="/payment/cardFlagsMobile.png"
                    className="flagsMobile"
                  />
                )}
              </label>
            </RadioGroup>
            <RadioGroup>
              <RadioSelector htmlFor="pix" checked={selectedMethod === "pix"}>
                <div />
              </RadioSelector>
              <input
                type="radio"
                name="payMethod"
                id="pix"
                value="pix"
                checked={selectedMethod === "pix"}
                onChange={handleRadioChange}
              />
              <label htmlFor="pix">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "45px",
                    height: "31px",
                    borderRadius: 5,
                    border: "2px solid rgba(217, 217, 217, 0.7)",
                    marginLeft: "7px",
                  }}
                >
                  <Image
                    width={25}
                    height={25}
                    src={"/payment/pix.png"}
                    alt=""
                  />
                </div>
              </label>
            </RadioGroup>
          </PaymentSelector>

          {selectedMethod === "creditCard" ? (
            <CreditCardForm
              cardFormData={cardFormData}
              setCardFormData={setCardFormData}
              step={step}
              setStep={setStep}
              handleCard={handleCard}
              value={query.value}
            />
          ) : selectedMethod === "pix" ? (
            <PixPayment handlePix={handlePix} pix={pix} />
          ) : (
            <div style={{ paddingBottom: "14rem" }} />
          )}
        </PaymentContainer>
        <SelectedPlan>
          <TitleBottomBar title="Plano escolhido:" color="#0D123C" />
          <ArtContainer>
            <div className="logoContainer">
              <Image
                width={155}
                height={30}
                src={"/sidebar/axion-white.svg"}
                alt=""
                className="logo"
              />
            </div>
            <div className="art">
              <img src="/payment/art.png" alt="" />
            </div>
          </ArtContainer>
        </SelectedPlan>
      </Main>
      <Footer />
    </Container>
  );
}
