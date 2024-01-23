import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import RootLayout from "@/components/Layout";
import { Cards, Content, Main } from "./styles";
import { Dropdown } from "react-bootstrap";
import Theme from "@/styles/themes";
import { GlobalButton } from "@/components/Global/Button";
import { DateSelectorDropdown } from "@/components/Global/Dropdown/DateSelector";
import { useRouter } from "next/router";
import { NewPasswordModal } from "@/components/profile/NewPasswordModal";
import { AuthPutAPI, authGetAPI } from "@/lib/axios";
// import { Dropdown } from "@/components/Global/Dropdown";
export default function Help() {
  const main = useRef(null);
  const content = useRef(null);
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [showVideo, setShowVideo] = useState(false);
  const [showNewPasswordModal, setShowNewPasswordModal] = useState(false);
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
  const router = useRouter();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".mainContent", {
        x: "-100%",
        opacity: 1,
        duration: 1,
        delay: 0.2,
      });
    }, main);
    return () => ctx.revert();
  }, []);

  const fadeOut = () => {
    const ctx = gsap.context(() => {
      gsap.to(".mainContent", {
        opacity: 0,
        duration: 1,
      });
    }, main);
    return () => ctx.revert();
  };

  async function GetProfile() {
    const connect = await authGetAPI("/user/profile");
    if (connect.status !== 200) {
      return alert(connect.body);
    }
    setProfileData(connect.body.user);
  }

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

  async function logOut() {
    localStorage.removeItem("axioonToken");
    localStorage.removeItem("axioonRefreshToken");
    localStorage.removeItem("axioonUserType");
    localStorage.removeItem("selectedProfile");
    localStorage.removeItem("selectedTime");
    localStorage.removeItem("selectedTimeName");
    return router.push("/login");
  }

  useEffect(() => {
    GetProfile();
  }, []);

  return (
    <main ref={main}>
      <RootLayout fadeOut={() => fadeOut()}>
        <div
          className="mainContent bg-gray-10 relative m-1 rounded-tl-2xl rounded-bl-2xl pb-12 px-2 pt-2 w-full left-full lg:w-[calc(100%-18rem)] lg:left-[calc(100%-18rem)]"
          ref={content}
          style={{ opacity: 1 }}
        >
          <div className="headerTop flex pb-4 flex-col-reverse md:flex-row items-center w-full">
            <Dropdown className="self-center mb-4 ml-auto items-end">
              <Dropdown.Toggle
                style={{
                  backgroundColor: "#232323",
                  border: 0,
                  fontSize: 15,
                }}
              >
                <strong>
                  {profileData.name ? profileData.name : "Carregando..."}
                </strong>
                <br />
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
          <main className="Main flex flex-col p-4 m-0 rounded-lg md:m-2">
            <header>
              <h1 className="text-2xl font-bold">Como Utilizar a Plataforma</h1>
            </header>
            <div className="flex items-center justify-center self-center h-full flex-wrap gap-2">
              {array.map((item) => (
                <div
                  className="flex flex-col w-full sm:w-1/3 md:w-1/4 items-center text-center rounded-lg border-[1px] border-black shadow-md bg-white m-4 p-2 text-sm"
                  key={item}
                >
                  <strong>Dashboard</strong>
                  psum has been the industry's standard dummy text ever since
                  the 1500s, when an unknown printer took, 500s, when an unknown
                  printer took
                  <button
                    className="bg-darkBlueAxion text-white p-2 rounded text-xs"
                    onClick={() => setShowVideo(true)}
                  >
                    Ver Vídeo
                  </button>
                </div>
              ))}
            </div>
            <div className="flex flex-col w-full mt-8">
              <h1 className="text-lg font-semibold self-center">
                Não Encontrou o quê estava procurando?
              </h1>
              <button className="bg-darkBlueAxion text-white p-2 self-center rounded text-sm">
                Fale Diretamente com nosso Time para que possamos te Ajudar
              </button>
            </div>
          </main>
        </div>
      </RootLayout>
      <NewPasswordModal
        show={showNewPasswordModal}
        onHide={() => setShowNewPasswordModal(false)}
        formData={formData}
        setFormData={setFormData}
        changePassword={changePassword}
        loadingButton={loadingButton}
      />
    </main>
  );
}
