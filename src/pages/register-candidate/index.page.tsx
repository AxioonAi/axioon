import { Footer } from "@/components/register-account/Footer";
import { RegisterAccountHeader } from "@/components/register-account/Header";
import { useState } from "react";
import {
  Container,
  FormContainer,
  InstructionSection1,
  InstructionSection2,
  InstructionStep,
  Instructions,
  Main,
  StepName,
} from "./styles";
import { TitleBottomBar } from "@/components/home/mencoes/TitleBottomBar";
import { CandidateForm } from "@/components/register-candidate/CandidateForm";

export default function RegisterCandidate() {
  const [selectedMethod, setSelectedMethod] = useState("");

  const handleRadioChange = (event: { target: { value: string } }) => {
    setSelectedMethod(event.target.value);
  };
  return (
    <Container className="bg-gradient-to-br from-[#0D123C] to-[#34374C]">
      <RegisterAccountHeader type="dark" />
      <Main>
        <Instructions>
          <InstructionSection1>
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
                <StepName>Inteligência Artificial</StepName>
                <p>
                  Após ser coletado pela Inteligência Artificial da Axioon os
                  dados serão disponíveis.
                </p>
              </div>
            </InstructionStep>
          </InstructionSection1>
          <InstructionSection2>
            <InstructionStep className="step3">
              <img src="/register-candidate/3.png" alt="" />
              <div className="description">
                <StepName>Analise os dados</StepName>
                <p>
                  Acesse a Plataforma da Axioon para poder analisar os dados
                  coletados.
                </p>
              </div>
            </InstructionStep>
            <InstructionStep className="step4">
              <img src="/register-candidate/4.png" alt="" />
              <div className="description">
                <StepName>Use a Inteligência Artificial</StepName>
                <p>
                  Utilize a Axioon AI e tenha o poder da Inteligência Artificial
                  nas suas mãos.
                </p>
              </div>
            </InstructionStep>
          </InstructionSection2>
        </Instructions>

        <FormContainer>
          <TitleBottomBar
            title="Hora de Cadastrar o político que quer acompanhar as métricas"
            barColor="#fff"
            textColor="#fff"
            width="35rem"
          />

          <CandidateForm />
        </FormContainer>
      </Main>
      <Footer type="dark" />
    </Container>
  );
}
