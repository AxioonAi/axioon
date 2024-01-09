import { Footer } from "@/components/register-account/Footer";
import { RegisterAccountHeader } from "@/components/register-account/Header";
import { useEffect, useState } from "react";
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
import { AuthPostAPI, IBGEAPI, PostAPI, getAPI } from "@/lib/axios";
import { GlobalButton } from "@/components/Global/Button";
import Theme from "@/styles/themes";
import { useRouter } from "next/router";

export default function RegisterCandidate() {
  const router = useRouter();
  const [step, setStep] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cpfCheck, setCpfCheck] = useState("");
  const [formData, setFormData] = useState({
    social_name: "",
    full_name: "",
    role: {
      value: "",
      label: "",
    },
    youtube: "",
    instagram: "",
    tiktok: "",
    facebook: "",
    state: {
      id: 0,
      value: "",
      label: "",
    },
    city: {
      id: 0,
      value: "",
      label: "",
    },
    political_group_id: {
      acronym: "",
      id: "",
      number: 0,
      label: "",
    },
  });

  async function checkCpf() {
    const connect = await getAPI(`/profile/cpf/${cpfCheck}`);
    if (connect.status !== 200) {
      return setStep(true);
    }
    return router.push("/");
  }

  async function handleRegister() {
    setLoading(true);
    const connect = await AuthPostAPI("/profile", {
      social_name: formData.social_name,
      full_name: formData.full_name,
      cpf: cpfCheck,
      role: formData.role.value,
      youtube: formData.youtube,
      instagram: formData.instagram,
      tiktok: formData.tiktok,
      facebook: formData.facebook,
      city: {
        name: formData.city.label,
        state: formData.state.value,
      },
      political_group_id: formData.political_group_id.id,
    });
    if (connect.status !== 200) {
      alert(connect.body);
      return setLoading(false);
    }
    router.push("/");
    return setLoading(false);
  }

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

        {!step ? (
          <>
            <TitleBottomBar
              title="Insira o CPF do usuário para realizar o cadastro"
              barColor="#fff"
              textColor="#fff"
              width="35rem"
            />
            <input
              type="number"
              placeholder="Insira o CPF"
              className="mt-5 w-1/2 self-center p-3 rounded-lg"
              value={cpfCheck}
              onChange={(e) => setCpfCheck(e.target.value)}
            />
            <GlobalButton
              content="Avançar"
              background={Theme.color.darkBlueAxion}
              color={Theme.color.gray_10}
              width="auto"
              height="auto"
              className="mt-5 p-3 w-1/2 self-center rounded-lg px-5 border-1  border border-white"
              onClick={checkCpf}
            />
          </>
        ) : (
          <FormContainer>
            <TitleBottomBar
              title="Hora de Cadastrar o político que quer acompanhar as métricas"
              barColor="#fff"
              textColor="#fff"
              width="35rem"
            />

            <CandidateForm
              // stateList={stateList}
              // cityList={cityList}
              formData={formData}
              setFormData={setFormData}
              loading={loading}
              handleRegister={handleRegister}
            />
          </FormContainer>
        )}
      </Main>
      <Footer type="dark" />
    </Container>
  );
}
