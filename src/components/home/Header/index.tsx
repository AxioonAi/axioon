import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HeaderCandidateSelect } from "./CandidateSelect";
import { MenuItemComponent } from "./MenuItem";
import { HeaderTimeSelect } from "./TimeSelect";
import {
  ButtonAndSelect,
  Candidate,
  CandidateInfo,
  HeaderContainer,
  HeaderMenu,
  HeaderTop,
  Instruction,
  Register,
  UserMenu,
} from "./styles";
import {
  AuthPutAPI,
  authGetAPI,
  getAPI,
  loginVerifyAPI,
  user_type,
} from "@/lib/axios";
import { Dropdown } from "react-bootstrap";
import { NewPasswordModal } from "@/components/profile/NewPasswordModal";

interface headerProps {
  fadeOut: any;
  selectedProfile: {
    name: string;
    politicalGroup: string;
    id: string;
  };
  setSelectedProfile: any;
  selectedPage?: string;
  setSelectedPage?: any;
  timeValues?: any;
  selectedTimeValues?: any;
  setSelectedTimeValues?: (value: any) => void;
  getIndividualDetails?: any;
  loading?: boolean;
  setLoading?: (value: boolean) => void;
}

export function HeaderComponent({
  fadeOut,
  selectedProfile,
  setSelectedProfile,
  selectedPage,
  setSelectedPage,
  timeValues,
  selectedTimeValues,
  setSelectedTimeValues,
  getIndividualDetails,
  loading,
  setLoading,
}: headerProps) {
  const router = useRouter();
  const [showNewPasswordModal, setShowNewPasswordModal] = useState(false);
  const [monitoredProfiles, setMonitoredProfiles] = useState([]);
  const [loadingButton, setLoadingButton] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [profileData, setProfileData] = useState({
    name: "",
    social_name: "",
    email: "",
    mobilePhone: "",
    cpfCnpj: "",
    birth_date: "",
    sex: "",
  });

  async function changePassword() {
    setLoadingButton(true);
    if (
      formData.currentPassword === "" ||
      formData.newPassword === "" ||
      formData.confirmPassword === ""
    ) {
      return alert("Preencha todos os campos");
    }
    if (formData.newPassword !== formData.confirmPassword) {
      return alert("As senhas precisam ser iguais");
    }
    const connect = await AuthPutAPI("/user/password", {
      password: formData.currentPassword,
      newPassword: formData.newPassword,
    });
    if (connect.status !== 200) {
      alert(connect.body);
      return setLoadingButton(false);
    }
    setShowNewPasswordModal(false);
    alert(connect.body);
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    return setLoadingButton(false);
  }

  async function getPoliticians() {
    const connect = await authGetAPI("/profile/monitoring");
    if (connect.status !== 200) {
      return alert(connect.body);
    }
    if (connect.body.profile.length !== 0) {
      setMonitoredProfiles(connect.body.profile);
      if (localStorage.getItem("selectedProfile") === null) {
        setSelectedProfile({
          name: connect.body.profile[0].name,
          politicalGroup: connect.body.profile[0].politicalGroup,
          id: connect.body.profile[0].id,
        });
      } else {
        setSelectedProfile({
          name: connect.body.profile.filter(
            (profile: any) =>
              profile.id === localStorage.getItem("selectedProfile")
          )[0].name,
          politicalGroup: connect.body.profile.filter(
            (profile: any) =>
              profile.id === localStorage.getItem("selectedProfile")
          )[0].politicalGroup,
          id: connect.body.profile.filter(
            (profile: any) =>
              profile.id === localStorage.getItem("selectedProfile")
          )[0].id,
        });
      }
    }
  }

  async function GetProfile() {
    const connect = await authGetAPI("/user/profile");
    if (connect.status !== 200) {
      return alert(connect.body);
    }
    setProfileData(connect.body.user);
  }

  async function getPlan() {
    const connect = await authGetAPI("/user/signature/all");
    if (connect.status !== 200) {
      return router.push("/plan");
    }
  }

  async function handleVerify() {
    const connect = await loginVerifyAPI();
    if (connect !== 200) {
      return router.push("/login");
    }
    await getPlan();
    return await getPoliticians();
  }

  useEffect(() => {
    getPlan();
    handleVerify();
    GetProfile();
  }, []);

  const [subUser, setSubUser] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("axioonUserType") === null) {
      return;
    } else if (localStorage.getItem("axioonUserType") === "subUser") {
      setSubUser(true);
    }
  }, [
    typeof window === "undefined"
      ? null
      : localStorage.getItem("axioonUserType"),
  ]);

  async function logOut() {
    localStorage.removeItem("axioonToken");
    localStorage.removeItem("axioonRefreshToken");
    localStorage.removeItem("axioonUserType");
    localStorage.removeItem("selectedProfile");
    localStorage.removeItem("selectedTime");
    localStorage.removeItem("selectedTimeName");
    return router.push("/login");
  }

  return (
    <>
      <header className="headerContainer relative">
        <div className="headerTop flex pb-4 flex-col-reverse md:flex-row items-center w-full">
          <div className="Instruction flex bg-gray-10 md:ml-auto py-4 px-3 border border-[#c3c3c3] font-bold text-md rounded-[48px] gap-1 self-center">
            <img src="/dashboard/click.svg" alt="" />
            <span>
              Clique nos <em> Cards</em> para ver os dados do seu Candidato
            </span>
          </div>
          <Dropdown className="self-center mb-4 ml-auto items-end">
            <Dropdown.Toggle
              style={{
                backgroundColor: "#232323",
                border: 0,
                fontSize: 15,
              }}
            >
              <strong>{profileData.name}</strong> <br />
              <span>{profileData.email}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="w-full right-4 bg-[#232323]">
              <Dropdown.Item
                className="text-white hover:bg-black"
                onClick={() => setShowNewPasswordModal(true)}
              >
                Alterar Senha
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                className="text-white hover:bg-black"
                onClick={logOut}
              >
                Sair
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <nav className="headerMenu flex flex-wrap justify-around xl:mt-10 gap-2">
          <MenuItemComponent
            fadeOut={() => fadeOut()}
            href="/seu-eleitorado"
            name="SEU ELEITORADO"
          />
          <MenuItemComponent
            fadeOut={() => fadeOut()}
            href="/midias-sociais"
            name="MÍDIAS SOCIAIS"
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
          />
          <MenuItemComponent
            fadeOut={() => fadeOut()}
            href="/legal"
            name="JURÍDICO"
          />
          <MenuItemComponent
            fadeOut={() => fadeOut()}
            href="/mencoes"
            name="MENÇÕES"
          />
          <MenuItemComponent
            fadeOut={() => fadeOut()}
            href="/inteligencia-artificial"
            name="INTELIGENCIA ARTIFICIAL"
          />
        </nav>
        <div className="Candidate flex flex-col h-auto items-center md:flex-row md:h-28 mt-12 justify-between">
          <div className="candidateInfo flex items-center gap-3">
            <Image
              src={"/dashboard/candidate.png"}
              width={200}
              height={200}
              alt=""
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="info flex flex-col">
              <HeaderCandidateSelect
                profiles={monitoredProfiles}
                selectedProfile={selectedProfile}
                setSelectedProfile={setSelectedProfile}
              />
              <span className="candidateNumber text-[#8990ab] text-sm">
                Número do Candidato: xxxxxxxxxx
              </span>
              <span className="status flex items-center gap-1 text-[#22c24f] text-xs">
                <div className="statusCircle w-1.5 h-1.5 bg-[#22c24f] rounded-full" />
                Participando da Eleição
              </span>
            </div>
          </div>

          <div className="buttonAndSelect flex items-center flex-col mt-4 md:mt-0 gap-4 md:items-end">
            {!subUser ? (
              <button
                className="Register w-40 h-9 rounded bg-[#282c49] text-white text-2xl border-0 transition duration-200 ease-in hover:bg-[#474b7a]"
                onClick={() => router.push("/register-candidate")}
              >
                Cadastro
              </button>
            ) : (
              <></>
            )}
            {selectedPage !== "seu-eleitorado" &&
              router.asPath.split("/")[2] !== "inteligencia-artificial" && (
                <HeaderTimeSelect
                  timeValues={timeValues}
                  selectedTimeValues={selectedTimeValues}
                  setSelectedTimeValues={setSelectedTimeValues}
                  getIndividualDetails={getIndividualDetails}
                  loading={loading}
                  setLoading={setLoading}
                />
              )}
          </div>
        </div>
      </header>
      <NewPasswordModal
        show={showNewPasswordModal}
        onHide={() => setShowNewPasswordModal(false)}
        formData={formData}
        setFormData={setFormData}
        changePassword={changePassword}
        loadingButton={loadingButton}
      />
    </>
  );
}
