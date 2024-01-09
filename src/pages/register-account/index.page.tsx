import { Footer } from "@/components/register-account/Footer";
import { RegisterAccountHeader } from "@/components/register-account/Header";
import { BasicDataForm } from "@/components/register-account/BasicDataForm";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  ArtSection,
  BackButton,
  Container,
  FormContainer,
  Main,
  NextButton,
  ProgressBar,
} from "./styles";
import { PersonalDataForm } from "@/components/register-account/PersonalDataForm";
import { CompanyDataForm } from "@/components/register-account/CompanyDataForm";
import { AnialiasingFormData } from "@/components/register-account/AnaliasingData";
import { Messages } from "@/components/Global/Messages";
import { PostAPI } from "@/lib/axios";
import { Spinner } from "react-bootstrap";

export default function RegisterAccount() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    social_name: "",
    password: "",
    cpfCnpj: "",
    birth_date: "",
    sex: "",
    mobilePhone: "",
  });

  async function handleRegister() {
    setLoading(true);
    const birthDate = new Date(formData.birth_date).toISOString();
    const connect = await PostAPI("/register", {
      name: formData.name,
      email: formData.email,
      social_name: formData.social_name,
      password: formData.password,
      cpfCnpj: formData.cpfCnpj,
      birth_date: birthDate,
      sex: formData.sex,
      mobilePhone: formData.mobilePhone,
    });
    console.log("connect: ", connect);
    if (connect.status !== 200) {
      alert(connect.body);
      return setLoading(false);
    }
    if (connect.status === 200) {
      setStep(3);
      setTimeout(() => {
        router.push("/finish-register");
      }, 5000);
      return setLoading(false);
    }
  }

  const handleNext = () => {
    if (
      step === 1 &&
      formData.name !== "" &&
      formData.email !== "" &&
      formData.mobilePhone !== "" &&
      formData.password !== "" &&
      terms === true
    ) {
      return setStep(2);
    }
    if (
      (step === 1 && terms === true && formData.name === "") ||
      formData.email === "" ||
      formData.mobilePhone === "" ||
      formData.password === ""
    ) {
      return alert("Preencha todos os campos");
    }
    if (step === 1 && terms === false) {
      return alert("Aceite os termos de uso");
    }
    if (
      step === 2 &&
      formData.name !== "" &&
      formData.email !== "" &&
      formData.mobilePhone !== "" &&
      formData.password !== "" &&
      formData.social_name !== "" &&
      formData.cpfCnpj !== "" &&
      formData.birth_date !== "" &&
      formData.sex !== ""
    ) {
      return handleRegister();
    }
    if (
      (step === 2 && formData.social_name === "") ||
      formData.cpfCnpj === "" ||
      formData.birth_date === "" ||
      formData.sex === ""
    ) {
      return alert("Preencha todos os campos");
    }
  };

  return (
    <Container>
      {step === 3 ? (
        <AnialiasingFormData />
      ) : (
        <>
          <RegisterAccountHeader />
          <ProgressBar step={step} />
          <Main>
            <FormContainer>
              {step === 1 ? (
                <>
                  <BasicDataForm
                    formData={formData}
                    setFormData={setFormData}
                    terms={terms}
                    setTerms={setTerms}
                  />
                </>
              ) : (
                <PersonalDataForm
                  formData={formData}
                  setFormData={setFormData}
                />
              )}

              {step === 1 ? (
                <NextButton onClick={handleNext}>Proximo</NextButton>
              ) : (
                <div
                  style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}
                >
                  <BackButton onClick={() => setStep(step - 1)}>
                    Voltar
                  </BackButton>
                  <NextButton onClick={handleNext}>
                    {loading ? (
                      <Spinner animation="border" />
                    ) : (
                      "Finalizar Cadastro"
                    )}
                  </NextButton>
                </div>
              )}
            </FormContainer>

            <ArtSection>
              <Messages />
            </ArtSection>
          </Main>
        </>
      )}
      <Footer />
    </Container>
  );
}
