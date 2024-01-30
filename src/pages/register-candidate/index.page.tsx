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
import { GlobalButton } from "@/components/Global/Button";
import { TitleBottomBar } from "@/components/home/mencoes/TitleBottomBar";
import { Footer } from "@/components/register-account/Footer";
import { RegisterAccountHeader } from "@/components/register-account/Header";
import { CandidateForm } from "@/components/register-candidate/CandidateForm";
import { RegisterCandidateHeader } from "@/components/register-candidate/Header";
import {
  AuthPostAPI,
  IBGEAPI,
  PostAPI,
  getAPI,
  loginVerifyAPI,
} from "@/lib/axios";
import Theme from "@/styles/themes";
import { maskCpfCnpj } from "@/utils/masks";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";

export default function RegisterCandidate() {
  const router = useRouter();
  const [step, setStep] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [cpfCnpj, setcpfCnpj] = useState("");
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
    campaign_number: 0,
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
    campaign_number: 0,
  });

  async function handleVerify() {
    const connect = await loginVerifyAPI();
    if (connect !== 200) {
      return router.push("/login");
    }
  }

  useEffect(() => {
    handleVerify();
  }, []);

  async function checkProfile() {
    setLoading(true);
    if (
      formData.facebook === "" &&
      formData.instagram === "" &&
      formData.tiktok === "" &&
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
      campaign_number: formData.campaign_number,
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
      campaign_number: formData.campaign_number,
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
      {},
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
      <RegisterCandidateHeader type="dark" />
      <main className="flex flex-col w-full lg:w-11/12 xl:w-2/3 self-center">
        <div className="Instructions m-auto w-full lg:h-52 2xl:h-60 flex flex-col lg:flex-row py-4 px-2">
          <div className="InstructionSection1 w-full -left-0 lg:-left-24 flex flex-col lg:flex-col-reverse justify-between items-center mt-4">
            <div className="InstructionStep step1 flex items-start gap-2 self-start">
              <div className="w-20 h-20 flex items-center justify-center text-center text-white font-extrabold text-5xl rounded-full border-[1px] border-white bg-gradient-to-l from-darkBlueAxion via-gray-70 to-darkBlueAxion bg-[length:400%] animate-bgSweep">
                1
              </div>
              <div className="description flex flex-col gap-2 w-40">
                <div className="flex items-center justify-center text-center bg-white rounded-3xl h-8 w-32 text-xs font-semibold">
                  Inserir os Dados
                </div>
                <p className="m-0 text-white text-[10px] 2xl:text-xs">
                  Ao inserir os dados nossa tecnologia será capaz de analisar.
                </p>
              </div>
            </div>
            <div className="InstructionStep step2 flex items-start self-end gap-2">
              <div className="w-20 h-20 flex items-center justify-center text-center text-white font-extrabold text-5xl rounded-full border-[1px] border-white bg-gradient-to-b from-darkBlueAxion from-[1%] via-gray-50 to-darkBlueAxion to-[99%] animate-bgScrollUp">
                2
              </div>
              <div className="description flex flex-col gap-2 w-40">
                <div className="flex items-center justify-center text-center bg-white rounded-3xl h-8 w-32 text-xs font-semibold">
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
              <div className="w-20 h-20 flex items-center justify-center text-center text-white font-extrabold text-5xl rounded-full border-[1px] border-white bg-[radial-gradient(100%_100%,rgba(13,18,60)_0%,rgba(157,165,180)_100%)] animate-bgPulse">
                3
              </div>
              <div className="description flex flex-col gap-2 w-40">
                <div className="flex items-center justify-center text-center bg-white rounded-3xl h-8 w-32 text-xs font-semibold">
                  Analise os dados
                </div>
                <p className="m-0 text-white text-[10px] 2xl:text-xs">
                  Acesse a Plataforma da Axioon para poder analisar os dados
                  coletados.
                </p>
              </div>
            </div>
            <div className="InstructionStep step2 flex items-start self-end gap-2">
              <div className="w-20 h-20 flex relative overflow-hidden items-center justify-center text-center text-white font-extrabold text-5xl rounded-full border-[1px] border-white">
                <div className="w-20 h-20 bg-gradient-to-tr from-darkBlueAxion via-gray-70 to-darkBlueAxion bg-[length:400%] animate-bgRotate absolute" />
                <span className="z-10">4</span>
              </div>
              <div className="description flex flex-col gap-2 w-40">
                <div className="flex items-center justify-center text-center bg-white rounded-3xl h-8 w-32 text-xs font-semibold">
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
              {existsProfile.full_name !== "" && existsProfile.full_name} -{" "}
              {existsProfile.campaign_number !== 0 &&
                existsProfile.campaign_number}
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
                disabled={loading2}
              >
                {loading2 ? (
                  <Spinner animation="border" />
                ) : (
                  "Monitorar esse perfil"
                )}
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
