import { TitleWithBar } from "@/components/Global/TitleWithBar";
import RootLayout from "@/components/Layout";
import { HeaderComponent } from "@/components/home/Header";
import { GoogleMaps } from "@/components/home/Maps/GoogleMaps";
import { GoogleMapsWrapper } from "@/components/home/Maps/GoogleMapsWrapper";
import { ChartTip } from "@/components/home/midias-sociais/ChartTip";
import { AgeGroupByGender } from "@/components/home/seu-eleitorado/AgeGroupByGender";
import { SeuEleitoradoCards } from "@/components/home/seu-eleitorado/Cards";
import { VotersInfo } from "@/components/home/seu-eleitorado/VoterInfo";
import { VotersGender } from "@/components/home/seu-eleitorado/VotersGender";
import { VotersInfoSelect } from "@/components/home/seu-eleitorado/VotersInfoSelect";
import { authGetAPI } from "@/lib/axios";
import axios from "axios";
import gsap from "gsap";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Spinner } from "react-bootstrap";

export default function SeuEleitorado() {
  const router = useRouter();

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

  const locations = [
    {
      lat: -12.6321605,
      lng: -61.2228397,
    },
  ];

  const [selectedProfile, setSelectedProfile] = useState({
    name: "Carregando...",
    politicalGroup: "",
    id: "",
    image: "",
    campaignNumber: 0,
  });

  const [cityData, setCityData] = useState<any>();
  const [cityCoord, setCityCoord] = useState([
    {
      lat: 0,
      lng: 0,
    },
  ]);

  async function getCityDetails() {
    const connect = await authGetAPI(`/profile/city/${selectedProfile.id}`);
    if (connect.status === 401) {
      return setLocked(true);
    }
    setLocked(false);
    if (connect.status !== 200) {
      return alert(connect.body);
    }
    setCityData(connect.body.city);
  }

  const groupGenderConf = [
    {
      dataKey: "Homens",
      color: "#0D123C",
      total: cityData && cityData.population.male,
    },
    {
      dataKey: "Mulheres",
      color: "#E7298A",
      total: cityData && cityData.population.female,
    },
  ];

  const [selectedVoterOption, setSelectedVoterOption] = useState("education");
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    if (selectedProfile.id) {
      setCityData(undefined);
      getCityDetails();
    }
  }, [selectedProfile]);

  const selectVotersValue = [
    { value: "age", label: "Idade" },
    { value: "gender", label: "Sexo" },
    { value: "education", label: "Escolaridade" },
  ];

  useEffect(() => {
    if (router.pathname === "/") {
      router.push("/home/seu-eleitorado");
    }
  }, []);

  const test = async () => {
    if (cityData) {
      const url = "/api/maps";
      axios
        .get(`${url}?city=${cityData.name}&state=${cityData.state}`)
        .then((res) => {
          setCityCoord([
            {
              lat: res.data.results[0].geometry.location.lat,
              lng: res.data.results[0].geometry.location.lng,
            },
          ]);
        })
        .catch((err) => alert(err));
    }
  };

  useEffect(() => {
    if (cityData) {
      test();
    }
  }, [cityData]);

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
            selectedPage={"seu-eleitorado"}
          />
          <main className="Main m-0 rounded-lg md:m-2">
            {cityData ? (
              <>
                <SeuEleitoradoCards cityData={cityData} />
                <div className="ChartsContainer grid grid-cols-[90%] md:grid-cols-[35rem] xl:grid-cols-[30rem_30rem] 2xl:grid-cols-[35rem_35rem] justify-center items-center gap-12 mt-5">
                  <div className="AgeChartContainer flex flex-col justify-around bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] h-auto min-h-[30vh] md:min-h-[45vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                    <div className="flex flex-col">
                      <TitleWithBar
                        content="Faixa etária da População por gênero"
                        barColor="#2F5CFC"
                      />
                      <ChartTip content="Este gráfico mostra a faixa etária da População por gênero." />
                      <div className="flex gap-2 m-auto">
                        {cityData !== undefined ? (
                          <>
                            <div className="flex flex-col">
                              <div className="flex items-center gap-1">
                                <div className="w-4 h-4 bg-darkBlueAxion rounded-full" />
                                <span className="text-darkBlueAxion font-semibold">
                                  {cityData.population.male.toString().length >
                                  6
                                    ? `${(cityData.population.male / 1000000).toFixed(1)}M`
                                    : cityData.population.male.toString()
                                          .length <= 6 &&
                                        cityData.population.male.toString()
                                          .length > 3
                                      ? `${(cityData.population.male / 1000).toFixed(1)}K`
                                      : cityData.population.male}
                                </span>
                              </div>
                              <span className="text-xs text-gray-50">
                                Homens
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <div className="flex items-center gap-1">
                                <div className="w-4 h-4 bg-[#E7298A] rounded-full" />
                                <span className="text-darkBlueAxion font-semibold">
                                  {cityData.population.female.toString()
                                    .length > 6
                                    ? `${(cityData.population.female / 1000000).toFixed(1)}M`
                                    : cityData.population.female.toString()
                                          .length <= 6 &&
                                        cityData.population.female.toString()
                                          .length > 3
                                      ? `${(cityData.population.female / 1000).toFixed(1)}K`
                                      : cityData.population.female}
                                </span>
                              </div>
                              <span className="text-xs text-gray-50">
                                Mulheres
                              </span>
                            </div>
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                    <div className="flex chart w-80 h-60 self-center">
                      <AgeGroupByGender
                        data={cityData.population.ageRange}
                        conf={groupGenderConf}
                      />
                    </div>
                  </div>

                  <div className="pieChartContainer flex flex-col gap-2 justify-around bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] h-auto min-h-[30vh] md:min-h-[45vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                    <div className="flex flex-col  w-full">
                      <TitleWithBar
                        barColor="#2F5CFC"
                        content={
                          selectedVoterOption === "education"
                            ? "Escolaridade dos Eleitores"
                            : selectedVoterOption === "age"
                              ? "Idade dos Eleitores"
                              : "Gênero dos Eleitores"
                        }
                      />

                      <VotersInfoSelect
                        selectedValue={selectedVoterOption}
                        setSelectedValue={setSelectedVoterOption}
                        values={selectVotersValue}
                      />
                      <ChartTip content="Escolha o tipo de informação que deseja pelo seletor ao lado. Este gráfico mostra o nível de escolaridade, idade e gênero dos eleitores em porcentagens." />
                    </div>
                    <div className="flex chart w-full h-full justify-center self-center">
                      <VotersInfo
                        chartData={
                          selectedVoterOption === "age"
                            ? cityData.electorate.ageRange.map(
                                (item: any) => item.value,
                              )
                            : selectedVoterOption === "gender"
                              ? cityData.electorate.gender.map(
                                  (item: any) => item.value,
                                )
                              : cityData.electorate.schoolLevel.map(
                                  (item: any) => item.value,
                                )
                        }
                        labels={
                          selectedVoterOption === "age"
                            ? cityData.electorate.ageRange.map(
                                (item: any) => item.name,
                              )
                            : selectedVoterOption === "gender"
                              ? cityData.electorate.gender.map(
                                  (item: any) => item.name,
                                )
                              : cityData.electorate.schoolLevel.map(
                                  (item: any) => item.name,
                                )
                        }
                      />
                    </div>
                  </div>

                  <div className="mapContainer flex flex-col justify-around bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] w-full md:w-[35rem] h-[24rem] xl:w-[30rem] 2xl:w-[35rem] min-h-[30vh] md:min-h-[45vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                    <GoogleMapsWrapper>
                      <GoogleMaps mapId="map_id" locations={cityCoord} />
                    </GoogleMapsWrapper>
                  </div>

                  <div className="genderChartContainer flex flex-col justify-around bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] h-auto min-h-[30vh] md:min-h-[45vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                    <div className="flex flex-col">
                      <TitleWithBar
                        content="Gêneros dos Eleitores"
                        barColor="#2F5CFC"
                      />
                      <ChartTip content="Este gráfico o balanço dos gêneros dos eleitores em relação com a população total." />
                    </div>
                    <VotersGender population={cityData.population} />
                  </div>
                </div>
              </>
            ) : (
              <>
                <SeuEleitoradoCards cityData={cityData} />
                <div className="flex w-full h-full justify-center items-center shadow-2xl">
                  {locked && (
                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-gray-60 px-20 py-12 rounded flex flex-col items-center justify-center text-center">
                      <span className="text-white text-3xl font-bold">
                        Acesso Bloqueado
                      </span>
                      <span className="text-white text-lg">
                        Por favor, entre em contato com o seu administrador
                      </span>
                    </div>
                  )}

                  <div className=" grid grid-cols-[90%] md:grid-cols-[35rem] xl:grid-cols-[30rem_30rem] 2xl:grid-cols-[35rem_35rem] justify-center items-center gap-12 mt-5">
                    <div className="AgeChartContainer flex flex-col justify-center items-center bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] h-auto min-h-[30vh] md:min-h-[45vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                      <Spinner animation="border" />
                    </div>
                    <div className="AgeChartContainer flex flex-col justify-center items-center bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] h-auto min-h-[30vh] md:min-h-[45vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                      <Spinner animation="border" />
                    </div>
                    <div className="AgeChartContainer flex flex-col justify-center items-center bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] h-auto min-h-[30vh] md:min-h-[45vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                      <Spinner animation="border" />
                    </div>
                    <div className="AgeChartContainer flex flex-col justify-center items-center bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] h-auto min-h-[30vh] md:min-h-[45vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                      <Spinner animation="border" />
                    </div>
                  </div>
                </div>
              </>
            )}
          </main>
        </div>
      </RootLayout>
    </main>
  );
}
