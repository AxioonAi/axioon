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

  useEffect(() => {
    handleVerify();
  }, []);

  return (
    <main ref={main}>
      <RootLayout fadeOut={() => fadeOut()}>
        <Content className="mainContent" ref={content} style={{ opacity: 1 }}>
          <Main>
            <header>
              <h2>Meu Perfil</h2>
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
            <PersonalInfo>
              <AvatarContainer>
                <img src="/sidebar/user.png" alt="" />
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
              </AvatarContainer>

              <FormSection>
                <FormGroup>
                  <label htmlFor="name">Nome Completo</label>
                  <input
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
                </FormGroup>
                <FormGroup>
                  <label htmlFor="name">Nome Social</label>
                  <input
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
                </FormGroup>
                <FormGroup>
                  <label htmlFor="email">Email</label>
                  <input
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
                </FormGroup>
                <FormGroup>
                  <label htmlFor="phone">Telefone</label>
                  <input
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
                </FormGroup>
              </FormSection>

              <FormSection>
                <FormGroup>
                  <label htmlFor="CPF">Seu CPF</label>
                  <input
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
                </FormGroup>
                <FormGroup>
                  <label htmlFor="birthDate">Data de Nascimento</label>
                  <input
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
                </FormGroup>

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
              </FormSection>
            </PersonalInfo>

            <div
              style={{
                borderTop: "1px solid" + Theme.color.gray_20,
                margin: "4rem 0 2rem 10rem",
              }}
            />

            <div />
            <div className="flex flex-row items-center gap-2">
              <h2>Minha Assinatura</h2>
              <img
                src="/axionLogo.png"
                alt=""
                style={{ height: "1.5rem", marginLeft: "0.5rem" }}
              />
            </div>
            <div
              style={{ display: "flex", flexDirection: "row" }}
              className="mt-5"
            >
              <div
                style={{
                  width: "50%",
                  height: "12rem",
                  backgroundColor: "#d9d9d9",
                  borderRadius: 15,
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "2rem",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <label style={{ lineHeight: "3rem" }}>
                      Plano Contratado:
                    </label>
                    Plano ABC
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <label style={{ lineHeight: "3rem" }}>INFO 1</label>
                    INFO 1
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <label style={{ lineHeight: "3rem" }}>
                      Agentes Monitorados:
                    </label>
                    Até 3 Agentes
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <label style={{ lineHeight: "3rem" }}>
                      Plano Contratado:
                    </label>
                    Plano ABC
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <label style={{ lineHeight: "3rem" }}>INFO 1</label>
                    INFO 1
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <label style={{ lineHeight: "3rem" }}>
                      Agentes Monitorados:
                    </label>
                    Até 3 Agentes
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: "5rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label style={{ lineHeight: "3rem" }}>Data</label>
                01/01/2024
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label style={{ lineHeight: "3rem" }}>Descrição</label>
                Plano ABC
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label style={{ lineHeight: "3rem" }}>Valor</label>
                R$5000,00
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label style={{ lineHeight: "3rem" }}>Status</label>
                <button
                  style={{
                    backgroundColor: Theme.color.green_70,
                    color: "white",
                    borderRadius: 5,
                    border: 0,
                    padding: "0 1rem",
                  }}
                >
                  PAGO
                </button>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label style={{ lineHeight: "3rem" }}>Recibo</label>
                <a style={{ textDecoration: "underline" }}>
                  Retirar Nota Fiscal
                </a>
              </div>
            </div>
          </Main>
          <Main>
            <header>
              <h2>Usuários</h2>
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
          </Main>
        </Content>

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
