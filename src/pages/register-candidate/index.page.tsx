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
import {
  AuthPostAPI,
  IBGEAPI,
  PostAPI,
  getAPI,
  loginVerifyAPI,
} from "@/lib/axios";
import { GlobalButton } from "@/components/Global/Button";
import Theme from "@/styles/themes";
import { useRouter } from "next/router";
import { Modal } from "react-bootstrap";
import { maskCpfCnpj } from "@/utils/masks";

export default function RegisterCandidate() {
  const router = useRouter();
  const [step, setStep] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [cpfCnpj, setcpfCnpj] = useState("");
  const [logged, setLogged] = useState(false);
  const [exists, setExists] = useState(false);
  const [existsProfile, setExistsProfile] = useState({
    social_name: "",
    full_name: "",
    role: "",
    youtube: "",
    instagram: "",
    tiktok: "",
    facebook: "",
    political_group_id: "",
    id: "",
    cpf: "",
    city_id: "",
  });
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

  async function verifyLogin() {
    const connect = await loginVerifyAPI();
    if (connect !== 200) {
      return;
    }
    return setLogged(true);
  }

  useEffect(() => {
    verifyLogin();
  }, []);

  async function checkProfile() {
    setLoading(true);
    if (
      formData.facebook === "" ||
      formData.instagram === "" ||
      formData.tiktok === "" ||
      formData.youtube === ""
    ) {
      alert("Preencha ao menos uma rede social");
      return setLoading(false);
    }
    const connect = await AuthPostAPI("/profile/exists", {
      social_name: formData.social_name,
      full_name: formData.full_name,
      cpf: cpfCnpj,
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
    if (connect.body.profile === null) {
      handleRegister();
      return setLoading(false);
    }
    setExistsProfile(connect.body.profile);
    setExists(true);
    return setLoading(false);
  }

  async function handleRegister() {
    const connect = await AuthPostAPI("/profile", {
      social_name: formData.social_name,
      full_name: formData.full_name,
      cpf: cpfCnpj,
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
      return alert(connect.body);
    }
    return router.push("/");
  }

  async function profileExists() {
    setLoading2(true);
    const connect = await AuthPostAPI(
      `/profile/monitoring/${existsProfile.id}`,
      {}
    );
    if (connect.status !== 200) {
      alert(connect.body);
      return setLoading2(false);
    }
    router.push("/");
    return setLoading2(false);
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#0D123C] to-[#34374C]">
      <RegisterAccountHeader type="dark" logged={logged} />
      <main className="flex flex-col w-full lg:w-11/12 xl:w-2/3 self-center">
        <div className="Instructions m-auto w-full lg:h-52 2xl:h-60 flex flex-col lg:flex-row py-4 px-2">
          <div className="InstructionSection1 w-full -left-0 lg:-left-24 flex flex-col lg:flex-col-reverse justify-between items-center mt-4">
            <div className="InstructionStep step1 flex items-start gap-2 self-start">
              <img
                className="w-20 h-20 rounded-full"
                src="/register-candidate/1.png"
                alt=""
              />
              <div className="description flex flex-col gap-2 w-40">
                <div className="flex items-center justify-center text-center bg-white rounded-3xl h-8 w-32 text-sm font-semibold">
                  Inserir os Dados
                </div>
                <p className="m-0 text-white text-[10px] 2xl:text-xs">
                  Ao inserir os dados nossa tecnologia será capaz de analisar.
                </p>
              </div>
            </div>
            <div className="InstructionStep step2 flex items-start self-end gap-2">
              <img
                className="w-20 h-20 rounded-full"
                src="/register-candidate/2.png"
                alt=""
              />
              <div className="description flex flex-col gap-2 w-40">
                <div className="flex items-center justify-center text-center bg-white rounded-3xl h-8 w-32 text-sm font-semibold">
                  Inteligência Artificial
                </div>
                <p className="m-0 text-white text-[10px] 2xl:text-xs">
                  Após ser coletado pela Inteligência Artificial da Axioon os
                  dados serão disponíveis.
                </p>
              </div>
            </div>
          </div>
          <div className="InstructionSection2 w-full -left-0 lg:-left-24 flex flex-col lg:flex-col-reverse justify-between items-center mt-4">
            <div className="InstructionStep step3 flex items-start gap-2 self-start">
              <img
                className="w-20 h-20 rounded-full"
                src="/register-candidate/3.png"
                alt=""
              />
              <div className="description flex flex-col gap-2 w-40">
                <div className="flex items-center justify-center text-center bg-white rounded-3xl h-8 w-32 text-sm font-semibold">
                  Analise os dados
                </div>
                <p className="m-0 text-white text-[10px] 2xl:text-xs">
                  Acesse a Plataforma da Axioon para poder analisar os dados
                  coletados.
                </p>
              </div>
            </div>
            <div className="InstructionStep step2 flex items-start self-end gap-2">
              <img
                className="w-20 h-20 rounded-full"
                src="/register-candidate/4.png"
                alt=""
              />
              <div className="description flex flex-col gap-2 w-40">
                <div className="flex items-center justify-center text-center bg-white rounded-3xl h-8 w-32 text-sm font-semibold">
                  Use a Inteligência Artificial
                </div>
                <p className="m-0 text-white text-[10px] 2xl:text-xs">
                  Utilize a Axioon AI e tenha o poder da Inteligência Artificial
                  nas suas mãos.
                </p>
              </div>
            </div>
          </div>
        </div>

        <FormContainer>
          <TitleBottomBar
            title="Hora de Cadastrar o político que quer acompanhar as métricas"
            barColor="#fff"
            textColor="#fff"
            width="35rem"
          />

          <CandidateForm
            checkProfile={checkProfile}
            cpfCnpj={cpfCnpj}
            setCpfCnpj={setcpfCnpj}
            formData={formData}
            setFormData={setFormData}
            loading={loading}
            handleRegister={handleRegister}
          />
        </FormContainer>
      </main>
      <Footer type="dark" />
      <Modal show={exists} onHide={() => setExists(false)} size="lg">
        <Modal.Body>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-darkBlue">
              {existsProfile.full_name !== "" && existsProfile.full_name}
            </span>
            <span className="text-lg text-center w-2/3 font-semibold text-darkBlueAxion">
              Encontramos um perfil com um ou mais dados informados idênticos.
              Gostaria de monitorar esse perfil?
            </span>
            <div className="flex gap-4 flex-wrap items-center justify-center my-4">
              <div className="flex flex-col gap-2">
                <label className="text-darkBlue">CPF</label>
                <input
                  className="bg-gray-20 p-2 rounded text-sm"
                  value={
                    maskCpfCnpj(existsProfile.cpf)
                      ? maskCpfCnpj(existsProfile.cpf)
                      : "***.***.***-**"
                  }
                  readOnly
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-darkBlue">Nome Social</label>
                <input
                  className="bg-gray-20 p-2 rounded text-sm"
                  value={
                    existsProfile.social_name
                      ? existsProfile.social_name
                      : "Nenhum dado encontrado"
                  }
                  readOnly
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-darkBlue">Nome Completo</label>
                <input
                  className="bg-gray-20 p-2 rounded text-sm"
                  value={
                    existsProfile.full_name
                      ? existsProfile.full_name
                      : "Nenhum dado encontrado"
                  }
                  readOnly
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-darkBlue">Cargo</label>
                <input
                  className="bg-gray-20 p-2 rounded text-sm"
                  value={
                    existsProfile.role
                      ? existsProfile.role
                      : "Nenhum dado encontrado"
                  }
                  readOnly
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-darkBlue">facebook</label>
                <input
                  className="bg-gray-20 p-2 rounded text-sm"
                  value={
                    existsProfile.facebook
                      ? existsProfile.facebook
                      : "Perfil não encontrado"
                  }
                  readOnly
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-darkBlue">Instagram</label>
                <input
                  className="bg-gray-20 p-2 rounded text-sm"
                  value={
                    existsProfile.instagram
                      ? existsProfile.instagram
                      : "Perfil não encontrado"
                  }
                  readOnly
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-darkBlue">tiktok</label>
                <input
                  className="bg-gray-20 p-2 rounded text-sm"
                  value={
                    existsProfile.tiktok
                      ? existsProfile.tiktok
                      : "Perfil não encontrado"
                  }
                  readOnly
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-darkBlue">youtube</label>
                <input
                  className="bg-gray-20 p-2 rounded text-sm"
                  value={
                    existsProfile.youtube
                      ? existsProfile.youtube
                      : "Canal não encontrado"
                  }
                  readOnly
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full items-center justify-center">
              <button
                className="bg-white border-[1px] border-darkBlueAxion py-3 px-4 text-darkBlueAxion text-lg font-semibold rounded"
                onClick={profileExists}
              >
                Monitorar esse perfil
              </button>
              <button
                className="bg-white w-max border-[1px] border-darkBlueAxion p-1 text-darkBlueAxion text-xs rounded"
                onClick={() => setExists(false)}
              >
                Cadastrar outro perfil com outros dados
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
