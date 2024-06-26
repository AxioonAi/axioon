import { HeaderTimeSelect } from "../../home/Header/TimeSelect";
import { ComparisonItemComponent } from "../ComparisonItemComponent";
import { NewPasswordModal } from "@/components/profile/NewPasswordModal";
import { AuthPutAPI, authGetAPI, loginVerifyAPI } from "@/lib/axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Dropdown, Spinner } from "react-bootstrap";

interface headerProps {
  fadeOut: any;
  selectedProfileMain: {
    name: string;
    politicalGroup: string;
    id: string;
    image: string;
    campaignNumber: number;
  };
  setSelectedProfileMain: any;
  selectedProfileSecondary: {
    name: string;
    politicalGroup: string;
    id: string;
    image: string;
    campaignNumber: number;
  };
  setSelectedProfileSecondary: any;
  selectedComparison: string;
  setSelectedComparison: any;
  timeValues?: any;
  selectedTimeValues?: any;
  setSelectedTimeValues?: (value: any) => void;
  getIndividualDetails?: any;
  setLoading?: (value: boolean) => void;
  noData: boolean;
  setNoData: any;
}

export function ComparisonHeaderComponent({
  fadeOut,
  selectedProfileMain,
  setSelectedProfileMain,
  selectedProfileSecondary,
  setSelectedProfileSecondary,
  selectedComparison,
  setSelectedComparison,
  timeValues,
  selectedTimeValues,
  setSelectedTimeValues,
  getIndividualDetails,
  setLoading,
  noData,
  setNoData,
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
    if (connect.body.profile.length > 1) {
      setMonitoredProfiles(connect.body.profile);
      setSelectedProfileMain({
        name: connect.body.profile[0].name,
        politicalGroup: connect.body.profile[0].politicalGroup,
        id: connect.body.profile[0].id,
        image: connect.body.profile[0].image,
        campaignNumber: connect.body.profile[0].campaignNumber,
      });
      setSelectedProfileSecondary({
        name: connect.body.profile[1].name,
        politicalGroup: connect.body.profile[1].politicalGroup,
        id: connect.body.profile[1].id,
        image: connect.body.profile[1].image,
        campaignNumber: connect.body.profile[1].campaignNumber,
      });
    } else {
      setNoData(true);
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
            {" "}
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
        <nav className="headerMenu flex flex-wrap justify-around xl:justify-evenly xl:mt-10 gap-4">
          <ComparisonItemComponent
            click={click}
            fadeOut={() => fadeOut()}
            name="MÍDIAS SOCIAIS"
            selectedComparison={selectedComparison}
            setSelectedComparison={setSelectedComparison}
          />
          <ComparisonItemComponent
            click={click}
            fadeOut={() => fadeOut()}
            name="MENÇÕES"
            selectedComparison={selectedComparison}
            setSelectedComparison={setSelectedComparison}
          />
        </nav>
        <div className="Candidate flex flex-col h-auto items-center xl:flex-row md:h-28 mt-12 px-8 justify-between">
          <div className="candidateInfo flex items-center gap-3">
            {selectedProfileMain.image ? (
              <Image
                src={selectedProfileMain.image}
                width={200}
                height={200}
                alt=""
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16" />
            )}
            <div className="info flex flex-col">
              <div className="Container flex">
                <Dropdown className="flex items-center justify-center">
                  <Dropdown.Toggle
                    className="flex items-center justify-center text-sm text-white border-0"
                    style={{ backgroundColor: "#0d123c" }}
                  >
                    {selectedProfileMain ? (
                      `${selectedProfileMain.name}`
                    ) : (
                      <>
                        <Spinner animation="border" />
                      </>
                    )}
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="bg-darkBlueAxion border border-secondary-100 opacity-95 px-1">
                    {monitoredProfiles.map((item: any) => (
                      <Dropdown.Item
                        className="text-center text-white border-b-[1px] border-gray-10 p-2 hover:bg-hoverDarkBlueAxion last:border-0"
                        onClick={() => setSelectedProfileMain(item)}
                        key={item}
                      >
                        {item.name}
                        {/* - {item.politicalGroup} */}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <span className="candidateNumber text-[#8990ab] text-sm">
                Número do Candidato: {selectedProfileMain.campaignNumber}
              </span>
              {/* <span className="status flex items-center gap-1 text-[#22c24f] text-xs">
                <div className="statusCircle w-1.5 h-1.5 bg-[#22c24f] rounded-full" />
                Participando da Eleição
              </span> */}
            </div>
          </div>

          <div className="buttonAndSelect flex items-center my-8 flex-col md:mt-0 gap-4 md:items-end">
            <HeaderTimeSelect
              timeValues={timeValues}
              selectedTimeValues={selectedTimeValues}
              setSelectedTimeValues={setSelectedTimeValues}
              getIndividualDetails={getIndividualDetails}
              setLoading={setLoading}
            />
          </div>

          <div className="candidateInfo flex items-center gap-3">
            {selectedProfileSecondary.image ? (
              <Image
                src={selectedProfileSecondary.image}
                width={200}
                height={200}
                alt=""
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16" />
            )}
            <div className="info flex flex-col">
              <div className="Container flex">
                <Dropdown className="flex items-center justify-center">
                  <Dropdown.Toggle
                    className="flex items-center justify-center text-sm text-white border-0"
                    style={{ backgroundColor: "#0d123c" }}
                  >
                    {selectedProfileSecondary ? (
                      `${selectedProfileSecondary.name} `
                    ) : (
                      <>
                        <Spinner animation="border" />
                      </>
                    )}
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="bg-darkBlueAxion border border-secondary-100 opacity-95 px-1">
                    {monitoredProfiles.map((item: any) => (
                      <Dropdown.Item
                        className="text-center text-white border-b-[1px] border-gray-10 p-2 hover:bg-hoverDarkBlueAxion last:border-0"
                        onClick={() => setSelectedProfileSecondary(item)}
                        key={item}
                      >
                        {item.name}
                        {/* - {item.politicalGroup} */}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <span className="candidateNumber text-[#8990ab] text-sm">
                Número do Candidato: {selectedProfileSecondary.campaignNumber}
              </span>
            </div>
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
