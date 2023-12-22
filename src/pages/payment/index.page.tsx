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
import { useState } from "react";
import Image from "next/image";
import { CreditCardForm } from "@/components/payment/CreditCardForm";
import { TitleBottomBar } from "@/components/home/mencoes/TitleBottomBar";
import { windowWidth } from "@/utils/windowWidth";
import { PixPayment } from "@/components/payment/PixPayment";

export default function Payment() {
  const [selectedMethod, setSelectedMethod] = useState("");

  const handleRadioChange = (event: { target: { value: string } }) => {
    setSelectedMethod(event.target.value);
  };
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
            <CreditCardForm />
          ) : selectedMethod === "pix" ? (
            <PixPayment />
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
