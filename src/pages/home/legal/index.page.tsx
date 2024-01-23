import RootLayout from "@/components/Layout";
import { useRouter } from "next/router";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { HeaderComponent } from "@/components/home/Header";
import { TitleWithBar } from "@/components/Global/TitleWithBar";
import Image from "next/image";
import { Spinner } from "react-bootstrap";

export default function Legal() {
  const main = useRef(null);
  const content = useRef(null);

  useLayoutEffect(() => {
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

  const [showMore, setShowMore] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState({
    name: "Carregando...",
    politicalGroup: "",
    id: "",
  });
  const [selectedTimeValues, setSelectedTimeValues] = useState({
    value: 7,
    name: "Últimos 7 Dias",
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

  const [legalData, setLegalData] = useState(false);
  const [locked, setLocked] = useState(true);

  const array = [1, 2, 3, 4, 5];

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
          {legalData ? (
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
                    {array.slice(0, showMore ? array.length : 3).map((item) => (
                      <div className="flex flex-col p-2 w-full gap-2 justify-between h-auto min-h-20 first:m-0 mb-4 rounded bg-gradient-to-br from-[#f6f6f6] to-[#c3c3c3] shadow-sm">
                        <div className="flex flex-col lg:flex-row w-full gap-2">
                          <div className="flex flex-row lg:flex-col">
                            <Image
                              src="/dashboard/Legal/Papers.svg"
                              width={25}
                              height={25}
                              alt=""
                            />
                            <div className="flex flex-col self-center">
                              <span className="text-darkBlueAxion font-semibold">
                                Prestação de Contas
                              </span>
                              <span className="text-xs text-gray-60 font-light leading-3">
                                055ª ZONA ELEITORAL DE CUIABÁ MT
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center lg:ml-auto w-40 h-6 border-[1px] border-darkBlueAxion rounded bg-green-60">
                            <Image
                              src="/dashboard/Legal/Checked.svg"
                              width={20}
                              height={20}
                              alt=""
                            />
                            <span className="text-white font-semibold text-xs">
                              Processo Trânsito Ativo
                            </span>
                          </div>
                        </div>
                        <div className="flex w-full gap-2 justify-between">
                          <span className="text-[10px]">
                            Data de Início: <strong>10/01/2024</strong>
                          </span>
                          <button className="flex items-center justify-center bg-darkBlueAxion text-white text-[10px] rounded w-1/2 md:w-auto p-2 gap-1">
                            <Image
                              src="/dashboard/Legal/Details.svg"
                              width={12}
                              height={12}
                              alt=""
                            />
                            Ver Detalhes
                          </button>
                          <span className="text-[10px]">
                            Última atualização: <strong>10/01/2024</strong>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <span
                    className="self-center m-auto px-4 py-1 border-[1px] border-darkBlueAxion rounded text-darkBlueAxion hover:bg-gray-20 hover:scale-105 transition duration-200 ease-in-out cursor-pointer"
                    onClick={() => setShowMore(!showMore)}
                  >
                    {showMore ? "Ver Menos" : "Ver Mais"}
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
                    <div className="flex flex-col ml-auto text-darkBlueAxion text-[10px] md:text-xs">
                      <strong className="text-xs md:text-sm">
                        Luis Inácio Lula da Silva
                      </strong>
                      <span>
                        Status: <strong>Regular</strong>
                      </span>
                      <span>
                        Estimativa de Receita Mensal:{" "}
                        <strong>Acima de 20MM</strong>
                      </span>
                      <span>
                        Estimativa de Patrimônio Líquido:
                        <strong>1 a 5MM</strong>
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-around my-4 h-[35vh] overflow-y-scroll">
                    {array.slice(0, showMore ? array.length : 4).map((item) => (
                      <div className="flex flex-col items-center p-2 w-[45%] gap-2 justify-between h-auto min-h-16 first:m-0 mb-4 rounded bg-gradient-to-b from-[rgba(3,30,83,0.3)] from-10% via-[rgba(3,30,83,0.5)] via-20% to-darkBlueAxion shadow-sm text-sm">
                        <span className="text-darkBlueAxion">2018</span>
                        <span className="text-white text-center">
                          Saldo inexistente de imposto a pagar ou restituir
                        </span>
                        <span className="text-gray-70">Banco do Brasil</span>
                      </div>
                    ))}
                  </div>
                </div>

                <span
                  className="self-center m-auto px-4 py-1 border-[1px] border-darkBlueAxion rounded text-darkBlueAxion hover:bg-gray-20 hover:scale-105 transition duration-200 ease-in-out cursor-pointer"
                  onClick={() => setShowMore(!showMore)}
                >
                  {showMore ? "Ver Menos" : "Ver Mais"}
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
                    {array.slice(0, showMore ? array.length : 4).map((item) => (
                      <div className="flex flex-col p-2 w-[45%] gap-2 justify-between h-auto min-h-20 first:m-0 mb-4 rounded bg-gradient-to-br from-[#f6f6f6] to-[#c3c3c3] shadow-sm">
                        <div className="flex flex-col items-center">
                          <span className="text-darkBlueAxion text-xs lg:text-sm text-center font-semibold">
                            L.I.L.S.PALESTRAS, EVENTOS E PUBLICACOES LTDA.
                          </span>
                          <span className="text-gray-60 text-[10px] lg:text-xs">
                            13.427.330/0001-00
                          </span>
                        </div>
                        <Image
                          src="/dashboard/Legal/dealIcon.svg"
                          width={25}
                          height={25}
                          alt=""
                          className="self-end"
                        />
                      </div>
                    ))}
                  </div>

                  <span
                    className="self-center m-auto px-4 py-1 border-[1px] border-darkBlueAxion rounded text-darkBlueAxion hover:bg-gray-20 hover:scale-105 transition duration-200 ease-in-out cursor-pointer"
                    onClick={() => setShowMore(!showMore)}
                  >
                    {showMore ? "Ver Menos" : "Ver Mais"}
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
                    {array.slice(0, showMore ? array.length : 3).map((item) => (
                      <div className="flex p-4 w-full gap-2 h-auto min-h-20 first:m-0 mb-4 rounded bg-gradient-to-br from-[#f6f6f6] to-[#c3c3c3] shadow-sm">
                        <Image
                          src="/dashboard/Legal/briefcaseIcon.svg"
                          width={50}
                          height={50}
                          alt=""
                        />
                        <div className="flex flex-col gap-2">
                          <span className="text-sm lg:text-lg font-semibold text-darkBlueAxion">
                            Rua Tadeo Gaddi - Jardim Imbe
                          </span>
                          <span className="text-darkBlueAxion text-xs lg:text-base">
                            <strong>05863-770 - </strong>
                            São Paulo - SP
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <span
                    className="self-center m-auto px-4 py-1 border-[1px] border-darkBlueAxion rounded text-darkBlueAxion hover:bg-gray-20 hover:scale-105 transition duration-200 ease-in-out cursor-pointer"
                    onClick={() => setShowMore(!showMore)}
                  >
                    {showMore ? "Ver Menos" : "Ver Mais"}
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
