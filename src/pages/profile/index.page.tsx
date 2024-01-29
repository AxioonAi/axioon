import { GlobalButton } from "@/components/Global/Button";
import { HeaderComponent } from "@/components/Global/Header";
import { Sidebar } from "@/components/Global/Sidebar";
import { BlockAccountModal } from "@/components/profile/BlockAccountModal";
import { NewPasswordModal } from "@/components/profile/NewPasswordModal";
import Theme from "@/styles/themes";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { UserEditSVG } from "../../../public/UserEdit";
import { TrashCanSVG } from "../../../public/profile/TrashCan";
import {
  AvatarContainer,
  Content,
  FormGroup,
  FormSection,
  Main,
  PersonalInfo,
  RadioContainer,
  RadioGroup,
  RadioSelector,
} from "./styles";
import gsap from "gsap";
import RootLayout from "@/components/Layout";
import { UsersTable } from "@/components/users/Table";
import { NewUserModal } from "@/components/profile/NewUserModal";
import {
  AuthPostAPI,
  AuthPutAPI,
  authGetAPI,
  loginVerifyAPI,
  user_type,
} from "@/lib/axios";
import { maskCpfCnpj, maskDate, maskPhone } from "@/utils/masks";
import { useRouter } from "next/router";
import Image from "next/image";
import { Dropdown } from "react-bootstrap";

