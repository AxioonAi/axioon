import { useEffect, useState } from "react";
import { ClickHere, Container, FinishButton, FormGroup } from "./styles";
import Select from "react-select";
import { IBGEAPI, getAPI } from "@/lib/axios";
import { Modal, Spinner } from "react-bootstrap";
import Theme from "@/styles/themes";
import { TitleBottomBar } from "@/components/home/mencoes/TitleBottomBar";
import { GlobalButton } from "@/components/Global/Button";

interface IBGEProps {
  formData?: any;
  setFormData?: any;
  loading: boolean;
  handleRegister?: any;
}
export function CandidateForm({
  formData,
  setFormData,
  loading,
  handleRegister,
}: IBGEProps) {
  const selectState = (e: any) => {
    setFormData({ ...formData, state: e });
    handleIBGECity();
  };
  const [stateList, setStateList] = useState<any>([]);
  const [cityList, setCityList] = useState<any>([]);
  const [politicalGroupList, setPoliticalGroupList] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const roles = [
    { value: "MAYOR", label: "Prefeito" },
    { value: "MAYOR", label: "Governador" },
  ];

  async function handleIBGEState() {
    const connect = await IBGEAPI(`/estados/?orderBy=nome`);
    const states: any = [];
    for (const key in connect.body) {
      states.push({
        label: connect.body[key].nome,
        value: connect.body[key].sigla,
        id: connect.body[key].id,
      });
    }
    setStateList(states);
  }

  async function handleIBGECity() {
    const connect = await IBGEAPI(
      `/estados/${formData.state.id}/municipios?orderBy=name`
    );
    const cities: any = [];
    for (const key in connect.body) {
      cities.push({
        label: connect.body[key].nome,
        value: connect.body[key].nome,
      });
    }
    setCityList(cities);
  }

  async function handlePoliticalGroup() {
    const connect = await getAPI("/political-group");
    const politicalGroups: any = [];
    for (const key in connect.body.politicalGroup) {
      politicalGroups.push({
        label: connect.body.politicalGroup[key].name,
        number: connect.body.politicalGroup[key].number,
        acronym: connect.body.politicalGroup[key].acronym,
        id: connect.body.politicalGroup[key].id,
      });
    }
    setPoliticalGroupList(politicalGroups);
  }

  useEffect(() => {
    handleIBGEState();
  }, []);

  return (
    <>
      <Container>
        <FormGroup>
          <label htmlFor="socialName">Nome Social</label>
          <input
            type="text"
            name="socialName"
            id="socialName"
            placeholder="Digite"
            value={formData.social_name}
            onChange={(e) =>
              setFormData({ ...formData, social_name: e.target.value })
            }
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="fullName">Nome completo</label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            placeholder="Digite"
            value={formData.full_name}
            onChange={(e) =>
              setFormData({ ...formData, full_name: e.target.value })
            }
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="state">Estado</label>
          <Select
            name="state"
            options={stateList}
            onChange={(e) => selectState(e)}
            placeholder="Estado"
            className="w-full min-w-56 max-w-5min-w-56"
            menuPlacement="auto"
            styles={{
              control: (base) => ({
                ...base,
                height: 53,
                width: 220,
              }),
              indicatorSeparator: (base) => ({
                ...base,
                display: "none",
              }),
              input: (base) => ({
                ...base,
                height: 53,
                width: 220,
              }),
            }}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="city">Cidade</label>
          <Select
            name="city"
            onFocus={() => handleIBGECity()}
            options={cityList}
            menuPlacement="auto"
            styles={{
              control: (base) => ({
                ...base,
                height: 53,
                width: 220,
              }),
              indicatorSeparator: (base) => ({
                ...base,
                display: "none",
              }),
              input: (base) => ({
                ...base,
                height: 53,
                width: 220,
              }),
            }}
            onChange={(e) => setFormData({ ...formData, city: e })}
            placeholder="Cidade"
            className="w-full min-w-56 max-w-5min-w-56 "
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="role">Cargo</label>
          <Select
            name="role"
            options={roles}
            menuPlacement="auto"
            styles={{
              control: (base) => ({
                ...base,
                height: 53,
                width: 220,
              }),
              indicatorSeparator: (base) => ({
                ...base,
                display: "none",
              }),
              input: (base) => ({
                ...base,
                height: 53,
                width: 220,
              }),
            }}
            onChange={(e) => setFormData({ ...formData, role: e })}
            placeholder="Cargo"
            className="w-full min-w-56 max-w-5min-w-56 "
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="politicalGroup">Partido Político</label>
          <Select
            name="politicalGroup"
            onFocus={() => handlePoliticalGroup()}
            options={politicalGroupList}
            menuPlacement="auto"
            styles={{
              control: (base) => ({
                ...base,
                height: 53,
                width: 220,
              }),
              indicatorSeparator: (base) => ({
                ...base,
                display: "none",
              }),
              input: (base) => ({
                ...base,
                height: 53,
                width: 220,
              }),
            }}
            onChange={(e) =>
              setFormData({ ...formData, political_group_id: e })
            }
            placeholder="Partido Político"
            className="w-full min-w-56 max-w-5min-w-56 "
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="socialMidias">Redes Sociais</label>
          <ClickHere className="cursor-pointer" onClick={() => setOpen(true)}>
            <strong>Clique aqui</strong>
            <img src="/register-candidate/hand-icon.svg" alt="" />
          </ClickHere>
        </FormGroup>

        <FinishButton disabled={loading} onClick={handleRegister}>
          {loading ? (
            <Spinner animation="border" size="sm" />
          ) : (
            "Inseriu? Concluir"
          )}
        </FinishButton>
      </Container>
      <Modal show={open} onHide={() => setOpen(false)} size="lg">
        <div className="bg-[#34374C] text-white rounded p-4 flex flex-col">
          <TitleBottomBar
            title="Hora de Cadastrar o político que quer acompanhar as métricas"
            barColor="#fff"
            textColor="#fff"
            width="35rem"
          />
          <div className="grid grid-cols-2 gap-4  justify-items-center mt-5">
            <FormGroup>
              <label htmlFor="facebook">Facebook</label>
              <input
                type="text"
                name="facebook"
                id="facebook"
                placeholder="Digite"
                value={formData.facebook}
                onChange={(e) =>
                  setFormData({ ...formData, facebook: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="instagram">Instagram</label>
              <input
                type="text"
                name="instagram"
                id="instagram"
                placeholder="Digite"
                value={formData.instagram}
                onChange={(e) =>
                  setFormData({ ...formData, instagram: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="tiktok">TikTok</label>
              <input
                type="text"
                name="tiktok"
                id="tiktok"
                placeholder="Digite"
                value={formData.tiktok}
                onChange={(e) =>
                  setFormData({ ...formData, tiktok: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="youtube">YouTube</label>
              <input
                type="text"
                name="youtube"
                id="youtube"
                placeholder="Digite"
                value={formData.youtube}
                onChange={(e) =>
                  setFormData({ ...formData, youtube: e.target.value })
                }
              />
            </FormGroup>
          </div>
          <GlobalButton
            content="Concluir"
            onClick={() => setOpen(false)}
            background={Theme.color.gray_10}
            color={Theme.color.darkBlueAxion}
            width="50%"
            height="auto"
            fontSize={15}
            className="px-5 py-2 self-center mt-5 rounded-lg"
          />
        </div>
      </Modal>
    </>
  );
}
