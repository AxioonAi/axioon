import { RegisterAccountHeader } from "@/components/register-account/Header";
import {
  Container,
  Main,
  PaymentContainer,
  PaymentSelector,
  RadioGroup,
  RadioSelector,
} from "./styles";
import { Footer } from "@/components/register-account/Footer";
import { useState } from "react";
import Image from "next/image";
import { CreditCardForm } from "@/components/payment/CreditCardForm";

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
                <img src="/payment/cardFlags.png" />
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

          <CreditCardForm />
        </PaymentContainer>
      </Main>
      <Footer />
    </Container>
  );
}
