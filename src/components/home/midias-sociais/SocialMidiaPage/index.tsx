import { TitleWithBar } from "@/components/Global/TitleWithBar";
import px2vw from "@/utils/size";
import Image from "next/image";
import { useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { ScoreChart } from "../../ScoreChart";
import { SentimentChart } from "../../mencoes/SentimentChart";
import { TotalQuotes } from "../../mencoes/TotalQuotes";
import { AgeGroupByGender } from "../../seu-eleitorado/AgeGroupByGender";
import { VotersInfo } from "../../seu-eleitorado/VoterInfo";
import { ChartTip } from "../ChartTip";
import { CommentComponent } from "../ComentComponent";
import { KeyIndicators } from "../KeyIndicators";
import { OrderSelect } from "../OrderSelect";
import { PostComponent } from "../PostComponent";
import { PostEngagement } from "../PostEngagement";
import { SmallBarChart } from "../SmallBarChart";
import { VotersActive } from "../VotersActive";
import {
  AgeGroupContainer,
  AgeGroupLegend,
  ChartsContainer,
  Comments,
  CommentsContainer,
  CommentsHeader,
  KeyIndicatorsContainer,
  LabelAndSelect,
  MetaAdsCards,
  MetaAdsCardsContainer,
  MetaAdsContainer,
  MetaAdsLogo,
  PageContainer,
  PostEngagmentContainer,
  PostsAndComments,
  PostsContainer,
  PostsHeader,
  ScoreChartContainer,
  SeeMorePosts,
  Tip,
  VotersActiveContainer,
  VotersInfoContainer,
  VotersInfoTitle,
} from "./styles";
import { WordCloudContainer } from "../InitialPage/styles";
import { SimpleWordcloud } from "../WordCloud";

interface Props {
  pageType: "instagram" | "facebook" | "youtube" | "tiktok";
  pageData: any;
  metaads?: any;
  id: string;
  loading: boolean;
  locked?: boolean;
}

export function SocialMidiaPage({
  pageType,
  pageData,
  metaads,
  id,
  loading,
  locked,
}: Props) {
  const [selectedValue, setSelectedValue] = useState("Relevância");
  const values = ["Relevância", "Mais recente"];

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

  const [showModal, setShowModal] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showMoreComments, setShowMoreComments] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const groupGenderConf = [
    {
      dataKey: "Homens",
      color: "#0D123C",
      total:
        metaads && metaads.advertising.length !== 0
          ? metaads?.advertising[selectedIndex].totalByGender[0].value.toFixed(
              0
            )
          : 0,
    },
    {
      dataKey: "Mulheres",
      color: "#E7298A",
      total:
        metaads && metaads.advertising.length !== 0
          ? metaads?.advertising[selectedIndex].totalByGender[1].value.toFixed(
              0
            )
          : 0,
    },
  ];

  const [pieChartData, setPieChartData] = useState<any>([
    {
      region: "Homens",
      percentage: 1,
    },
  ]);

  const [pieChartLabels, setPieChartLabels] = useState<any>([
    14.28, 14.28, 14.28, 14.28, 14.28, 14.28, 14.28,
  ]);

  const openModal = (index: number) => {
    setShowModal(true);
    setSelectedIndex(index);
  };

  return (
    <div className="pageContainer flex flex-col items-center justify-center m-auto p-2">
      {!pageData ? (
        <label className="mt-5 text-3xl">
          {loading ? (
            <Spinner animation="border" />
          ) : (
            `Não encontramos nenhum dado do ${pageType}.`
          )}
        </label>
      ) : (
        <>
          <div className="ChartsContainer grid grid-cols-[90%] md:grid-cols-[35rem] xl:grid-cols-[30rem_30rem] 2xl:grid-cols-[35rem_35rem] justify-center items-center gap-12 mt-5">
            <div className="engagementChartContainer flex flex-col justify-around bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] h-auto min-h-[30vh] md:min-h-[45vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
              <div className="flex flex-col">
                <TitleWithBar
                  content="Engajamento de Publicações"
                  barColor="#12A9E7"
                />
                <PostEngagement pageData={pageData} />
              </div>
            </div>

            <div className="commentsSentimentChartContainer flex flex-col justify-around bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] h-auto min-h-[30vh] md:min-h-[45vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
              <div className="flex flex-col">
                <TitleWithBar
                  content="Sentimento Médio dos Comentários:"
                  barColor="#2F5CFC"
                  subTitle
                />
                {pageData?.commentsStatistics.sentimentStatistics
                  .sentimentAverage !== null ? (
                  <>
                    <ScoreChart
                      id={id}
                      score={Number(
                        pageData?.commentsStatistics.sentimentStatistics.sentimentAverage.toFixed(
                          2
                        )
                      )}
                    />
                    <div className="w-[90%] self-center h-[1px] mt-4 mb-8 bg-gray-60" />
                    <div className="flex items-center justify-center">
                      <SmallBarChart pageData={pageData} />
                    </div>
                  </>
                ) : (
                  <span className="self-center text-2xl mt-5">
                    Nenhum comentário encontrado
                  </span>
                )}
              </div>
            </div>

            <div className="keyIndicatorChartContainer flex flex-col justify-around bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] h-auto min-h-[30vh] md:min-h-[45vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
              <div className="flex flex-col">
                <TitleWithBar
                  content="Indicadores Chave:"
                  barColor="#12A9E7"
                  subTitle
                />
                <ChartTip content="my text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when a..." />
                <KeyIndicators pageData={pageData} />
              </div>
            </div>

            {pageType === "youtube" ? (
              <div className="wordCloudContainer flex flex-col justify-around bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] h-auto min-h-[30vh] md:min-h-[45vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                <div className="flex flex-col">
                  <TitleWithBar
                    barColor="#080E45"
                    content="Nuvem de palavras Geral"
                    subTitle
                  />
                  <ChartTip content="my text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when a..." />
                  <div className="h-[22rem]">
                    <SimpleWordcloud socialMediaData={pageData.wordCloud} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="timeChartContainer chart flex flex-col justify-around bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] h-auto min-h-[30vh] md:min-h-[45vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                <TitleWithBar
                  content="Horário que os Eleitores estão mais Ativos em Sua Rede Social:"
                  barColor="#12A9E7"
                  subTitle
                />
                <div className="h-[19rem]">
                  <VotersActive pageData={pageData} />
                </div>

                <Tip>
                  <img src="/dashboard/userIcon.svg" alt="" />
                  <p>
                    Se quiser ter um maior alcance nas Redes Sociais se atente a
                    estes horários.
                  </p>
                </Tip>
              </div>
            )}

            {id === "comparison" || id === "comparison2" ? (
              <></>
            ) : (
              <>
                <div className="postsContainer flex flex-col justify-around bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] h-auto">
                  <div className="postsHeader flex flex-col gap-12 md:flex-row md:gap-0 justify-between p-4">
                    <TitleWithBar content="Publicações" barColor="#12A9E7" />
                    <div className="labelAndSelect flex items-center gap-4 p-2">
                      <strong>Ordenar por:</strong>
                      <OrderSelect
                        selectedValue={selectedValue}
                        values={values}
                        setSelectedValue={setSelectedValue}
                        id="posts-order-select"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col self-center gap-4 px-3 h-[50vh] overflow-y-auto">
                    {pageData?.posts
                      .slice(0, showMore ? pageData?.posts.length : 4)
                      .map((post: any, index: any) => (
                        <PostComponent
                          index={index}
                          post={post}
                          type={pageType}
                          pageData={pageData}
                          selectedPostId={selectedPostId}
                          setSelectedPostId={setSelectedPostId}
                        />
                      ))}
                  </div>
                  <div className="seeMore flex justify-center mt-4 p-2">
                    <button
                      className="border-0 bg-transparent text-sm font-bold text-black underline"
                      onClick={() => setShowMore(!showMore)}
                    >
                      {showMore ? "Ver Menos" : "Ver Mais"}
                    </button>
                  </div>
                </div>

                <div className="commentsContainer flex flex-col justify-around bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] h-auto">
                  <div className="commentsHeader flex flex-col gap-12 md:flex-row md:gap-0 justify-between p-4">
                    <TitleWithBar content="Comentários" barColor="#12A9E7" />
                    <div className="labelAndSelect flex items-center gap-4 p-2">
                      <strong>Ordenar por:</strong>
                      <OrderSelect
                        selectedValue={selectedValue}
                        values={values}
                        setSelectedValue={setSelectedValue}
                        id="comments-order-select"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col self-center gap-4 px-3 h-[50vh] overflow-y-auto">
                    {selectedPostId === "" ? (
                      <label className="text-black text-center justify-center">
                        Selecione uma publicação
                      </label>
                    ) : pageData.posts.filter(
                        (post: any) => post?.id === selectedPostId
                      )[0].comments.length === 0 ? (
                      <label className="text-black text-center justify-center">
                        Sem comentários
                      </label>
                    ) : (
                      pageData.posts
                        .filter((post: any) => post?.id === selectedPostId)[0]
                        .comments.slice(
                          0,
                          showMoreComments
                            ? pageData.posts.filter(
                                (post: any) => post?.id === selectedPostId
                              )[0].comments.length
                            : 5
                        )
                        .map((comment: any, index: any) => (
                          <CommentComponent type={pageType} comment={comment} />
                        ))
                    )}
                  </div>
                  <div className="seeMore flex justify-center mt-4 p-2">
                    <button
                      className="border-0 bg-transparent text-sm font-bold text-black underline"
                      onClick={() => setShowMoreComments(!showMoreComments)}
                    >
                      {showMore ? "Ver Menos" : "Ver Mais"}
                    </button>
                  </div>
                </div>

                {pageType !== "facebook" ||
                (metaads && metaads.advertising.length === 0) ? (
                  <></>
                ) : (
                  <>
                    {!locked && (
                      <div className="adsContainer flex flex-col justify-around bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] h-auto">
                        <div className="adsHeader flex p-4">
                          <TitleWithBar content="" barColor="#12A9E7" />
                          <Image
                            src="/metaAdsLogo.svg"
                            width={120}
                            height={40}
                            alt=""
                          />
                        </div>
                        <div className="Container flex flex-wrap justify-evenly items-center gap-2">
                          {metaads &&
                            metaads.advertising.map((item: any, index: any) => (
                              <>
                                <div className="Cards flex flex-col rounded border-[0.3px] border-[#0037c1] w-full lg:w-[49%] py-1 px-2">
                                  <div className="flex w-full justify-between">
                                    <div>
                                      <a
                                        className="font-semibold decoration-0 text-sm text-black w-max"
                                        href={`https://www.facebook.com/ads/library/?id=${item.id}`}
                                        target="_blank"
                                        rel="noreferrer"
                                      >
                                        ID do Anúncio:{" "}
                                        <strong>{item.id}</strong>
                                      </a>
                                    </div>
                                    <Image
                                      src={
                                        item.status === "ACTIVE"
                                          ? "/ActiveAd.svg"
                                          : "/InactiveAd.svg"
                                      }
                                      width={50}
                                      height={50}
                                      alt=""
                                    />
                                  </div>
                                  <div className="text-xs">
                                    <label>
                                      {item.end_date !== null
                                        ? "Veiculado Entre: "
                                        : "Início Em: "}
                                    </label>
                                    {""}{" "}
                                    {item.start_date
                                      .split("T")[0]
                                      .split("-")
                                      .reverse()
                                      .join("/")}
                                    {item.end_date && " e "}
                                    {item.end_date &&
                                      item.end_date
                                        .split("T")[0]
                                        .split("-")
                                        .reverse()
                                        .join("/")}
                                  </div>
                                  <label
                                    onClick={() => openModal(index)}
                                    className="self-center p-2 border border-[#0037c1] text-sm rounded"
                                  >
                                    Ver mais Detalhes
                                  </label>
                                </div>
                              </>
                            ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </>
      )}

      {metaads && metaads.advertising.length !== 0 ? (
        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
          <Modal.Body className="flex flex-col w-full self-center gap-6">
            <div className="flex w-full justify-between">
              <div className="flex gap-4">
                <Image
                  src="/BackButton.svg"
                  width={30}
                  height={30}
                  alt=""
                  className="cursor-pointer hover:scale-105 opacity-95 transition duration-100 ease-in-out"
                  onClick={() => setShowModal(false)}
                />
                <TitleWithBar content="" barColor="#12A9E7" />
                <Image src="/metaAdsLogo.svg" width={120} height={40} alt="" />
              </div>
              <div className="self-end w-1/5 h-12 bg-black rounded" />
            </div>
            <div className="mt-5 w-max p-2 text-xs md:text-sm rounded-lg border-[1px] border-[#0037c1]">
              ID do Anúncio: {""}
              <a
                className="font-semibold decoration-0 text-sm md:text-base text-black w-max"
                href="https://www.facebook.com/ads/library/?id=366905246002600"
                target="_blank"
                rel="noreferrer"
              >
                <strong>{metaads?.advertising[selectedIndex].id}</strong>
              </a>
            </div>
            <div className="flex flex-col lg:flex-row w-11/12 self-center items-center justify-between gap-4">
              <div className="w-28 h-28 bg-black rounded" />
              <div className="flex flex-col w-full lg:w-1/2 justify-between gap-2">
                <div className="flex flex-col w-full py-1 px-2 rounded-lg border-[1px] border-[#0037c1]">
                  <label className="text-xs lg:text-sm leading-3 text-black">
                    Pago por
                  </label>
                  <label className="font-semibold text-sm lg:text-base">
                    {metaads?.advertising[selectedIndex].bylines}
                  </label>
                </div>
                <div className="flex flex-col w-full py-1 px-2 rounded-lg border-[1px] border-[#0037c1]">
                  <label className="text-xs lg:text-sm leading-3 text-black">
                    Pago por Valor gasto (aproximado)
                  </label>
                  <label className="font-semibold text-sm lg:text-base">
                    {metaads?.advertising[selectedIndex].spend
                      .toFixed(2)
                      .replace(".", ",")}
                  </label>
                </div>
                <div className="flex flex-col w-full py-1 px-2 rounded-lg border-[1px] border-[#0037c1]">
                  <label className="text-xs lg:text-sm leading-3 text-black">
                    Moeda
                  </label>
                  <label className="font-semibold text-sm lg:text-base">
                    {metaads?.advertising[selectedIndex].currency}
                  </label>
                </div>
              </div>
              <div className="flex flex-col w-2/3 lg:w-1/4 justify-between gap-2">
                <div className="flex flex-col w-full py-1 px-2 rounded-lg border-[1px] border-[#0037c1]">
                  <label className="text-xs lg:text-sm leading-3 text-black">
                    Data de Início
                  </label>
                  <label className="font-semibold text-sm lg:text-base">
                    {metaads?.advertising[selectedIndex].start_date
                      .split("T")[0]
                      .split("-")
                      .reverse()
                      .join("/")}
                  </label>
                </div>
                {metaads?.advertising[selectedIndex].end_date && (
                  <div className="flex flex-col w-full py-1 px-2 rounded-lg border-[1px] border-[#0037c1]">
                    <label className="text-xs lg:text-sm leading-3 text-black">
                      Data de Fim
                    </label>
                    <label className="font-semibold text-sm lg:text-base">
                      {metaads?.advertising[selectedIndex].end_date
                        .split("T")[0]
                        .split("-")
                        .reverse()
                        .join("/")}
                    </label>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col items-center lg:flex-row w-full">
              <TotalQuotes
                title="Média de Impressões"
                type="metaAds"
                value={
                  metaads && metaads?.advertising[selectedIndex].impressions
                }
                firstDate={
                  metaads &&
                  metaads?.advertising[selectedIndex].start_date
                    .split("T")[0]
                    .split("-")
                    .reverse()
                    .join("/")
                }
                lastDate={
                  metaads.advertising[selectedIndex].end_date !== null &&
                  metaads.advertising[selectedIndex].end_date
                    .split("T")[0]
                    .split("-")
                    .reverse()
                    .join("/")
                }
              />

              <SentimentChart
                positive={
                  metaads &&
                  metaads?.advertising[selectedIndex].totalByGender[0].value
                }
                negative={
                  metaads &&
                  metaads?.advertising[selectedIndex].totalByGender[1].value
                }
                neutral={
                  metaads &&
                  metaads?.advertising[selectedIndex].totalByGender[2].value
                }
                title={"Gênero dos espectadores"}
                legend1={"Masculino"}
                legend2={"Feminino"}
                legend3={"Outro"}
              />
            </div>
            <div className="ChartsContainer grid grid-cols-[100%] lg:grid-cols-[1fr_1fr] justify-center items-center gap-12 mt-5">
              <div className="AgeChartContainer flex flex-col justify-around bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] h-auto min-h-[30vh] md:min-h-[45vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                <div className="flex flex-col">
                  <TitleWithBar
                    content="Faixa etária da População por gênero"
                    barColor="#2F5CFC"
                  />
                  <div className="flex gap-2 m-auto">
                    {metaads &&
                      metaads?.advertising[selectedIndex].totalByGender.map(
                        (item: any) => (
                          <div className="flex flex-col">
                            <div className="flex items-center gap-1">
                              <div
                                className={`w-4 h-4 ${item.name === "Homens" ? "bg-darkBlueAxion" : item.name === "Mulheres" ? "bg-purpleAxion" : "bg-[#E5E8F0]"} rounded-full`}
                              />
                              <span className="text-darkBlueAxion font-semibold">
                                {item.value.toFixed(0)}
                              </span>
                            </div>
                            <span className="text-xs text-gray-50">
                              {item.name}
                            </span>
                          </div>
                        )
                      )}
                  </div>
                </div>
                <div className="flex chart w-80 h-60 self-center">
                  <AgeGroupByGender
                    data={
                      metaads &&
                      metaads?.advertising[selectedIndex].totalByAgeRange
                    }
                    conf={groupGenderConf}
                  />
                </div>
              </div>

              <div className="statesChartContainer flex flex-col justify-around bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] h-auto min-h-[30vh] md:min-h-[45vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                <div className="flex flex-col">
                  <TitleWithBar
                    barColor="#2F5CFC"
                    content={"Estados que foram Veiculados"}
                  />
                </div>
                <div className="chart">
                  <VotersInfo
                    chartData={
                      metaads &&
                      metaads?.advertising[selectedIndex].deliveryRegion.map(
                        (item: any) => Number(item.percentage)
                      )
                    }
                    labels={
                      metaads &&
                      metaads?.advertising[0].deliveryRegion.map(
                        (item: any) => item.region
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      ) : (
        <></>
      )}
    </div>
  );
}
