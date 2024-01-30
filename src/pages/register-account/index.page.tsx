import {
  ArtSection,
  BackButton,
  Container,
  FormContainer,
  Main,
  NextButton,
  ProgressBar,
} from "./styles";
import { Messages } from "@/components/Global/Messages";
import { AnialiasingFormData } from "@/components/register-account/AnaliasingData";
import { BasicDataForm } from "@/components/register-account/BasicDataForm";
import { CompanyDataForm } from "@/components/register-account/CompanyDataForm";
import { Footer } from "@/components/register-account/Footer";
import { RegisterAccountHeader } from "@/components/register-account/Header";
import { PersonalDataForm } from "@/components/register-account/PersonalDataForm";
import { PostAPI, refreshToken, token, user_type } from "@/lib/axios";
import { useRouter } from "next/router";
import { useState } from "react";
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
    if (connect.status !== 200) {
      alert(connect.body);
      return setLoading(false);
    }
    if (connect.status === 200) {
      setStep(3);
      localStorage.setItem(token, connect.body.token);
      localStorage.setItem(refreshToken, connect.body.refreshToken);
      localStorage.setItem(user_type, connect.body.type);
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
    <div className="Container min-h-screen relative pb-16">
      {step === 3 ? (
        <AnialiasingFormData />
      ) : (
        <>
          <RegisterAccountHeader where="login" type="light" />
          <div
            className={`progressBar absolute top-[3.7rem] bg-darkBlueAxion h-1 transition duration-500 ease-in-out ${step === 1 ? "w-[10%]" : step === 2 ? "w-1/2" : step === 3 ? "w-[90%]" : "w-full"}`}
          />
          <main className="mb-0 md:mb-24 flex flex-col w-full justify-around items-center lg:flex-row">
            <div className="formContainer w-[calc(100%-3vw)] lg:w-[50vw] px-[8%]">
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
                <button
                  className="w-full p-3 rounded my-[3vh] border-2 bg-darkBlueAxion border-darkBlueAxion text-white font-bold hover:opacity-85 transition duration-300"
                  onClick={handleNext}
                >
                  Proximo
                </button>
              ) : (
                <div className="flex gap-4 mt-4">
                  <button
                    className="w-full p-3 rounded my-[3vh] border-2 bg-transparent border-darkBlueAxion text-darkBlueAxion font-bold hover:opacity-85 transition duration-300"
                    onClick={() => setStep(step - 1)}
                  >
                    Voltar
                  </button>
                  <button
                    className="w-full p-3 rounded my-[3vh] border-2 bg-darkBlueAxion border-darkBlueAxion text-white font-bold hover:opacity-85 transition duration-300"
                    onClick={handleNext}
                    disabled={loading}
                  >
                    {loading ? (
                      <Spinner animation="border" />
                    ) : (
                      "Finalizar Cadastro"
                    )}
                  </button>
                </div>
              )}
            </div>

            <div className="relative self-start bg-[url('/foto.png')] min-h-screen h-full w-full lg:w-[50vw] bg-cover bg-no-repeat bg-top">
              <Messages />
            </div>
          </main>
        </>
      )}
      <Footer />
    </div>
  );
}
