import { TitleWithBar } from "@/components/Global/TitleWithBar";
import RootLayout from "@/components/Layout";
import { HeaderComponent } from "@/components/home/Header";
import { authGetAPI } from "@/lib/axios";
import { maskCnpj } from "@/utils/masks";
import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Spinner } from "react-bootstrap";

export default function Legal() {
  const main = useRef(null);
  const content = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".mainContent", {
        x: "-100%",
        opacity: 1,
        duration: 0.5,
        delay: 0.2,
      });
    }, main);
    return () => ctx.revert();
  }, []);

  const fadeOut = () => {
    const ctx = gsap.context(() => {
      gsap.to(".mainContent", {
        opacity: 0,
        duration: 0.5,
      });
    }, main);
    return () => ctx.revert();
  };

  const [showMoreLegalData, setShowMoreLegalData] = useState(false);
  const [showMoreIncomeTax, setShowMoreIncomeTax] = useState(false);
  const [showMoreEconomicRelationship, setShowMoreEconomicRelationship] =
    useState(false);
  const [showMoreAddress, setShowMoreAddress] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState({
    name: "Carregando...",
    politicalGroup: "",
    id: "",
    image: "",
    campaignNumber: 0,
  });
  const [selectedTimeValues, setSelectedTimeValues] = useState({
    value: 30,
    name: "Últimos 30 Dias",
  });
  const timeValues = [
    {
      value: 7,
      name: "Últimos 7 Dias",
    },
    {
      value: 15,
      name: "Últimos 15 Dias",
    },
    {
      value: 30,
      name: "Últimos 30 Dias",
    },
  ];

  const [legalData, setLegalData] = useState<any>();
  const [locked, setLocked] = useState(false);
  const [noData, setNoData] = useState(false);

  async function getLegal() {
    const connect = await authGetAPI(`/profile/legal/${selectedProfile.id}`);
    if (connect.status === 401) {
      return setLocked(true);
    }
    if (
      connect.body.politicianProfile.address.length === 0 &&
      connect.body.politicianProfile.incomeTax.length === 0 &&
      connect.body.politicianProfile.economicRelationship.length === 0 &&
      connect.body.politicianProfile.legalData.length === 0 &&
      connect.body.politicianProfile.personalData.length === 0
    ) {
      setNoData(true);
    }
    setLocked(false);
    if (connect.status !== 200) {
      return alert(connect.body);
    }
    setLegalData(connect.body.politicianProfile);
  }

  useEffect(() => {
    if (selectedProfile.id) {
      setLegalData(undefined);
      getLegal();
    }
  }, [selectedProfile]);

  const redirect = (url: string) => {
    if (confirm("Você será redirecionado para a publicação original")) {
      window.open(url, "_blank");
    } else {
      return;
    }
  };

  return (
    <main ref={main}>
      <RootLayout fadeOut={() => fadeOut()}>
        <div
          className="mainContent bg-gray-10 relative m-1 rounded-tl-2xl rounded-bl-2xl pb-12 px-2 pt-2 w-full left-full lg:w-[calc(100%-18rem)] lg:left-[calc(100%-18rem)]"
          ref={content}
          style={{ opacity: 1 }}
        >
          <HeaderComponent
            fadeOut={() => fadeOut()}
            selectedProfile={selectedProfile}
            setSelectedProfile={setSelectedProfile}
            selectedPage={"legal"}
            timeValues={timeValues}
            selectedTimeValues={selectedTimeValues}
            setSelectedTimeValues={setSelectedTimeValues}
          />
          {legalData && !noData ? (
            <div className="ChartsContainer grid grid-cols-[90%] md:grid-cols-[35rem] xl:grid-cols-[30rem_30rem] 2xl:grid-cols-[35rem_35rem] justify-center items-center gap-12 mt-5">
              <div className=" flex flex-col justify-around bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] h-auto min-h-[30vh] md:min-h-[45vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                <div className="flex flex-col">
                  <TitleWithBar
                    content="Dados Legais"
                    barColor="#AB8E63"
                    juridia={true}
                    subTitle
                  />
                  <div className="my-4 h-[35vh] overflow-y-scroll">
                    {legalData && legalData.legalData.length !== 0 ? (
                      legalData.legalData
                        .slice(
                          0,
                          showMoreLegalData ? legalData.legalData.length : 3,
                        )
                        .map((item: any) => (
                          <div className="flex flex-col p-2 w-full gap-2 justify-between h-auto min-h-20 first:m-0 mb-4 rounded bg-gradient-to-br from-[#f6f6f6] to-[#c3c3c3] shadow-sm">
                            <div className="flex flex-col lg:flex-row w-full gap-2">
                              <div className="flex flex-row max-w-[60%] lg:flex-col">
                                <Image
                                  src="/dashboard/Legal/Papers.svg"
                                  width={25}
                                  height={25}
                                  alt=""
                                />
                                <div className="flex flex-col self-center">
                                  <span className="text-darkBlueAxion font-semibold text-xs">
                                    {item.subject.length > 50
                                      ? `${item.subject.slice(0, 50)}...`
                                      : item.subject}
                                  </span>
                                  <span className="text-[10px] text-gray-60 font-light leading-3">
                                    {item.judgingBy}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center lg:ml-auto h-6 border-[1px] border-darkBlueAxion rounded gap-1 px-1 bg-green-60">
                                <Image
                                  src="/dashboard/Legal/Checked.svg"
                                  width={15}
                                  height={15}
                                  alt=""
                                />
                                <span className="text-white font-semibold text-xs">
                                  Processo Ativo
                                </span>
                              </div>
                            </div>
                            <div className="flex w-full gap-2 justify-between">
                              <span className="text-[10px]">
                                Data de Início:{" "}
                                <strong>
                                  {new Date(item.startDate).toLocaleDateString(
                                    "pt-BR",
                                  )}
                                </strong>
                              </span>
                              <button
                                className="flex items-center justify-center bg-darkBlueAxion text-white text-[10px] rounded w-1/2 md:w-auto p-2 gap-1 hover:scale-[1.05] hover:bg-[rgba(13,18,60,0.7)] transition duration-200"
                                onClick={() => redirect(item.url)}
                              >
                                <Image
                                  src="/dashboard/Legal/Details.svg"
                                  width={12}
                                  height={12}
                                  alt=""
                                />
                                Ver Detalhes
                              </button>
                              <span className="text-[10px]">
                                Última atualização:{" "}
                                <strong>
                                  {new Date(item.lastUpdate).toLocaleDateString(
                                    "pt-BR",
                                  )}
                                </strong>
                              </span>
                            </div>
                          </div>
                        ))
                    ) : (
                      <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        Não conseguimos encontrar esses dados.
                      </span>
                    )}
                  </div>

                  <span
                    className={` ${legalData && legalData.legalData.length === 0 ? "hidden" : "flex"} self-center m-auto px-4 py-1 border-[1px] border-darkBlueAxion rounded text-darkBlueAxion hover:bg-gray-20 hover:scale-105 transition duration-200 ease-in-out cursor-pointer`}
                    onClick={() => setShowMoreLegalData(!showMoreLegalData)}
                  >
                    {showMoreLegalData ? "Ver Menos" : "Ver Mais"}
                  </span>
                </div>
              </div>

              <div className=" flex flex-col justify-around bg-white relative xs:p-3 rounded-lg border border-[#c3c3c3] h-auto min-h-[30vh] md:min-h-[45vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                <div className="flex flex-col">
                  <div className="flex">
                    <TitleWithBar content="" barColor="#AB8E63" />
                    <Image
                      src="/dashboard/Legal/ReceitaFederal.svg"
                      width={100}
                      height={70}
                      alt=""
                    />
                    <div
                      className={`${legalData && legalData.legalData.length === 0 ? "hidden" : "flex"} flex flex-col ml-auto text-darkBlueAxion text-[10px] md:text-xs`}
                    >
                      <strong className="text-xs md:text-sm">
                        {legalData && legalData.full_name}
                      </strong>
                      <span>
                        Status: <strong>Regular</strong>
                      </span>
                      <span>
                        Estimativa de Receita Mensal:{" "}
                        <strong>
                          {legalData &&
                            legalData.personalData.length !== 0 &&
                            legalData.personalData[0].estimated_recipe}
                        </strong>
                      </span>
                      <span>
                        Estimativa de Patrimônio Líquido:
                        <strong>
                          {legalData &&
                            legalData.personalData.length !== 0 &&
                            legalData.personalData[0].estimated_patrimony}
                        </strong>
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-around my-4 h-[35vh] overflow-y-scroll">
                    {legalData && legalData.incomeTax.length !== 0 ? (
                      legalData.incomeTax
                        .slice(
                          0,
                          showMoreIncomeTax ? legalData.incomeTax.length : 4,
                        )
                        .map((item: any) => (
                          <div className="flex flex-col items-center p-2 w-[45%] gap-2 justify-between h-auto min-h-16 first:m-0 mb-4 rounded bg-gradient-to-b from-[rgba(3,30,83,0.3)] from-10% via-[rgba(3,30,83,0.5)] via-20% to-darkBlueAxion shadow-sm text-sm">
                            <span className="text-darkBlueAxion">
                              {item.year}
                            </span>
                            <span className="text-white text-center">
                              {item.situation}
                            </span>
                            <span className="text-gray-70">
                              {item.bankAgency}
                            </span>
                          </div>
                        ))
                    ) : (
                      <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        Não conseguimos encontrar esses dados.
                      </span>
                    )}
                  </div>
                </div>

                <span
                  className={` ${legalData && legalData.legalData.length === 0 ? "hidden" : "flex"} self-center m-auto px-4 py-1 border-[1px] border-darkBlueAxion rounded text-darkBlueAxion hover:bg-gray-20 hover:scale-105 transition duration-200 ease-in-out cursor-pointer`}
                  onClick={() => setShowMoreIncomeTax(!showMoreIncomeTax)}
                >
                  {showMoreIncomeTax ? "Ver Menos" : "Ver Mais"}
                </span>
              </div>

              <div className=" flex flex-col justify-around bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] h-auto min-h-[30vh] md:min-h-[45vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                <div className="flex flex-col">
                  <TitleWithBar
                    content="Vínculos Econômicos"
                    barColor="#AB8E63"
                    juridia={true}
                    subTitle
                  />
                  <div className="flex flex-wrap justify-around my-4 h-[35vh] overflow-y-scroll">
                    {legalData &&
                    legalData.economicRelationship.length !== 0 ? (
                      legalData.economicRelationship
                        .slice(
                          0,
                          showMoreEconomicRelationship
                            ? legalData.economicRelationship.length
                            : 4,
                        )
                        .map((item: any) => (
                          <div className="flex flex-col p-2 w-[45%] gap-2 justify-between h-auto min-h-20 first:m-0 mb-4 rounded bg-gradient-to-br from-[#f6f6f6] to-[#c3c3c3] shadow-sm">
                            <div className="flex flex-col items-center">
                              <span className="text-darkBlueAxion text-xs lg:text-sm text-center font-semibold">
                                {item.name}
                              </span>
                              <span className="text-gray-60 text-[10px] lg:text-xs">
                                {maskCnpj(item.cnpj)}
                              </span>
                            </div>
                            {item.relationshipType === "OWNER" ? (
                              <Image
                                src="/dashboard/Legal/formalIcon.svg"
                                width={25}
                                height={25}
                                alt=""
                                className="self-end"
                              />
                            ) : item.relationshipType === "PARNER" ? (
                              <Image
                                src="/dashboard/Legal/dealIcon.svg"
                                width={25}
                                height={25}
                                alt=""
                                className="self-end"
                              />
                            ) : (
                              <Image
                                src="/dashboard/Legal/familyIcon.svg"
                                width={25}
                                height={25}
                                alt=""
                                className="self-end"
                              />
                            )}
                          </div>
                        ))
                    ) : (
                      <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        Não conseguimos encontrar esses dados.
                      </span>
                    )}
                  </div>

                  <span
                    className={` ${legalData && legalData.legalData.length === 0 ? "hidden" : "flex"} self-center m-auto px-4 py-1 border-[1px] border-darkBlueAxion rounded text-darkBlueAxion hover:bg-gray-20 hover:scale-105 transition duration-200 ease-in-out cursor-pointer`}
                    onClick={() =>
                      setShowMoreEconomicRelationship(
                        !showMoreEconomicRelationship,
                      )
                    }
                  >
                    {showMoreEconomicRelationship ? "Ver Menos" : "Ver Mais"}
                  </span>
                </div>
              </div>

              <div className=" flex flex-col justify-around bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] h-auto min-h-[30vh] md:min-h-[45vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                <div className="flex flex-col">
                  <TitleWithBar
                    content="Histórico de Endereços"
                    barColor="#AB8E63"
                    juridia={true}
                    subTitle
                  />
                  <div className="my-4 h-[35vh] overflow-y-scroll">
                    {legalData && legalData.address.length !== 0 ? (
                      legalData.address
                        .slice(
                          0,
                          showMoreAddress ? legalData.address.length : 3,
                        )
                        .map((item: any) => (
                          <div className="flex p-4 w-full gap-2 h-auto min-h-20 first:m-0 mb-4 rounded bg-gradient-to-br from-[#f6f6f6] to-[#c3c3c3] shadow-sm">
                            <Image
                              src="/dashboard/Legal/briefcaseIcon.svg"
                              width={50}
                              height={50}
                              alt=""
                            />
                            <div className="flex flex-col gap-2">
                              <span className="text-sm lg:text-lg font-semibold text-darkBlueAxion">
                                {item.address}
                              </span>
                              <span className="text-darkBlueAxion text-xs lg:text-base">
                                <strong>{item.zipcode} - </strong>
                                {item.city} - {item.state}
                              </span>
                            </div>
                          </div>
                        ))
                    ) : (
                      <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        Não conseguimos encontrar esses dados.
                      </span>
                    )}
                  </div>

                  <span
                    className={` ${legalData && legalData.legalData.length === 0 ? "hidden" : "flex"} self-center m-auto px-4 py-1 border-[1px] border-darkBlueAxion rounded text-darkBlueAxion hover:bg-gray-20 hover:scale-105 transition duration-200 ease-in-out cursor-pointer`}
                    onClick={() => setShowMoreAddress(!showMoreAddress)}
                  >
                    {showMoreAddress ? "Ver Menos" : "Ver Mais"}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="ChartsContainer grid grid-cols-[90%] md:grid-cols-[35rem] xl:grid-cols-[30rem_30rem] 2xl:grid-cols-[35rem_35rem] justify-center items-center gap-12 mt-5">
              {locked && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-gray-60 px-20 py-12 rounded flex flex-col items-center justify-center text-center shadow-2xl">
                  <span className="text-white text-3xl font-bold">
                    Acesso Bloqueado
                  </span>
                  <span className="text-white text-lg">
                    Por favor, entre em contato com o seu administrador
                  </span>
                </div>
              )}
              <div
                className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-gray-60 px-20 py-12 rounded ${!noData && "hidden"} flex flex-col items-center justify-center text-center`}
              >
                <span className="text-white text-3xl font-bold">
                  Coleta em Andamento
                </span>
                <span className="text-white text-lg">
                  Estamos trabalhando para coletar os dados, isto pode demorar
                  um pouco. Tente novamente mais tarde.
                </span>
                <span className="text-white text-sm mt-2">
                  Caso tenha alguma dúvida, entre em contato com o Suporte.
                </span>
              </div>
              <div className=" flex flex-col items-center justify-center bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] h-auto min-h-[30vh] md:min-h-[45vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                <Spinner animation="border" />
              </div>
              <div className=" flex flex-col items-center justify-center bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] h-auto min-h-[30vh] md:min-h-[45vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                <Spinner animation="border" />
              </div>
              <div className=" flex flex-col items-center justify-center bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] h-auto min-h-[30vh] md:min-h-[45vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                <Spinner animation="border" />
              </div>
              <div className=" flex flex-col items-center justify-center bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] h-auto min-h-[30vh] md:min-h-[45vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                <Spinner animation="border" />
              </div>
            </div>
          )}
        </div>
      </RootLayout>
    </main>
  );
}
