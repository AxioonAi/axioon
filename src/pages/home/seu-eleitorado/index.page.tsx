import { TitleWithBar } from "@/components/Global/TitleWithBar";
import RootLayout from "@/components/Layout";
import { HeaderComponent } from "@/components/home/Header";
import { GoogleMaps } from "@/components/home/Maps/GoogleMaps";
import { GoogleMapsWrapper } from "@/components/home/Maps/GoogleMapsWrapper";
import { AgeGroupByGender } from "@/components/home/seu-eleitorado/AgeGroupByGender";
import { SeuEleitoradoCards } from "@/components/home/seu-eleitorado/Cards";
import { VotersInfo } from "@/components/home/seu-eleitorado/VoterInfo";
import { VotersGender } from "@/components/home/seu-eleitorado/VotersGender";
import { VotersInfoSelect } from "@/components/home/seu-eleitorado/VotersInfoSelect";
import gsap from "gsap";
import { useRouter } from "next/router";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  AgeGroupContainer,
  AgeGroupLegend,
  ChartsContainer,
  Content,
  Main,
  MapContainer,
  VotersGenderContainer,
  VotersInfoContainer,
  VotersInfoTitle,
} from "./styles";
import { authGetAPI, loginVerifyAPI } from "@/lib/axios";
import { Spinner } from "react-bootstrap";

export default function SeuEleitorado() {
  const router = useRouter();

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

  const locations = [
    {
      lat: -12.6321605,
      lng: -61.2228397,
    },
  ];

  const [selectedProfile, setSelectedProfile] = useState({
    name: "",
    politicalGroup: "",
    id: "",
  });

  const [cityData, setCityData] = useState<any>();

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
      total: cityData?.population.male,
    },
    {
      dataKey: "Mulheres",
      color: "#E7298A",
      total: cityData?.population.female,
    },
  ];

  const [selectedVoterOption, setSelectedVoterOption] = useState("education");
  const [selectedVoterLabels, setSelectedVoterLabels] = useState([""]);
  const [locked, setLocked] = useState(true);

  useEffect(() => {
    if (selectedProfile.id) {
      getCityDetails();
      if (selectedVoterOption === "age") {
        null;
      } else if (selectedVoterOption === "gender") {
        setSelectedVoterLabels(["Homens", "Mulheres"]);
      } else if (selectedVoterOption === "education") {
        setSelectedVoterLabels([
          "Ensino Médio Incompleto",
          "Não Informado",
          "Ensino Médio Completo",
          "Ensino Fundamental Completo",
          "Analfabeto",
          "Sabe Ler e Escrever",
          "Ensino Fundamental Incompleto",
        ]);
      }
    }
  }, [selectedProfile, selectedVoterOption]);

  const selectVotersValue = ["education", "gender", "age"];

  useEffect(() => {
    if (router.pathname === "/") {
      router.push("/home/seu-eleitorado");
    }
  }, []);

  return (
    <main ref={main}>
      <RootLayout fadeOut={() => fadeOut()}>
        <Content className="mainContent" ref={content} style={{ opacity: 1 }}>
          <HeaderComponent
            fadeOut={() => fadeOut()}
            selectedProfile={selectedProfile}
            setSelectedProfile={setSelectedProfile}
            selectedPage={"seu-eleitorado"}
          />
          <Main>
            {locked ? (
              <span className="text-xl self-center text-center">
                O plano ativo na sua conta não permite acesso a estas
                informações.
              </span>
            ) : cityData ? (
              <>
                <SeuEleitoradoCards cityData={cityData} />
                <ChartsContainer>
                  <AgeGroupContainer>
                    <VotersInfoTitle>
                      <TitleWithBar
                        content="Faixa etária da População por gênero"
                        barColor="#2F5CFC"
                        width={"16rem"}
                        className="title"
                      />
                      <AgeGroupLegend>
                        {groupGenderConf.map((item) => {
                          return (
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <div
                                key={item.dataKey}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "0.5rem",
                                }}
                              >
                                <div
                                  style={{
                                    width: "0.625rem",
                                    height: "0.625rem",
                                    borderRadius: "50%",
                                    backgroundColor: item.color,
                                  }}
                                />
                                <strong style={{ lineHeight: 1 }}>
                                  {item.total}
                                </strong>
                              </div>
                              <span
                                style={{
                                  fontSize: "0.625rem",
                                  color: "#8790AB",
                                }}
                              >
                                {item.dataKey}
                              </span>
                            </div>
                          );
                        })}
                      </AgeGroupLegend>
                    </VotersInfoTitle>
                    <div className="chart">
                      <AgeGroupByGender
                        data={cityData.population.ageRange}
                        conf={groupGenderConf}
                      />
                    </div>
                  </AgeGroupContainer>

                  <VotersInfoContainer>
                    <div className="title">
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
                      <div className="select">
                        <VotersInfoSelect
                          selectedValue={selectedVoterOption}
                          setSelectedValue={setSelectedVoterOption}
                          values={selectVotersValue}
                        />
                      </div>
                    </div>
                    <div className="chart">
                      <VotersInfo
                        chartData={
                          selectedVoterOption === "age"
                            ? cityData.electorate.ageRange.map(
                                (item: any) => item.value
                              )
                            : selectedVoterOption === "gender"
                              ? cityData.electorate.gender.map(
                                  (item: any) => item.value
                                )
                              : cityData.electorate.schoolLevel.map(
                                  (item: any) => item.value
                                )
                        }
                        labels={
                          selectedVoterOption === "age"
                            ? cityData.electorate.ageRange.map(
                                (item: any) => item.name
                              )
                            : selectedVoterOption === "gender"
                              ? cityData.electorate.gender.map(
                                  (item: any) => item.name
                                )
                              : cityData.electorate.schoolLevel.map(
                                  (item: any) => item.name
                                )
                        }
                      />
                    </div>
                  </VotersInfoContainer>
                  <MapContainer>
                    <GoogleMapsWrapper>
                      <GoogleMaps mapId="map_id" locations={locations} />
                    </GoogleMapsWrapper>
                  </MapContainer>
                  <VotersGenderContainer>
                    <div className="title">
                      <TitleWithBar
                        content="Gêneros dos Eleitores"
                        barColor="#2F5CFC"
                      />
                    </div>
                    <VotersGender population={cityData.population} />
                  </VotersGenderContainer>
                </ChartsContainer>
              </>
            ) : (
              <>
                <Spinner animation="border" />
              </>
            )}
          </Main>
        </Content>
      </RootLayout>
    </main>
  );
}
