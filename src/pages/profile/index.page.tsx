import { GlobalButton } from "@/components/Global/Button";
import { HeaderComponent } from "@/components/Global/Header";
import { Sidebar } from "@/components/Global/Sidebar";
import { BlockAccountModal } from "@/components/profile/BlockAccountModal";
import { NewPasswordModal } from "@/components/profile/NewPasswordModal";
import Theme from "@/styles/themes";
import { useLayoutEffect, useRef, useState } from "react";
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

export default function Profile() {
  const [selectedGender, setSelectedGender] = useState("male");
  const [showNewPasswordModal, setShowNewPasswordModal] = useState(false);
  const [showBlockAccountModal, setShowBlockAccountModal] = useState(false);
  const [showNewUserModal, setShowNewUserModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleRadioChange = (event: { target: { value: string } }) => {
    setSelectedGender(event.target.value);
  };

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

  return (
    <main ref={main}>
      <RootLayout fadeOut={() => fadeOut()}>
        <Content className="mainContent" ref={content} style={{ opacity: 1 }}>
          <Main>
            <header>
              <h2>Meu Perfil</h2>
              <button
                style={{
                  marginLeft: "auto",
                  marginRight: "5rem",
                  background: Theme.color.darkBlueAxion,
                }}
                onClick={() => setShowNewUserModal(true)}
              >
                Cadastrar novo Usuário {""}
                <img src="/newUser.svg" alt="" />
              </button>
              <button onClick={() => setShowNewPasswordModal(true)}>
                Trocar Senha
              </button>
            </header>
            <PersonalInfo>
              <AvatarContainer>
                <img src="/sidebar/user.png" alt="" />
                <button>
                  <UserEditSVG />
                  Substituir
                </button>
              </AvatarContainer>

              <FormSection>
                <FormGroup>
                  <label htmlFor="name">Nome Completo</label>
                  <input type="text" id="name" value={"Robert Martins"} />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" value={"rober@axion.com.br"} />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="phone">Telefone</label>
                  <input type="tel" id="phone" value={"(11) 99999-999"} />
                </FormGroup>
              </FormSection>

              <FormSection>
                <FormGroup>
                  <label htmlFor="CPF">Seu CPF</label>
                  <input type="text" id="CPF" value={"111.111.111-11"} />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="birthDate">Data de Nascimento</label>
                  <input type="date" id="birthDate" />
                </FormGroup>

                <div>
                  <label htmlFor="gender" style={{ marginBottom: "0.75rem" }}>
                    Sexo
                  </label>
                  <RadioContainer>
                    <RadioGroup>
                      <RadioSelector
                        htmlFor="male"
                        checked={selectedGender === "male"}
                      >
                        <div />
                      </RadioSelector>
                      <input
                        type="radio"
                        name="gender"
                        id="male"
                        value="male"
                        checked={selectedGender === "male"}
                        onChange={handleRadioChange}
                      />
                      <label htmlFor="male">Masculino</label>
                    </RadioGroup>

                    <RadioGroup>
                      <RadioSelector
                        htmlFor="female"
                        checked={selectedGender === "female"}
                      >
                        <div />
                      </RadioSelector>
                      <input
                        type="radio"
                        name="gender"
                        id="female"
                        value="female"
                        checked={selectedGender === "female"}
                        onChange={handleRadioChange}
                      />
                      <label htmlFor="female">Feminino</label>
                    </RadioGroup>
                  </RadioContainer>
                  <GlobalButton
                    content="Atualizar Cadastro"
                    style={{ width: "100%", marginTop: "2rem" }}
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
            <div style={{ display: "flex", alignItems: "center" }}>
              <h2>Minha Assinatura</h2>
              <img
                src="/axionLogo.png"
                alt=""
                style={{ height: "1.5rem", marginLeft: "0.5rem" }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
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
              <button
                style={{
                  background: Theme.color.darkBlueAxion,
                }}
                onClick={() => setShowNewUserModal(true)}
              >
                Cadastrar novo Usuário {""}
                <img src="/newUser.svg" alt="" />
              </button>
            </header>
            <UsersTable />
          </Main>
        </Content>

        <NewPasswordModal
          show={showNewPasswordModal}
          onHide={() => setShowNewPasswordModal(false)}
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
