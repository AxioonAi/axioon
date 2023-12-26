import { Footer } from "@/components/register-account/Footer";
import { RegisterAccountHeader } from "@/components/register-account/Header";
import { useState } from "react";
import {
  Container,
  InstructionStep,
  Instructions,
  Main,
  StepName,
} from "./styles";

export default function RegisterCandidate() {
  const [selectedMethod, setSelectedMethod] = useState("");

  const handleRadioChange = (event: { target: { value: string } }) => {
    setSelectedMethod(event.target.value);
  };
  return (
    <Container>
      <RegisterAccountHeader type="dark" />
      <Main>
        <Instructions>
          <InstructionStep className="step1">
            <img src="/register-candidate/1.png" alt="" />
            <div className="description">
              <StepName>Inserir Dados</StepName>
              <p>
                Ao inserir os dados nossa tecnologia será capaz de analisar.
              </p>
            </div>
          </InstructionStep>
          <InstructionStep className="step2">
            <img src="/register-candidate/2.png" alt="" />
            <div className="description">
              <StepName>Inserir Dados</StepName>
              <p>
                Ao inserir os dados nossa tecnologia será capaz de analisar.
              </p>
            </div>
          </InstructionStep>
          <InstructionStep className="step3">
            <img src="/register-candidate/3.png" alt="" />
            <div className="description">
              <StepName>Inserir Dados</StepName>
              <p>
                Ao inserir os dados nossa tecnologia será capaz de analisar.
              </p>
            </div>
          </InstructionStep>
          <InstructionStep className="step4">
            <img src="/register-candidate/4.png" alt="" />
            <div className="description">
              <StepName>Inserir Dados</StepName>
              <p>
                Ao inserir os dados nossa tecnologia será capaz de analisar.
              </p>
            </div>
          </InstructionStep>
        </Instructions>
      </Main>
      <Footer type="dark" />
    </Container>
  );
}
