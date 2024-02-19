import { HeaderCandidateSelect } from "./CandidateSelect";
import { MenuItemComponent } from "./MenuItem";
import { HeaderTimeSelect } from "./TimeSelect";
import { NewPasswordModal } from "@/components/profile/NewPasswordModal";
import { AuthPutAPI, authGetAPI, loginVerifyAPI } from "@/lib/axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

interface headerProps {
  fadeOut: any;
  selectedProfile: {
    name: string;
    politicalGroup: string;
    id: string;
    image: string;
    campaignNumber: number;
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
  const [click, setClick] = useState(false);
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
          image: connect.body.profile[0].image,
          campaignNumber: connect.body.profile[0].campaignNumber,
        });
      } else {
        setSelectedProfile({
          name: connect.body.profile.filter(
            (profile: any) =>
              profile.id === localStorage.getItem("selectedProfile"),
          )[0].name,
          politicalGroup: connect.body.profile.filter(
            (profile: any) =>
              profile.id === localStorage.getItem("selectedProfile"),
          )[0].politicalGroup,
          id: connect.body.profile.filter(
            (profile: any) =>
              profile.id === localStorage.getItem("selectedProfile"),
          )[0].id,
          image: connect.body.profile.filter(
            (profile: any) =>
              profile.id === localStorage.getItem("selectedProfile"),
          )[0].image,
          campaignNumber: connect.body.profile.filter(
            (profile: any) =>
              profile.id === localStorage.getItem("selectedProfile"),
          )[0].campaignNumber,
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

  const handleInstruction = () => {
    setClick(true);
    setTimeout(() => {
      setClick(false);
    }, 300);
  };

  return (
    <>
      <header className="headerContainer relative">
        <div className="headerTop flex pb-4 flex-col-reverse md:flex-row items-center w-full">
          <div
            onClick={handleInstruction}
            className="Instruction flex bg-gray-10 md:ml-auto py-4 px-3 border-[1px] border-[#c3c3c3] font-bold rounded-[48px] gap-1 self-center cursor-pointer transition duration-300 ease-in-out hover:scale-[1.01] hover:border-darkBlueAxion hover:text-[1.1rem]"
          >
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
        {/* <nav className="headerMenu flex flex-wrap justify-around xl:mt-10 gap-2"> */}
        <div className="headerMenu flex w-full py-4">
          <Swiper
            className=" p-2 w-full"
            slidesPerView={1.5}
            breakpoints={{
              550: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1360: {
                slidesPerView: 4.2,
              },
              1920: {
                slidesPerView: 5,
              },
            }}
          >
            <SwiperSlide>
              <MenuItemComponent
                click={click}
                fadeOut={() => fadeOut()}
                href="/seu-eleitorado"
                name="SEU ELEITORADO"
              />
            </SwiperSlide>
            <SwiperSlide>
              <MenuItemComponent
                click={click}
                fadeOut={() => fadeOut()}
                href="/midias-sociais"
                name="MÍDIAS SOCIAIS"
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
              />
            </SwiperSlide>
            <SwiperSlide>
              <MenuItemComponent
                click={click}
                fadeOut={() => fadeOut()}
                href="/legal"
                name="JURÍDICO"
              />
            </SwiperSlide>
            <SwiperSlide>
              <MenuItemComponent
                click={click}
                fadeOut={() => fadeOut()}
                href="/mencoes"
                name="MENÇÕES"
              />
            </SwiperSlide>
            <SwiperSlide>
              <MenuItemComponent
                click={click}
                fadeOut={() => fadeOut()}
                href="/inteligencia-artificial"
                name="INTELIGENCIA ARTIFICIAL"
              />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="Candidate flex flex-col h-auto items-center md:flex-row md:h-28 mt-12 justify-between">
          <div className="candidateInfo flex items-center gap-3">
            {selectedProfile.image ? (
              <Image
                src={selectedProfile.image}
                width={200}
                height={200}
                alt=""
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <Image
                width={50}
                height={50}
                src="/dashboard/midias-sociais/stockProfilePic.svg"
                alt=""
                className="rounded-5 object-cover w-16 h-16 m-0"
              />
            )}
            <div className="info flex flex-col">
              <HeaderCandidateSelect
                profiles={monitoredProfiles}
                selectedProfile={selectedProfile}
                setSelectedProfile={setSelectedProfile}
              />
              <span className="candidateNumber text-[#8990ab] text-sm">
                {selectedProfile.campaignNumber === null ? (
                  <></>
                ) : selectedProfile.campaignNumber === 0 ? (
                  "..."
                ) : (
                  "Número do Candidato: " + selectedProfile.campaignNumber
                )}
              </span>
              {/* <span className="status flex items-center gap-1 text-[#22c24f] text-xs">
                <div className="statusCircle w-1.5 h-1.5 bg-[#22c24f] rounded-full" />
                Participando da Eleição
              </span> */}
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
