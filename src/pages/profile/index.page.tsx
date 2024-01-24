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
import { AuthPutAPI, authGetAPI, loginVerifyAPI, user_type } from "@/lib/axios";
import { maskCpfCnpj, maskDate, maskPhone } from "@/utils/masks";
import { useRouter } from "next/router";
import Image from "next/image";

export default function Profile() {
  const router = useRouter();
  const [showNewPasswordModal, setShowNewPasswordModal] = useState(false);
  const [showBlockAccountModal, setShowBlockAccountModal] = useState(false);
  const [showNewUserModal, setShowNewUserModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    social_name: "",
    email: "",
    mobilePhone: "",
    cpfCnpj: "",
    birth_date: "",
    sex: "",
  });
  const [loading1, setLoading1] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isEditing, setIsEditing] = useState(false);

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

  const [type, setType] = useState("");

  async function handleVerify() {
    const connect = await loginVerifyAPI();
    const type = localStorage.getItem(user_type);
    if (type !== "user") {
      alert("Somente administradores podem acessar esta página");
      return router.push("/");
    }
    GetProfile();
  }

  // async function registerSubUser() {
  //   const connect = await AuthPutAPI("/user/profile", {});
  // }

  useEffect(() => {
    handleVerify();
  }, []);

  return (
    <main ref={main}>
      <RootLayout fadeOut={() => fadeOut()}>
        <div
          className="mainContent bg-gray-10 relative m-1 rounded-tl-2xl rounded-bl-2xl pb-12 px-2 pt-2 w-full left-full lg:w-[calc(100%-18rem)] lg:left-[calc(100%-18rem)]"
          ref={content}
          style={{ opacity: 1 }}
        >
          <main className="Main flex flex-col p-4 m-0 rounded-lg md:m-2">
            <header className="flex flex-col md:flex-row justify-between">
              <h1 className="text-2xl font-bold">Meu Perfil</h1>
              <div className="flex flex-row gap-10">
                <GlobalButton
                  onClick={() => setShowNewUserModal(true)}
                  content=""
                  background={Theme.color.darkBlueAxion}
                  color={Theme.color.gray_10}
                  width="auto"
                  height="auto"
                  fontSize={10}
                  className="p-2 rounded flex flex-row items-center gap-2 "
                >
                  Cadastrar novo Usuário {""}
                  <img src="/newUser.svg" alt="" />
                </GlobalButton>
                <GlobalButton
                  content=""
                  background={Theme.color.brand_blue}
                  color={Theme.color.gray_10}
                  width="auto"
                  height="auto"
                  fontSize={10}
                  className="p-2 rounded flex flex-row items-center gap-2 "
                  onClick={() => setShowNewPasswordModal(true)}
                >
                  Trocar Senha
                </GlobalButton>
              </div>
            </header>
            <div className="flex flex-col md:flex-row items-center justify-around">
              <div className="flex flex-col items-center w-full md:w-1/5">
                <img
                  src="/sidebar/user.png"
                  alt=""
                  className="w-16 h-16 rounded-full"
                />
                <GlobalButton
                  content=""
                  background="transparent"
                  color="blue"
                  fontSize={8}
                  width="auto"
                  height="auto"
                  className="flex flex-row items-center gap-2"
                >
                  <UserEditSVG />
                  Substituir
                </GlobalButton>
              </div>

              <div className="flex flex-col w-full md:w-1/3 gap-8">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name">Nome Completo</label>
                  <input
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
                  <RadioContainer>
                    <RadioGroup>
                      <RadioSelector
                        htmlFor="MALE"
                        checked={profileData?.sex === "MALE"}
                      >
                        <div />
                      </RadioSelector>
                      <input
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
                    </RadioGroup>

                    <RadioGroup>
                      <RadioSelector
                        htmlFor="FEMALE"
                        checked={profileData?.sex === "FEMALE"}
                      >
                        <div />
                      </RadioSelector>
                      <input
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
                    </RadioGroup>
                  </RadioContainer>
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
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <label className="font-semibold">Plano Contratado:</label>
                    Plano ABC
                  </div>
                  <div className="flex flex-col">
                    <label className="font-semibold">INFO 1</label>
                    INFO 1
                  </div>
                  <div className="flex flex-col">
                    <label className="font-semibold">
                      Agentes Monitorados:
                    </label>
                    Até 3 Agentes
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <label className="font-semibold">Plano Contratado:</label>
                    Plano ABC
                  </div>
                  <div className="flex flex-col">
                    <label className="font-semibold">INFO 1</label>
                    INFO 1
                  </div>
                  <div className="flex flex-col">
                    <label className="font-semibold">
                      Agentes Monitorados:
                    </label>
                    Até 3 Agentes
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-x-16 gap-y-4 justify-around text-xs md:text-sm mt-4">
              <div className="flex flex-col">
                <label className="font-semibold">Data</label>
                01/01/2024
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">Descrição</label>
                Plano ABC
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">Valor</label>
                R$5000,00
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">Status</label>
                <button className="px-4 bg-green-70 text-white rounded">
                  PAGO
                </button>
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">Recibo</label>
                <a className="decoration-none">Retirar Nota Fiscal</a>
              </div>
            </div>
          </main>
          <main className="w-full rounded-lg p4">
            <header className="flex justify-between">
              <h2 className="text-2xl font-semibold">Usuários</h2>
              <GlobalButton
                background={Theme.color.darkBlueAxion}
                color={Theme.color.gray_10}
                content=""
                width="auto"
                height="auto"
                fontSize={10}
                className="p-2 rounded flex flex-row items-center gap-2 text-center justify-center mt-5"
                onClick={() => setShowNewUserModal(true)}
              >
                Cadastrar novo Usuário {""}
                <img src="/newUser.svg" alt="" />
              </GlobalButton>
            </header>
            <UsersTable />
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
        />
      </RootLayout>
    </main>
  );
}
