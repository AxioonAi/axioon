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

export default function SeuEleitorado() {
  const router = useRouter();

  const [selectedVoterOption, setSelectedVoterOption] = useState("education");
  const [selectedVoterLabels, setSelectedVoterLabels] = useState([""]);

  useEffect(() => {
    if (selectedVoterOption === "age") {
      setSelectedVoterLabels([
        "16-18",
        "19-29",
        "30-40",
        "41-50",
        "51-60",
        "61-70",
        "+70",
      ]);
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
  }, [selectedVoterOption]);

  const selectVotersValue = ["education", "gender", "age"];

  useEffect(() => {
    if (router.pathname === "/") {
      router.push("/home/seu-eleitorado");
    }
  }, []);

  const groupGenderData = [
    {
      name: "16-18",
      Homens: 590,
      Mulheres: 800,
    },
    {
      name: "19-29",
      Homens: 868,
      Mulheres: 967,
    },
    {
      name: "30-40",
      Homens: 1397,
      Mulheres: 1098,
    },
    {
      name: "41-50",
      Homens: 1480,
      Mulheres: 1200,
    },
    {
      name: "51-60",
      Homens: 1520,
      Mulheres: 1108,
    },
    {
      name: "61-70",
      Homens: 1400,
      Mulheres: 680,
    },
    {
      name: "+70",
      Homens: 250,
      Mulheres: 500,
    },
  ];

  const total = {
    homens: groupGenderData.reduce((acc, curr) => acc + curr.Homens, 0),
    mulheres: groupGenderData.reduce((acc, curr) => acc + curr.Mulheres, 0),
  };

  const groupGenderConf = [
    {
      dataKey: "Homens",
      color: "#0D123C",
      total: total.homens,
    },
    {
      dataKey: "Mulheres",
      color: "#E7298A",
      total: total.mulheres,
    },
  ];

  const votersInfoData = {
    education: [100, 100, 100, 100, 100, 100, 100],
    gender: [100, 250],
    age: [100, 100, 100, 100, 100, 100, 100],
  };

  const [selectedData, setSelectedData] = useState<any>([]);

  useEffect(() => {
    if (selectedVoterOption === "education") {
      setSelectedData(votersInfoData.education);
    } else if (selectedVoterOption === "gender") {
      setSelectedData(votersInfoData.gender);
    } else if (selectedVoterOption === "age") {
      setSelectedData(votersInfoData.age);
    }
  }, [selectedVoterOption]);

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

  return (
    <main ref={main}>
      <RootLayout fadeOut={() => fadeOut()}>
        <Content className="mainContent" ref={content} style={{ opacity: 1 }}>
          <HeaderComponent fadeOut={() => fadeOut()} />
          <Main>
            <SeuEleitoradoCards />
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
                          style={{ display: "flex", flexDirection: "column" }}
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
                            style={{ fontSize: "0.625rem", color: "#8790AB" }}
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
                    data={groupGenderData}
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
                        : "Idade dos Eleitores"
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
                    chartData={selectedData}
                    labels={selectedVoterLabels}
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
                <VotersGender />
              </VotersGenderContainer>
            </ChartsContainer>
          </Main> 
        </Content> 
      </RootLayout>
    </main>
  );
}