export default function Profile() {
  const router = useRouter();
  const [showNewPasswordModal, setShowNewPasswordModal] = useState(false);
  const [showBlockAccountModal, setShowBlockAccountModal] = useState(false);
  const [showNewUserModal, setShowNewUserModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "...",
    social_name: "...",
    email: "...",
    mobilePhone: "...",
    cpfCnpj: "...",
    birth_date: "...",
    sex: "...",
    signature: [
      {
        plan: {
          name: "...",
          description: "...",
          pixValue: 0,
          amount_of_monitoring: 0,
          amount_of_users: 0,
          duration: 0,
          legal_data: undefined,
          population_data: undefined,
        },
        expires_in: "...",
        status: undefined,
      },
    ],
  });
  const [loading1, setLoading1] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [subUserFormData, setSubUserFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loadingSubUser, setLoadingSubUser] = useState(false);
  const [subUserData, setSubUserData] = useState<any>([
    {
      name: "",
      email: "",
      active: undefined,
      id: "",
    },
  ]);

  const main = useRef(null);
  const content = useRef(null);

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

  async function UpdateProfile() {
    setLoading(true);
    const connect = await AuthPutAPI("/user/profile", {
      name: profileData.name,
      social_name: profileData.social_name,
      email: profileData.email,
      mobilePhone: profileData.mobilePhone,
      cpfCnpj: profileData.cpfCnpj,
      birth_date: new Date(
        Number(profileData.birth_date.split("/")[2]),
        Number(profileData.birth_date.split("/")[1]) - 1,
        Number(profileData.birth_date.split("/")[0])
      ),
      sex: profileData.sex,
    });
    if (connect.status !== 200) {
      alert(connect.body);
      return setLoading(false);
    }
    router.reload();
    return setLoading(false);
  }

  async function changePassword() {
    setLoading1(true);
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
      return setLoading1(false);
    }
    setShowNewPasswordModal(false);
    alert(connect.body);
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    return setLoading1(false);
  }

  async function handleVerify() {
    const connect = await loginVerifyAPI();
    const type = localStorage.getItem(user_type);
    if (type !== "user") {
      alert("Somente administradores podem acessar esta página");
      return router.push("/");
    }
    GetProfile();
  }

  async function registerSubUser() {
    setLoadingSubUser(true);
    const connect = await AuthPostAPI("/sub-user/create", {
      name: subUserFormData.name,
      email: subUserFormData.email,
      password: subUserFormData.password,
    });
    if (connect.status !== 200) {
      alert(connect.body);
      return setLoadingSubUser(false);
    }
    alert("Usuário criado com sucesso");
    setShowNewUserModal(false);
    return setLoadingSubUser(false);
  }

  async function getSubUsers() {
    const connect = await authGetAPI("/sub-user");
    if (connect.status !== 200) {
      return alert(connect.body);
    }
    setSubUserData(connect.body.subUsers);
  }

  useEffect(() => {
    handleVerify();
    getSubUsers();
  }, []);

  async function handleSubUser(id: string, active: boolean) {
    const connect = await AuthPutAPI(`/sub-user/${id}`, {
      active: !active,
    });
    if (connect.status !== 200) {
      return alert(connect.body);
    }
    setSubUserData(undefined);
    getSubUsers();
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

  return (
    <main ref={main}>
      <RootLayout fadeOut={() => fadeOut()}>
        <div
          className="mainContent bg-gray-10 relative m-1 rounded-tl-2xl rounded-bl-2xl pb-12 px-2 pt-2 w-full left-full lg:w-[calc(100%-18rem)] lg:left-[calc(100%-18rem)]"
          ref={content}
          style={{ opacity: 1 }}
        >
          <div className="flex w-full justify-end">
            <Dropdown>
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

          <main className="Main flex flex-col p-4 m-0 rounded-lg md:m-2">
            <header className="flex flex-col md:flex-row justify-between">
              <h1 className="text-2xl font-bold">Meu Perfil</h1>
              <div className="flex flex-row gap-10">
                <button
                  onClick={() => setShowNewUserModal(true)}
                  className="bg-darkBlueAxion text-white p-2 rounded flex flex-row items-center gap-2 text-xs lg:text-sm"
                >
                  Cadastrar novo Usuário {""}
                  <img src="/newUser.svg" alt="" />
                </button>
                <button
                  className="bg-brand_blue text-white p-2 rounded flex flex-row items-center gap-2 text-xs lg:text-sm"
                  onClick={() => setShowNewPasswordModal(true)}
                >
                  Trocar Senha
                </button>
              </div>
            </header>
            <div className="flex flex-col md:flex-row items-center justify-around">
              <div className="flex flex-col w-full md:w-1/3 gap-8">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name">Nome Completo</label>
                  <input
                    disabled={profileData?.name === "..." ? true : false}
                    className="p-3 rounded border-[1px] w-full md:w-5/6 border-gray-20 outline-none text-black text-sm"
                    type="text"
                    id="name"
                    value={profileData?.name}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="name">Nome Social</label>
                  <input
                    disabled={profileData?.social_name === "..." ? true : false}
                    className="p-3 rounded border-[1px] w-full md:w-5/6 border-gray-20 outline-none text-black text-sm"
                    type="text"
                    id="social_name"
                    value={profileData?.social_name}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        social_name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email">Email</label>
                  <input
                    disabled={profileData?.email === "..." ? true : false}
                    className="p-3 rounded border-[1px] w-full md:w-5/6 border-gray-20 outline-none text-black text-sm"
                    type="email"
                    id="email"
                    value={profileData?.email}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="phone">Telefone</label>
                  <input
                    disabled={profileData?.mobilePhone === "..." ? true : false}
                    className="p-3 rounded border-[1px] w-full md:w-5/6 border-gray-20 outline-none text-black text-sm"
                    type="tel"
                    id="phone"
                    value={profileData?.mobilePhone}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        mobilePhone: maskPhone(e.target.value),
                      })
                    }
                    maxLength={14}
                  />
                </div>
              </div>

              <div className="flex flex-col w-full md:w-1/3 gap-8">
                <div className="flex flex-col gap-2">
                  <label htmlFor="CPF">Seu CPF</label>
                  <input
                    disabled={profileData?.cpfCnpj === "..." ? true : false}
                    className="p-3 rounded border-[1px] border-gray-20 outline-none text-black text-sm"
                    type="text"
                    id="CPF"
                    value={profileData?.cpfCnpj}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        cpfCnpj: maskCpfCnpj(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="birthDate">Data de Nascimento</label>
                  <input
                    disabled={profileData?.birth_date === "..." ? true : false}
                    className="p-3 rounded border-[1px] border-gray-20 outline-none text-black text-sm"
                    type="text"
                    id="birthDate"
                    value={profileData?.birth_date
                      .split("T")[0]
                      .split("-")
                      .reverse()
                      .join("/")}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        birth_date: maskDate(e.target.value),
                      })
                    }
                  />
                </div>

                <div>
                  <label htmlFor="gender" style={{ marginBottom: "0.75rem" }}>
                    Sexo
                  </label>
                  <div className="RadioContainer flex gap-5">
                    <div className="RadioGroup flex gap-2 items-center">
                      <label
                        className="RadioSelector flex items-center justify-center w-6 h-6 rounded-full border-[1px] border-gray-60"
                        htmlFor="MALE"
                        // checked={profileData?.sex === "MALE"}
                      >
                        <div
                          className={`w-4 h-4 rounded-full ${profileData?.sex === "MALE" ? "bg-darkBlueAxion" : "bg-transparent"}`}
                        />
                      </label>
                      <input
                        className="hidden"
                        type="radio"
                        name="gender"
                        id="MALE"
                        value="MALE"
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            sex: e.target.value,
                          })
                        }
                      />
                      <label htmlFor="MALE">Masculino</label>
                    </div>

                    <div className="RadioGroup flex gap-2 items-center">
                      <label
                        className="RadioSelector flex items-center justify-center w-6 h-6 rounded-full border-[1px] border-gray-60"
                        htmlFor="FEMALE"
                      >
                        <div
                          className={`w-4 h-4 rounded-full ${profileData?.sex === "FEMALE" ? "bg-darkBlueAxion" : "bg-transparent"}`}
                        />
                      </label>
                      <input
                        className="hidden"
                        type="radio"
                        name="gender"
                        id="FEMALE"
                        value="FEMALE"
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            sex: e.target.value,
                          })
                        }
                      />
                      <label htmlFor="FEMALE">Feminino</label>
                    </div>
                  </div>
                  <GlobalButton
                    background={Theme.color.darkBlueAxion}
                    color={Theme.color.gray_10}
                    width="100%"
                    height="auto"
                    fontSize={10}
                    className="p-2 rounded flex flex-row items-center gap-2 text-center justify-center mt-5"
                    content="Atualizar Cadastro"
                    onClick={() => UpdateProfile()}
                    loading={loading}
                  />
                </div>
              </div>
            </div>

            <div className="w-full border my-8" />

            <div />
            <div className="flex flex-row items-center gap-2">
              <h1 className="text-2xl font-bold">Minha Assinatura</h1>
              <Image
                className="w-32 h-8"
                width={1000}
                height={300}
                src="/axionLogo.png"
                alt=""
              />
            </div>
            <div className="flex flex-col md:flex-row mt-2">
              <div className="w-full xl:w-1/2 2xl:w-1/3 h-48 bg-[#d9d9d9] rounded-xl" />
              <div className="flex flex-col flex-wrap gap-4 p-2 w-full text-xs md:text-sm">
                <div className="grid grid-cols-3 w-full justify-items-stretch">
                  <div className="flex flex-col justify-center items-start">
                    <label className="font-semibold">Plano Contratado:</label>
                    {profileData && profileData.signature[0].plan.name}
                  </div>
                  <div className="flex flex-col justify-center items-start">
                    <label className="font-semibold">Descrição</label>
                    {profileData && profileData.signature[0].plan.description}
                  </div>
                  <div className="flex flex-col justify-center items-start">
                    <label className="font-semibold">
                      Agentes Monitorados:
                    </label>
                    Até{" "}
                    {profileData &&
                      profileData.signature[0].plan.amount_of_monitoring}{" "}
                    Agentes
                  </div>
                </div>
                <div className="grid grid-cols-3 w-full justify-items-stretch">
                  <div className="flex flex-col justify-center items-start">
                    <label className="font-semibold">
                      Monitoramento Jurídico
                    </label>
                    {profileData &&
                    profileData.signature[0].plan.legal_data === true
                      ? "Ativado"
                      : "Desativado"}
                  </div>
                  <div className="flex flex-col justify-center items-start">
                    <label className="font-semibold">Dados demográficos</label>
                    {profileData &&
                    profileData.signature[0].plan.population_data === true
                      ? "Ativado"
                      : "Desativado"}
                  </div>
                  <div className="flex flex-col justify-center items-start">
                    <label className="font-semibold">Seus Acessos:</label>
                    Até{" "}
                    {profileData &&
                      profileData.signature[0].plan.amount_of_users}{" "}
                    usuários
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-x-16 gap-y-4 justify-around text-xs md:text-sm mt-4">
              <div className="flex flex-col justify-center items-start">
                <label className="font-semibold">Data de vencimento</label>
                {new Date(
                  profileData && profileData.signature[0].expires_in
                ).toLocaleDateString("pt-BR", {
                  day: "numeric",
                  month: "numeric",
                  year: "numeric",
                })}
              </div>
              <div className="flex flex-col justify-center items-start">
                <label className="font-semibold">Duração</label>
                {profileData && profileData.signature[0].plan.duration} meses
              </div>
              <div className="flex flex-col justify-center items-start">
                <label className="font-semibold">Valor</label>
                {profileData &&
                  profileData.signature[0].plan.pixValue.toLocaleString(
                    "pt-BR",
                    { style: "currency", currency: "BRL" }
                  )}
              </div>
              <div className="flex flex-col justify-center items-start">
                <label className="font-semibold">Status</label>
                <button
                  className={`px-4 ${profileData && profileData.signature[0].status === "ACTIVE" ? "bg-green-70" : "bg-red-500"} text-white rounded`}
                >
                  {profileData && profileData.signature[0].status === undefined
                    ? "..."
                    : profileData &&
                        profileData.signature[0].status === "ACTIVE"
                      ? "ATIVO"
                      : "INATIVE"}
                </button>
              </div>
            </div>
          </main>
          <main className="w-full rounded-lg p4">
            <header className="flex justify-between">
              <h2 className="text-2xl font-semibold">Usuários</h2>
              <button
                className="bg-darkBlueAxion text-gray-10 p-2 rounded flex flex-row items-center gap-2 text-center justify-center"
                onClick={() => setShowNewUserModal(true)}
              >
                Cadastrar novo Usuário {""}
                <img src="/newUser.svg" alt="" />
              </button>
            </header>
            <UsersTable
              subUserData={subUserData}
              handleSubUser={handleSubUser}
            />
          </main>
        </div>

        <NewPasswordModal
          show={showNewPasswordModal}
          onHide={() => setShowNewPasswordModal(false)}
          formData={formData}
          setFormData={setFormData}
          changePassword={changePassword}
          loadingButton={loading1}
        />

        <BlockAccountModal
          show={showBlockAccountModal}
          onHide={() => setShowBlockAccountModal(false)}
        />
        <NewUserModal
          show={showNewUserModal}
          onHide={() => setShowNewUserModal(false)}
          subUserFormData={subUserFormData}
          setSubUserFormData={setSubUserFormData}
          registerSubUser={registerSubUser}
          loadingSubUser={loadingSubUser}
        />
      </RootLayout>
    </main>
  );
}
