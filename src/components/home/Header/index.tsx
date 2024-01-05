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
import { authGetAPI, getAPI } from "@/lib/axios";
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
}

export function HeaderComponent({
  fadeOut,
  selectedProfile,
  setSelectedProfile,
}: headerProps) {
  const router = useRouter();

  const [selectedTimeValue, setSelectedTimeValue] = useState("Últimos 15 Dias");
  const [showNewPasswordModal, setShowNewPasswordModal] = useState(false);
  const timeValues = ["Últimos 7 Dias", "Últimos 15 Dias", "Últimos 30 Dias"];

  const [monitoredProfiles, setMonitoredProfiles] = useState([]);

  async function getPoliticians() {
    const connect = await authGetAPI("/profile/monitoring");
    if (connect.status !== 200) {
      return alert(connect.body);
    }
    setMonitoredProfiles(connect.body.profile);
    setSelectedProfile({
      name: connect.body.profile[0].name,
      politicalGroup: connect.body.profile[0].politicalGroup,
      id: connect.body.profile[0].id,
    });
  }

  async function logOut() {
    localStorage.removeItem("axioonToken");
    localStorage.removeItem("axioonRefreshToken");
    router.push("/");
  }

  useEffect(() => {
    getPoliticians();
  }, []);

  return (
    <>
      <HeaderContainer>
        <HeaderTop>
          <Instruction>
            <img src="/dashboard/click.svg" alt="" />
            Clique nos <em>Cards</em> para ver os dados do seu Candidato
          </Instruction>
          <Dropdown style={{ alignSelf: "center", marginLeft: "auto" }}>
            <Dropdown.Toggle
              style={{
                backgroundColor: "#232323",
                border: 0,
                fontSize: 15,
              }}
            >
              <strong>Robert Martins</strong> <br />
              <span>contato@robertmartins.com.br</span>
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ backgroundColor: "#232323" }}>
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
        </HeaderTop>
        <HeaderMenu>
          <MenuItemComponent
            fadeOut={() => fadeOut()}
            imgSrc="/dashboard/seu-eleitorado-menu.png"
            href="/seu-eleitorado"
            name="SEU ELEITORADO"
          />
          <MenuItemComponent
            fadeOut={() => fadeOut()}
            imgSrc="/dashboard/midias-sociais-menu.png"
            href="/midias-sociais"
            name="MÍDIAS SOCIAIS"
          />
          <MenuItemComponent
            fadeOut={() => fadeOut()}
            imgSrc="/dashboard/suas-noticias-menu.png"
            href="/mencoes"
            name="MENÇÕES"
          />
          <MenuItemComponent
            fadeOut={() => fadeOut()}
            imgSrc="/dashboard/inteligencia-artificial-menu.png"
            href="/inteligencia-artificial"
            name="INTELIGENCIA ARTIFICIAL"
          />
        </HeaderMenu>
        <Candidate>
          <CandidateInfo>
            <Image
              src={"/dashboard/candidate.png"}
              width={200}
              height={200}
              alt=""
            />
            <div className="info">
              <HeaderCandidateSelect
                profiles={monitoredProfiles}
                selectedProfile={selectedProfile}
                setSelectedProfile={setSelectedProfile}
              />
              <span className="candidateNumber">
                Número do Candidato: xxxxxxxxxx
              </span>
              <span className="status">
                <div className="statusCircle" />
                Participando da Eleição
              </span>
            </div>
          </CandidateInfo>

          <ButtonAndSelect>
            {router.asPath.split("/")[2] === "seu-eleitorado" && (
              <Register>Cadastro</Register>
            )}

            {router.asPath.split("/")[2] !== "inteligencia-artificial" && (
              <HeaderTimeSelect
                values={timeValues}
                selectedValue={selectedTimeValue}
                setSelectedValue={setSelectedTimeValue}
              />
            )}
          </ButtonAndSelect>
        </Candidate>
      </HeaderContainer>
      <NewPasswordModal
        show={showNewPasswordModal}
        onHide={() => setShowNewPasswordModal(false)}
      />
    </>
  );
}
