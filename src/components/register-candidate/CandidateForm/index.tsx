import { useEffect, useState } from "react";
import { ClickHere, Container, FinishButton, FormGroup } from "./styles";
import Select from "react-select";
import { IBGEAPI, getAPI } from "@/lib/axios";
import { Modal, Spinner } from "react-bootstrap";
import Theme from "@/styles/themes";
import { TitleBottomBar } from "@/components/home/mencoes/TitleBottomBar";
import { GlobalButton } from "@/components/Global/Button";
import { profile } from "console";
import { maskCpfCnpj } from "@/utils/masks";

interface IBGEProps {
  formData?: any;
  setFormData?: any;
  loading: boolean;
  handleRegister?: any;
  cpfCnpj: string;
  setCpfCnpj: any;
  checkProfile?: any;
}
export function CandidateForm({
  formData,
  setFormData,
  loading,
  handleRegister,
  cpfCnpj,
  setCpfCnpj,
  checkProfile,
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
    <div className="flex flex-col">
      <div className="grid mt-4 gap-2 grid-cols-[auto] justify-items-center md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-2">
          <label className="text-white" htmlFor="cpfCnpj">
            CPF
          </label>
          <input
            className="w-[220px] h-[53px] rounded px-2 text-darkBlueAxion"
            name="cpfCnpj"
            id="cpfCnpj"
            placeholder="Insira o CPF"
            value={cpfCnpj}
            onChange={(e) => setCpfCnpj(maskCpfCnpj(e.target.value))}
            maxLength={18}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-white" htmlFor="socialName">
            Nome Social
          </label>
          <input
            className="w-[220px] h-[53px] rounded px-2 text-darkBlueAxion"
            type="text"
            name="socialName"
            id="socialName"
            placeholder="Digite"
            value={formData.social_name}
            onChange={(e) =>
              setFormData({ ...formData, social_name: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-white" htmlFor="fullName">
            Nome completo
          </label>
          <input
            className="w-[220px] h-[53px] rounded px-2 text-darkBlueAxion"
            type="text"
            name="fullName"
            id="fullName"
            placeholder="Digite"
            value={formData.full_name}
            onChange={(e) =>
              setFormData({ ...formData, full_name: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-white" htmlFor="state">
            Estado
          </label>
          <Select
            name="state"
            options={stateList}
            onChange={(e) => selectState(e)}
            placeholder="Estado"
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
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-white" htmlFor="city">
            Cidade
          </label>
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
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-white" htmlFor="role">
            Cargo
          </label>
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
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-white" htmlFor="politicalGroup">
            Partido Político
          </label>
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
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-white" htmlFor="socialMidias">
            Redes Sociais
          </label>
          <div
            className="cursor-pointer flex relative bg-white w-[220px] h-[53px] rounded px-2 text-darkBlueAxion items-center gap-2 hover:scale-[1.01]"
            onClick={() => setOpen(true)}
          >
            <strong>Clique aqui</strong>
            <div className="w-2 h-2 absolute right-2 top-2 rounded-full bg-[#ff0000] animate-ping" />
            <img src="/register-candidate/hand-icon.svg" alt="" />
          </div>
        </div>
      </div>
      <button
        className="w-[220px] h-[53px] rounded px-2 text-lg font-bold text-white bg-darkBlueAxion self-center my-2 hover:scale-[1.01]"
        disabled={loading}
        onClick={checkProfile}
      >
        {loading ? (
          <Spinner animation="border" size="sm" />
        ) : (
          "Inseriu? Concluir"
        )}
      </button>
      <Modal show={open} onHide={() => setOpen(false)} size="lg">
        <div className="bg-[#34374C] text-white rounded p-4 flex flex-col">
          <TitleBottomBar
            title="Hora de Cadastrar o político que quer acompanhar as métricas"
            barColor="#fff"
            textColor="#fff"
            width="35rem"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4  justify-items-center mt-5">
            <div className="flex flex-col gap-2">
              <label className="text-white" htmlFor="facebook">
                Facebook
              </label>
              <input
                className="w-[220px] h-[53px] rounded px-2 text-darkBlueAxion"
                type="text"
                name="facebook"
                id="facebook"
                placeholder="Digite"
                value={formData.facebook}
                onChange={(e) =>
                  setFormData({ ...formData, facebook: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-white" htmlFor="instagram">
                Instagram
              </label>
              <input
                className="w-[220px] h-[53px] rounded px-2 text-darkBlueAxion"
                type="text"
                name="instagram"
                id="instagram"
                placeholder="Digite"
                value={formData.instagram}
                onChange={(e) =>
                  setFormData({ ...formData, instagram: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-white" htmlFor="tiktok">
                TikTok
              </label>
              <input
                className="w-[220px] h-[53px] rounded px-2 text-darkBlueAxion"
                type="text"
                name="tiktok"
                id="tiktok"
                placeholder="Digite"
                value={formData.tiktok}
                onChange={(e) =>
                  setFormData({ ...formData, tiktok: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-white" htmlFor="youtube">
                YouTube
              </label>
              <input
                className="w-[220px] h-[53px] rounded px-2 text-darkBlueAxion"
                type="text"
                name="youtube"
                id="youtube"
                placeholder="Digite"
                value={formData.youtube}
                onChange={(e) =>
                  setFormData({ ...formData, youtube: e.target.value })
                }
              />
            </div>
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
    </div>
  );
}
