import { TitleWithBar } from "@/components/Global/TitleWithBar";
import px2vw from "@/utils/size";
import Image from "next/image";
import { useState } from "react";
import { Modal } from "react-bootstrap";
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
}

export function SocialMidiaPage({ pageType, pageData, metaads, id }: Props) {
  const [selectedValue, setSelectedValue] = useState("Relevância");
  const values = ["Relevância", "Mais recente"];

  const ads = [
    {
      id: 1,
      active: true,
    },
    {
      id: 2,
      active: false,
    },
    {
      id: 3,
      active: false,
    },
    {
      id: 4,
      active: true,
    },
  ];

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

  const [pieChartData, setPieChartData] = useState<any>([
    100, 100, 100, 100, 100, 100, 100,
  ]);

  const [pieChartLabels, setPieChartLabels] = useState<any>([
    14.28, 14.28, 14.28, 14.28, 14.28, 14.28, 14.28,
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showMoreComments, setShowMoreComments] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState("");

  return (
    <PageContainer>
      {!pageData ? (
        <label className="mt-5 text-3xl">
          Não encontramos nenhum dado do {pageType}.
        </label>
      ) : (
        <>
          <ChartsContainer>
            <PostEngagmentContainer>
              <TitleWithBar
                content="Engajamento de Publicações"
                barColor="#12A9E7"
                className="mb-4 title"
              />
              <PostEngagement pageData={pageData} />
            </PostEngagmentContainer>

            <ScoreChartContainer>
              <TitleWithBar
                content="Sentimento Médio dos Comentários:"
                barColor="#2F5CFC"
                subTitle
                className="title"
              />
              <div
                className="mb-5"
                style={{
                  marginTop: "3rem",
                  height: "100px",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ScoreChart
                  id={id}
                  score={Number(
                    pageData?.commentsStatistics.sentimentStatistics.sentimentAverage.toFixed(
                      2
                    )
                  )}
                />
              </div>
              <div
                style={{
                  width: "90%",
                  borderTop: "1px solid #000000",
                  margin: "0 auto",
                }}
              />
              <div className="p-5">
                <SmallBarChart pageData={pageData} />
              </div>
            </ScoreChartContainer>

            <KeyIndicatorsContainer>
              <TitleWithBar
                content="Indicadores Chave:"
                barColor="#12A9E7"
                subTitle
              />
              <ChartTip content="my text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when a..." />
              <KeyIndicators pageData={pageData} />
            </KeyIndicatorsContainer>

            {pageType === "youtube" ? (
              <WordCloudContainer>
                <div className="title">
                  <TitleWithBar
                    barColor="#080E45"
                    content="Nuvem de palavras Geral"
                    subTitle
                    className="mb-3"
                  />
                </div>
                <ChartTip content="my text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when a..." />
                <SimpleWordcloud />
              </WordCloudContainer>
            ) : (
              <VotersActiveContainer>
                <TitleWithBar
                  content="Horário que os Eleitores estão mais Ativos em Sua Rede Social:"
                  barColor="#12A9E7"
                  subTitle
                />
                <div className="chart">
                  <VotersActive pageData={pageData} />
                </div>

                <Tip>
                  <img src="/dashboard/userIcon.svg" alt="" />
                  <p>
                    Se quiser ter um maior alcance nas Redes Sociais se atente a
                    estes horários.
                  </p>
                </Tip>
              </VotersActiveContainer>
            )}
          </ChartsContainer>

          {id === "comparison" || id === "comparison2" ? (
            <></>
          ) : (
            <>
              <PostsAndComments>
                <PostsContainer>
                  <PostsHeader>
                    <TitleWithBar content="Publicações" barColor="#12A9E7" />
                    <LabelAndSelect>
                      <strong
                        onClick={() =>
                          document.getElementById("posts-order-select")?.focus()
                        }
                      >
                        Ordenar por:
                      </strong>
                      <OrderSelect
                        selectedValue={selectedValue}
                        values={values}
                        setSelectedValue={setSelectedValue}
                        id="posts-order-select"
                      />
                    </LabelAndSelect>
                  </PostsHeader>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignSelf: "center",
                      gap: "1rem",
                      padding: "0 0.875rem",
                      height: "70vh",
                      overflow: "scroll",
                    }}
                  >
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
                  <SeeMorePosts>
                    <button onClick={() => setShowMore(!showMore)}>
                      {showMore ? "Ver Menos" : "Ver Mais"}
                    </button>
                  </SeeMorePosts>
                </PostsContainer>

                <CommentsContainer>
                  <CommentsHeader>
                    <TitleWithBar content="Comentários" barColor="#12A9E7" />
                    <LabelAndSelect>
                      <strong
                        onClick={() =>
                          document.getElementById("posts-order-select")?.focus()
                        }
                      >
                        Ordenar por:
                      </strong>
                      <OrderSelect
                        selectedValue={selectedValue}
                        values={values}
                        setSelectedValue={setSelectedValue}
                        id="posts-order-select"
                      />
                    </LabelAndSelect>
                  </CommentsHeader>
                  <Comments>
                    {selectedPostId === "" ? (
                      <label className="text-black text-center justify-center">
                        Selecione uma publicação
                      </label>
                    ) : (
                      pageData?.posts.map(
                        (post: any, index: any) =>
                          post.id === selectedPostId &&
                          post.comments
                            .slice(
                              0,
                              showMoreComments ? post.comments.length : 5
                            )
                            .map((comment: any, index: any) => (
                              <CommentComponent
                                type={pageType}
                                comment={comment}
                              />
                            ))
                      )
                    )}
                  </Comments>
                  {selectedPostId === "" ? (
                    <></>
                  ) : (
                    <SeeMorePosts>
                      <button
                        onClick={() => setShowMoreComments(!showMoreComments)}
                      >
                        {showMoreComments ? "Ver Menos" : "Ver Mais"}
                      </button>
                    </SeeMorePosts>
                  )}
                </CommentsContainer>
              </PostsAndComments>
              {pageType !== "facebook" ? (
                <></>
              ) : (
                <>
                  <MetaAdsContainer>
                    <TitleWithBar
                      content=""
                      barColor="#12A9E7"
                      className="mb-4 title"
                    />
                    <MetaAdsLogo
                      src="/metaAdsLogo.svg"
                      width={200}
                      height={40}
                      alt=""
                    />
                    <MetaAdsCardsContainer>
                      {ads.map((item, index) => (
                        <MetaAdsCards>
                          <div
                            style={{
                              display: "flex",
                              width: "100%",
                              justifyContent: "space-between",
                            }}
                          >
                            <div>
                              <a
                                style={{
                                  fontWeight: "semibold",
                                  fontSize: 16,
                                  textDecoration: "none",
                                  color: "black",
                                  width: "max-content",
                                }}
                                href="https://www.facebook.com/ads/library/?id=366905246002600"
                                target="_blank"
                                rel="noreferrer"
                              >
                                ID do Anúncio: <strong>366905246002600</strong>
                              </a>
                            </div>
                            <img
                              src={
                                item.active === true
                                  ? "/ActiveAd.svg"
                                  : "/InactiveAd.svg"
                              }
                              alt=""
                            />
                          </div>
                          <div style={{ fontSize: 14 }}>
                            <label>Veiculado Entre:</label>
                            <label style={{ marginLeft: "2%" }}>
                              25/01/2022 e 25/02/2022
                            </label>
                          </div>
                          <label
                            onClick={() => setShowModal(true)}
                            style={{
                              alignSelf: "center",
                              padding: "5px 10px",
                              border: "1px solid #0037c1",
                              borderRadius: 10,
                              margin: "2% 0",
                            }}
                          >
                            Ver mais Detalhes
                          </label>
                        </MetaAdsCards>
                      ))}
                    </MetaAdsCardsContainer>
                  </MetaAdsContainer>
                </>
              )}
            </>
          )}
          <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
            <Modal.Body
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                alignSelf: "center",
                gap: "1.4rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                <Image
                  src="/BackButton.svg"
                  width={50}
                  height={50}
                  alt=""
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowModal(false)}
                />
                <TitleWithBar
                  content=""
                  barColor="#12A9E7"
                  className="mb-4 title"
                  style={{ marginLeft: 20 }}
                />
                <MetaAdsLogo
                  src="/metaAdsLogo.svg"
                  width={200}
                  height={40}
                  alt=""
                  style={{ marginLeft: 70 }}
                />
                <div
                  style={{
                    width: "20%",
                    height: 50,
                    backgroundColor: "#c3c3c3",
                    right: 20,
                    position: "absolute",
                  }}
                />
              </div>
              <div
                style={{
                  marginTop: "5%",
                  backgroundColor: "white",
                  width: "40%",
                  padding: 10,
                  borderRadius: 10,
                  border: "1px solid #0037c1",
                }}
              >
                ID do Anúncio: {""}
                <a
                  style={{
                    fontWeight: "semibold",
                    fontSize: 16,
                    color: "black",
                    width: "max-content",
                  }}
                  href="https://www.facebook.com/ads/library/?id=366905246002600"
                  target="_blank"
                  rel="noreferrer"
                >
                  <strong>366905246002600</strong>
                </a>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "90%",
                  alignSelf: "center",
                  marginTop: "2%",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    width: px2vw(150),
                    height: px2vw(150),
                    backgroundColor: "#c3c3c3",
                    borderRadius: 10,
                  }}
                />
                <div
                  style={{
                    width: "40%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "10px 0",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      backgroundColor: "white",
                      width: "100%",
                      padding: "2px 10px",
                      borderRadius: 10,
                      border: "1px solid #0037c1",
                    }}
                  >
                    <label style={{ lineHeight: 1, fontSize: 12 }}>
                      Pago por
                    </label>
                    <label style={{ fontSize: 18 }}>Nome</label>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      backgroundColor: "white",
                      width: "100%",
                      padding: "2px 10px",
                      borderRadius: 10,
                      border: "1px solid #0037c1",
                    }}
                  >
                    <label style={{ lineHeight: 1, fontSize: 12 }}>
                      Valor gasto (aproximado)
                    </label>
                    <label style={{ fontSize: 18 }}>R$ 100,00</label>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      backgroundColor: "white",
                      width: "100%",
                      padding: "2px 10px",
                      borderRadius: 10,
                      border: "1px solid #0037c1",
                    }}
                  >
                    <label style={{ lineHeight: 1, fontSize: 12 }}>Moeda</label>
                    <label style={{ fontSize: 18 }}>Real</label>
                  </div>
                </div>
                <div
                  style={{
                    width: "20%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    padding: "10px 0",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      backgroundColor: "white",
                      width: "100%",
                      padding: "2px 10px",
                      borderRadius: 10,
                      border: "1px solid #0037c1",
                    }}
                  >
                    <label style={{ lineHeight: 1, fontSize: 12 }}>
                      Data de Início
                    </label>
                    <label style={{ fontSize: 18 }}>12/12/2023</label>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      backgroundColor: "white",
                      width: "100%",
                      padding: "2px 10px",
                      borderRadius: 10,
                      border: "1px solid #0037c1",
                    }}
                  >
                    <label style={{ lineHeight: 1, fontSize: 12 }}>
                      Data de Fim
                    </label>
                    <label style={{ fontSize: 18 }}>13/12/2023</label>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <TotalQuotes title="Média de Impressões" type="metaAds" />

                <SentimentChart
                  positive={343349}
                  negative={243312}
                  neutral={103231}
                  title={"Gênero dos espectadores"}
                  legend1={"Masculino"}
                  legend2={"Feminino"}
                  legend3={"Outro"}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
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
                      content={"Estados que foram Veiculados"}
                    />
                  </div>
                  <div className="chart">
                    <VotersInfo chartData={pieChartData} />
                  </div>
                </VotersInfoContainer>
              </div>
            </Modal.Body>
          </Modal>
        </>
      )}
    </PageContainer>
  );
}
