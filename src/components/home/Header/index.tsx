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

  useEffect(() => {
    getPoliticians();
  }, []);

  return (
    <HeaderContainer>
      <HeaderTop>
        <Instruction>
          <img src="/dashboard/click.svg" alt="" />
          Clique nos <em>Cards</em> para ver os dados do seu Candidato
        </Instruction>
        <UserMenu>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <strong>Robert Martins</strong>
            <span>contato@robertmartins.com.br</span>
          </div>
          <img src="/arrow-down.svg" alt="" className="arrow" />
        </UserMenu>
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
  );
}
