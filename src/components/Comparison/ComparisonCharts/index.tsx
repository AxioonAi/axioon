import { ScoreChart } from "../../home/ScoreChart";
import { ChartTip } from "../../home/inteligencia-artificial/ChartTip";
import { KeyIndicators } from "../../home/midias-sociais/KeyIndicators";
import { PostEngagement } from "../../home/midias-sociais/PostEngagement";
import { SmallBarChart } from "../../home/midias-sociais/SmallBarChart";
import { Tip } from "../../home/midias-sociais/SocialMidiaPage/styles";
import { VotersActive } from "../../home/midias-sociais/VotersActive";
import { SimpleWordcloud } from "../../home/midias-sociais/WordCloud";
import { TitleWithBar } from "@/components/Global/TitleWithBar";
import { SentimentChart } from "@/components/home/mencoes/SentimentChart";
import { TotalQuotes } from "@/components/home/mencoes/TotalQuotes";
import { Spinner } from "react-bootstrap";

interface ComparisonProps {
  nameMain?: string;
  nameSecondary?: string;
  pageDataMain: any;
  pageDataSecondary: any;
  loadingMain: boolean;
  loadingSecondary: boolean;
  pageType: string;
  selectedComparison: string;
  id: string;
  locked?: boolean;
  pageEmpty?: string;
  selectedTimeValues: {
    value: number;
    name: string;
  };
}
export function ComparisonType({
  nameMain,
  nameSecondary,
  pageDataMain,
  pageDataSecondary,
  loadingMain,
  loadingSecondary,
  pageType,
  selectedComparison,
  id,
  locked,
  pageEmpty,
  selectedTimeValues,
}: ComparisonProps) {
  return (
    <>
      {pageDataMain !== undefined && pageDataSecondary !== undefined ? (
        selectedComparison === "MÍDIAS SOCIAIS" ? (
          <>
            <main className="bg-darkBlueAxion rounded-2xl mt-8 p-4">
              <TitleWithBar
                content="Engajamento de Publicações"
                barColor="#12A9E7"
                dark={true}
              />
              <div className="ChartsContainer grid grid-cols-[90%] md:grid-cols-[35rem] xl:grid-cols-[30rem_30rem] 2xl:grid-cols-[35rem_35rem] justify-center items-center gap-12 mt-5">
                <div className="engagementChartContainer flex flex-col justify-around bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] h-auto min-h-[30vh] md:min-h-[45vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                  <div className="flex flex-col h-auto min-h-[30vh] md:min-h-[55vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                    <TitleWithBar
                      content={String(nameMain)}
                      comparison={true}
                      barColor="#12A9E7"
                    />
                    {loadingMain ? (
                      <Spinner animation="border" className="m-auto" />
                    ) : (
                      <PostEngagement
                        pageData={pageDataMain}
                        pageType={pageType}
                      />
                    )}
                  </div>
                </div>
                <div className="engagementChartContainer flex flex-col justify-around bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] h-auto min-h-[30vh] md:min-h-[45vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                  <div className="flex flex-col h-auto min-h-[30vh] md:min-h-[55vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                    <TitleWithBar
                      content={String(nameSecondary)}
                      comparison={true}
                      barColor="#12A9E7"
                    />
                    {loadingSecondary ? (
                      <Spinner animation="border" className="m-auto" />
                    ) : (
                      <PostEngagement
                        pageData={pageDataSecondary}
                        pageType={pageType}
                      />
                    )}
                  </div>
                </div>
              </div>
            </main>

            <main className="bg-darkBlueAxion rounded-2xl mt-8 p-4">
              <TitleWithBar
                content="Sentimento Médio dos Comentários"
                barColor="#12A9E7"
                dark={true}
              />
              <div className="ChartsContainer grid grid-cols-[90%] md:grid-cols-[35rem] xl:grid-cols-[30rem_30rem] 2xl:grid-cols-[35rem_35rem] justify-center items-center gap-12 mt-5">
                <div className="commentsSentimentChartContainer flex flex-col justify-around bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] h-auto min-h-[30vh] md:min-h-[45vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                  <div className="flex flex-col h-auto min-h-[30vh] md:min-h-[55vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                    <TitleWithBar
                      content={String(nameMain)}
                      comparison
                      barColor="#2F5CFC"
                      subTitle
                    />
                    {loadingMain ? (
                      <Spinner animation="border" className="m-auto" />
                    ) : pageDataMain?.commentsStatistics.sentimentStatistics
                        .sentimentAverage !== null ? (
                      <>
                        <ScoreChart
                          id={id}
                          score={Number(
                            pageDataMain?.commentsStatistics.sentimentStatistics.sentimentAverage.toFixed(
                              2,
                            ),
                          )}
                        />
                        <div className="w-[90%] self-center h-[1px] mt-4 mb-8 bg-gray-60" />
                        <div className="flex items-center justify-center">
                          <SmallBarChart pageData={pageDataMain} />
                        </div>
                      </>
                    ) : (
                      <span className="self-center text-2xl mt-5">
                        Nenhum comentário encontrado
                      </span>
                    )}
                  </div>
                </div>
                <div className="commentsSentimentChartContainer flex flex-col justify-around bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] h-auto min-h-[30vh] md:min-h-[45vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                  <div className="flex flex-col h-auto min-h-[30vh] md:min-h-[55vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                    <TitleWithBar
                      content={String(nameSecondary)}
                      comparison={true}
                      barColor="#2F5CFC"
                      subTitle
                    />
                    {loadingSecondary ? (
                      <Spinner animation="border" className="m-auto" />
                    ) : pageDataSecondary?.commentsStatistics
                        .sentimentStatistics.sentimentAverage !== null ? (
                      <>
                        <ScoreChart
                          id={id + "2"}
                          score={Number(
                            pageDataSecondary?.commentsStatistics.sentimentStatistics.sentimentAverage.toFixed(
                              2,
                            ),
                          )}
                        />
                        <div className="w-[90%] self-center h-[1px] mt-4 mb-8 bg-gray-60" />
                        <div className="flex items-center justify-center">
                          <SmallBarChart pageData={pageDataSecondary} />
                        </div>
                      </>
                    ) : (
                      <span className="self-center text-2xl mt-5">
                        Nenhum comentário encontrado
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </main>

            <main className="bg-darkBlueAxion rounded-2xl mt-8 p-4">
              <TitleWithBar
                content="Indicadores Chave"
                barColor="#12A9E7"
                dark={true}
              />
              <div className="ChartsContainer grid grid-cols-[90%] md:grid-cols-[35rem] xl:grid-cols-[30rem_30rem] 2xl:grid-cols-[35rem_35rem] justify-center items-center gap-12 mt-5">
                <div className="keyIndicatorChartContainer flex flex-col justify-around bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] h-auto min-h-[30vh] md:min-h-[45vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                  <div className="flex flex-col h-auto min-h-[30vh] md:min-h-[55vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                    <TitleWithBar
                      content={String(nameMain)}
                      comparison
                      barColor="#12A9E7"
                      subTitle
                    />
                    <ChartTip content="Os valores do lado esquerdo do gráfico representam dados do período anterior, e os valores do lado direito do gráfico representam dados do período atual." />
                    {loadingMain ? (
                      <Spinner animation="border" className="m-auto" />
                    ) : (
                      <KeyIndicators pageData={pageDataMain} />
                    )}
                  </div>
                </div>
                <div className="keyIndicatorChartContainer flex flex-col justify-around bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] h-auto min-h-[30vh] md:min-h-[45vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                  <div className="flex flex-col h-auto min-h-[30vh] md:min-h-[55vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                    <TitleWithBar
                      content={String(nameSecondary)}
                      comparison={true}
                      barColor="#12A9E7"
                      subTitle
                    />
                    <ChartTip content="Os valores do lado esquerdo do gráfico representam dados do período anterior, e os valores do lado direito do gráfico representam dados do período atual." />
                    {loadingSecondary ? (
                      <Spinner animation="border" className="m-auto" />
                    ) : (
                      <KeyIndicators pageData={pageDataSecondary} />
                    )}
                  </div>
                </div>
              </div>
            </main>

            <main className="bg-darkBlueAxion rounded-2xl mt-8 p-4">
              <TitleWithBar
                content={
                  pageType === "youtube"
                    ? "Nuvem de Palavras"
                    : "Horários de Engajamento"
                }
                barColor="#12A9E7"
                dark={true}
              />
              <div className="ChartsContainer grid grid-cols-[90%] md:grid-cols-[35rem] xl:grid-cols-[30rem_30rem] 2xl:grid-cols-[35rem_35rem] justify-center items-center gap-12 mt-5">
                {pageType === "youtube" ? (
                  <div className="wordCloudContainer flex flex-col justify-around bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] h-auto min-h-[30vh] md:min-h-[45vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                    <div className="flex flex-col h-auto min-h-[30vh] md:min-h-[55vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                      <TitleWithBar
                        barColor="#080E45"
                        content={String(nameMain)}
                        subTitle
                      />
                      {loadingMain ? (
                        <Spinner animation="border" className="m-auto" />
                      ) : (
                        <div>
                          <ChartTip content="my text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when a..." />
                          <div className="h-[22rem]">
                            <SimpleWordcloud
                              socialMediaData={pageDataMain.wordCloud}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="timeChartContainer chart flex flex-col justify-around bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] h-auto min-h-[30vh] md:min-h-[45vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                    <TitleWithBar
                      content={String(nameMain)}
                      comparison
                      barColor="#12A9E7"
                      subTitle
                    />
                    {loadingMain ? (
                      <Spinner animation="border" className="m-auto" />
                    ) : (
                      <div className="h-[19rem]">
                        <VotersActive pageData={pageDataMain} />
                      </div>
                    )}

                    <Tip>
                      <img src="/dashboard/userIcon.svg" alt="" />
                      <p>
                        Se quiser ter um maior alcance nas Redes Sociais se
                        atente a estes horários.
                      </p>
                    </Tip>
                  </div>
                )}
                {pageType === "youtube" ? (
                  <div className="wordCloudContainer flex flex-col justify-around bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] h-auto min-h-[30vh] md:min-h-[45vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                    <div className="flex flex-col h-auto min-h-[30vh] md:min-h-[55vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                      <TitleWithBar
                        barColor="#080E45"
                        content={String(nameSecondary)}
                        subTitle
                      />
                      {loadingSecondary ? (
                        <Spinner animation="border" className="m-auto" />
                      ) : (
                        <>
                          <ChartTip content="my text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when a..." />
                          <div className="h-[22rem]">
                            <SimpleWordcloud
                              socialMediaData={pageDataSecondary.wordCloud}
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="timeChartContainer chart flex flex-col justify-around bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] h-auto min-h-[30vh] md:min-h-[45vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                    <TitleWithBar
                      content={String(nameSecondary)}
                      comparison={true}
                      barColor="#12A9E7"
                      subTitle
                    />
                    {loadingSecondary ? (
                      <Spinner animation="border" className="m-auto" />
                    ) : (
                      <div className="h-[19rem]">
                        <VotersActive pageData={pageDataSecondary} />
                      </div>
                    )}

                    <Tip>
                      <img src="/dashboard/userIcon.svg" alt="" />
                      <p>
                        Se quiser ter um maior alcance nas Redes Sociais se
                        atente a estes horários.
                      </p>
                    </Tip>
                  </div>
                )}
              </div>
            </main>
          </>
        ) : (
          <main className="bg-darkBlueAxion rounded-2xl mt-8 p-4">
            <TitleWithBar
              content="Engajamento de Publicações"
              barColor="#12A9E7"
              dark={true}
            />
            <div className="ChartsContainer grid grid-cols-[90%] md:grid-cols-[35rem] xl:grid-cols-[30rem_30rem] 2xl:grid-cols-[35rem_35rem] justify-center items-center gap-12 mt-5">
              <div className="flex flex-col gap-4 bg-white rounded-lg flex-wrap p-2 justify-around lg:mx-auto md:justify-center">
                <TitleWithBar barColor="#080E45" content={String(nameMain)} />
                <div className="flex">
                  <div className="bg-white p-4 rounded-lg w-[17.25rem] h-full">
                    <TitleWithBar content="Score Total" barColor="#d5904f" />
                    <div className="flex justify-center p-[0_8%]">
                      <ScoreChart
                        score={Number(
                          pageDataMain &&
                            pageDataMain?.currentFormat.news.average !== null
                            ? pageDataMain?.currentFormat.news.average.toFixed(
                                0,
                              )
                            : 0,
                        )}
                        id="newsScoreComparison"
                      />
                    </div>
                  </div>
                  <TotalQuotes
                    value={
                      pageDataMain && pageDataMain?.currentFormat.news.total
                    }
                    firstDate={new Date(
                      new Date().setDate(
                        new Date().getDate() - selectedTimeValues.value,
                      ),
                    ).toLocaleDateString("pt-BR")}
                    lastDate={new Date().toLocaleDateString("pt-BR")}
                  />
                </div>

                <div className="sentimentChartContainer w-full lg:w-[30rem]">
                  <SentimentChart
                    positive={
                      pageDataMain && pageDataMain?.currentFormat.news.positive
                    }
                    negative={
                      pageDataMain && pageDataMain?.currentFormat.news.negative
                    }
                    neutral={
                      pageDataMain && pageDataMain?.currentFormat.news.neutral
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4 bg-white rounded-lg flex-wrap p-2 justify-around lg:mx-auto md:justify-center">
                <TitleWithBar
                  barColor="#080E45"
                  content={String(nameSecondary)}
                />
                <div className="flex">
                  <div className="bg-white p-4 rounded-lg w-[17.25rem] h-full">
                    <TitleWithBar content="Score Total" barColor="#D38945" />
                    <div className="flex justify-center p-[0_8%]">
                      <ScoreChart
                        score={Number(
                          pageDataSecondary &&
                            pageDataSecondary?.currentFormat.news.average !==
                              null
                            ? pageDataSecondary?.currentFormat.news.average.toFixed(
                                0,
                              )
                            : 0,
                        )}
                        id="newsScoreComparison2"
                      />
                    </div>
                  </div>
                  <TotalQuotes
                    value={
                      pageDataSecondary &&
                      pageDataSecondary?.currentFormat.news.total
                    }
                    firstDate={new Date(
                      new Date().setDate(
                        new Date().getDate() - selectedTimeValues.value,
                      ),
                    ).toLocaleDateString("pt-BR")}
                    lastDate={new Date().toLocaleDateString("pt-BR")}
                  />
                </div>
                <div className="sentimentChartContainer w-full lg:w-[30rem]">
                  <SentimentChart
                    positive={
                      pageDataSecondary &&
                      pageDataSecondary?.currentFormat.news.positive
                    }
                    negative={
                      pageDataSecondary &&
                      pageDataSecondary?.currentFormat.news.negative
                    }
                    neutral={
                      pageDataSecondary &&
                      pageDataSecondary?.currentFormat.news.neutral
                    }
                  />
                </div>
              </div>
            </div>
          </main>
        )
      ) : pageDataMain === undefined && pageDataSecondary !== undefined ? (
        selectedComparison === "MÍDIAS SOCIAIS" ? (
          <>
            <main className="bg-darkBlueAxion rounded-2xl mt-8 p-4">
              <TitleWithBar
                content="Engajamento de Publicações"
                barColor="#12A9E7"
                dark={true}
              />
              <div className="ChartsContainer grid grid-cols-[90%] md:grid-cols-[35rem] xl:grid-cols-[30rem_30rem] 2xl:grid-cols-[35rem_35rem] justify-center items-center gap-12 mt-5">
                <div className="engagementChartContainer flex flex-col justify-around bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] h-auto min-h-[30vh] md:min-h-[45vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                  <div className="flex flex-col h-auto min-h-[30vh] md:min-h-[55vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                    <TitleWithBar
                      content={String(nameMain)}
                      comparison
                      barColor="#12A9E7"
                    />
                  </div>
                </div>
                <div className="engagementChartContainer flex flex-col justify-around bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] h-auto min-h-[30vh] md:min-h-[45vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                  <div className="flex flex-col h-auto min-h-[30vh] md:min-h-[55vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                    <TitleWithBar
                      content={String(nameSecondary)}
                      comparison={true}
                      barColor="#12A9E7"
                    />
                    {loadingSecondary ? (
                      <Spinner animation="border" className="m-auto" />
                    ) : (
                      <PostEngagement
                        pageData={pageDataSecondary}
                        pageType={pageType}
                      />
                    )}
                  </div>
                </div>
              </div>
            </main>

            <main className="bg-darkBlueAxion rounded-2xl mt-8 p-4">
              <TitleWithBar
                content="Sentimento Médio dos Comentários"
                barColor="#12A9E7"
                dark={true}
              />
              <div className="ChartsContainer grid grid-cols-[90%] md:grid-cols-[35rem] xl:grid-cols-[30rem_30rem] 2xl:grid-cols-[35rem_35rem] justify-center items-center gap-12 mt-5">
                <div className="commentsSentimentChartContainer flex flex-col justify-around bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] h-auto min-h-[30vh] md:min-h-[45vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                  <div className="flex flex-col h-auto min-h-[30vh] md:min-h-[55vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                    <TitleWithBar
                      content={String(nameMain)}
                      comparison
                      barColor="#2F5CFC"
                      subTitle
                    />
                  </div>
                </div>
                <div className="commentsSentimentChartContainer flex flex-col justify-around bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] h-auto min-h-[30vh] md:min-h-[45vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                  <div className="flex flex-col h-auto min-h-[30vh] md:min-h-[55vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                    <TitleWithBar
                      content={String(nameSecondary)}
                      comparison={true}
                      barColor="#2F5CFC"
                      subTitle
                    />
                    {loadingSecondary ? (
                      <Spinner animation="border" className="m-auto" />
                    ) : pageDataSecondary?.commentsStatistics
                        .sentimentStatistics.sentimentAverage !== null ? (
                      <>
                        <ScoreChart
                          id={id + "2"}
                          score={Number(
                            pageDataSecondary?.commentsStatistics.sentimentStatistics.sentimentAverage.toFixed(
                              2,
                            ),
                          )}
                        />
                        <div className="w-[90%] self-center h-[1px] mt-4 mb-8 bg-gray-60" />
                        <div className="flex items-center justify-center">
                          <SmallBarChart pageData={pageDataSecondary} />
                        </div>
                      </>
                    ) : (
                      <span className="self-center text-2xl mt-5">
                        Nenhum comentário encontrado
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </main>

            <main className="bg-darkBlueAxion rounded-2xl mt-8 p-4">
              <TitleWithBar
                content="Indicadores Chave"
                barColor="#12A9E7"
                dark={true}
              />
              <div className="ChartsContainer grid grid-cols-[90%] md:grid-cols-[35rem] xl:grid-cols-[30rem_30rem] 2xl:grid-cols-[35rem_35rem] justify-center items-center gap-12 mt-5">
                <div className="keyIndicatorChartContainer flex flex-col justify-around bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] h-auto min-h-[30vh] md:min-h-[45vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                  <div className="flex flex-col h-auto min-h-[30vh] md:min-h-[55vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                    <TitleWithBar
                      content={String(nameMain)}
                      comparison
                      barColor="#12A9E7"
                      subTitle
                    />
                  </div>
                </div>
                <div className="keyIndicatorChartContainer flex flex-col justify-around bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] h-auto min-h-[30vh] md:min-h-[45vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                  <div className="flex flex-col h-auto min-h-[30vh] md:min-h-[55vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                    <TitleWithBar
                      content={String(nameSecondary)}
                      comparison={true}
                      barColor="#12A9E7"
                      subTitle
                    />
                    <ChartTip content="Os valores do lado esquerdo do gráfico representam dados do período anterior, e os valores do lado direito do gráfico representam dados do período atual." />
                    {loadingSecondary ? (
                      <Spinner animation="border" className="m-auto" />
                    ) : (
                      <KeyIndicators pageData={pageDataSecondary} />
                    )}
                  </div>
                </div>
              </div>
            </main>

            <main className="bg-darkBlueAxion rounded-2xl mt-8 p-4">
              <TitleWithBar
                content={
                  pageType === "youtube"
                    ? "Nuvem de Palavras"
                    : "Horários de Engajamento"
                }
                barColor="#12A9E7"
                dark={true}
              />
              <div className="ChartsContainer grid grid-cols-[90%] md:grid-cols-[35rem] xl:grid-cols-[30rem_30rem] 2xl:grid-cols-[35rem_35rem] justify-center items-center gap-12 mt-5">
                {pageType === "youtube" ? (
                  <div className="wordCloudContainer flex flex-col justify-around bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] h-auto min-h-[30vh] md:min-h-[45vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                    <div className="flex flex-col h-auto min-h-[30vh] md:min-h-[55vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                      <TitleWithBar
                        barColor="#080E45"
                        content={String(nameMain)}
                        subTitle
                      />
                    </div>
                  </div>
                ) : (
                  <div className="timeChartContainer chart flex flex-col justify-around bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] h-auto min-h-[30vh] md:min-h-[45vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                    <TitleWithBar
                      content={String(nameMain)}
                      comparison
                      barColor="#12A9E7"
                      subTitle
                    />
                  </div>
                )}
                {pageType === "youtube" ? (
                  <div className="wordCloudContainer flex flex-col justify-around bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] h-auto min-h-[30vh] md:min-h-[45vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                    <div className="flex flex-col h-auto min-h-[30vh] md:min-h-[55vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                      <TitleWithBar
                        barColor="#080E45"
                        content={String(nameSecondary)}
                        subTitle
                      />
                      {loadingSecondary ? (
                        <Spinner animation="border" className="m-auto" />
                      ) : (
                        <>
                          <ChartTip content="my text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when a..." />
                          <div className="h-[22rem]">
                            <SimpleWordcloud
                              socialMediaData={pageDataSecondary.wordCloud}
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="timeChartContainer chart flex flex-col justify-around bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] h-auto min-h-[30vh] md:min-h-[45vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                    <TitleWithBar
                      content={String(nameSecondary)}
                      comparison={true}
                      barColor="#12A9E7"
                      subTitle
                    />
                    {loadingSecondary ? (
                      <Spinner animation="border" className="m-auto" />
                    ) : (
                      <div className="h-[19rem]">
                        <VotersActive pageData={pageDataSecondary} />
                      </div>
                    )}

                    <Tip>
                      <img src="/dashboard/userIcon.svg" alt="" />
                      <p>
                        Se quiser ter um maior alcance nas Redes Sociais se
                        atente a estes horários.
                      </p>
                    </Tip>
                  </div>
                )}
              </div>
            </main>
          </>
        ) : (
          <main className="bg-darkBlueAxion rounded-2xl mt-8 p-4">
            <TitleWithBar
              content="Engajamento de Publicações"
              barColor="#12A9E7"
              dark={true}
            />
            <div className="ChartsContainer grid grid-cols-[90%] md:grid-cols-[35rem] xl:grid-cols-[30rem_30rem] 2xl:grid-cols-[35rem_35rem] justify-center items-center gap-12 mt-5">
              <div className="flex flex-col gap-4 bg-white rounded-lg flex-wrap p-2 justify-around lg:mx-auto md:justify-center">
                <TitleWithBar barColor="#080E45" content={String(nameMain)} />
                <div className="flex">
                  <div className="bg-white p-4 rounded-lg w-[17.25rem] h-full">
                    <TitleWithBar content="Score Total" barColor="#D38945" />
                    <div className="flex justify-center p-[0_8%]">
                      <ScoreChart score={0} id="newsScoreComparison" />
                    </div>
                  </div>
                  <TotalQuotes
                    value={0}
                    firstDate={new Date(
                      new Date().setDate(
                        new Date().getDate() - selectedTimeValues.value,
                      ),
                    ).toLocaleDateString("pt-BR")}
                    lastDate={new Date().toLocaleDateString("pt-BR")}
                  />
                </div>

                <div className="sentimentChartContainer w-full lg:w-[30rem]">
                  <SentimentChart positive={0} negative={0} neutral={0} />
                </div>
              </div>
              <div className="flex flex-col gap-4 bg-white rounded-lg flex-wrap p-2 justify-around lg:mx-auto md:justify-center">
                <TitleWithBar
                  barColor="#080E45"
                  content={String(nameSecondary)}
                />
                <div className="flex">
                  <div className="bg-white p-4 rounded-lg w-[17.25rem] h-full">
                    <TitleWithBar content="Score Total" barColor="#D38945" />
                    <div className="flex justify-center p-[0_8%]">
                      <ScoreChart
                        score={Number(
                          pageDataSecondary &&
                            pageDataSecondary?.currentFormat.news.average !==
                              null
                            ? pageDataSecondary?.currentFormat.news.average.toFixed(
                                0,
                              )
                            : 0,
                        )}
                        id="newsScoreComparison2"
                      />
                    </div>
                  </div>
                  <TotalQuotes
                    value={
                      pageDataSecondary &&
                      pageDataSecondary?.currentFormat.news.total
                    }
                    firstDate={new Date(
                      new Date().setDate(
                        new Date().getDate() - selectedTimeValues.value,
                      ),
                    ).toLocaleDateString("pt-BR")}
                    lastDate={new Date().toLocaleDateString("pt-BR")}
                  />
                </div>
                <div className="sentimentChartContainer w-full lg:w-[30rem]">
                  <SentimentChart
                    positive={
                      pageDataSecondary &&
                      pageDataSecondary?.currentFormat.news.positive
                    }
                    negative={
                      pageDataSecondary &&
                      pageDataSecondary?.currentFormat.news.negative
                    }
                    neutral={
                      pageDataSecondary &&
                      pageDataSecondary?.currentFormat.news.neutral
                    }
                  />
                </div>
              </div>
            </div>
          </main>
        )
      ) : pageDataMain !== undefined && pageDataSecondary === undefined ? (
        selectedComparison === "MÍDIAS SOCIAIS" ? (
          <>
            <main className="bg-darkBlueAxion rounded-2xl mt-8 p-4">
              <TitleWithBar
                content="Engajamento de Publicações"
                barColor="#12A9E7"
                dark={true}
              />
              <div className="ChartsContainer grid grid-cols-[90%] md:grid-cols-[35rem] xl:grid-cols-[30rem_30rem] 2xl:grid-cols-[35rem_35rem] justify-center items-center gap-12 mt-5">
                <div className="engagementChartContainer flex flex-col justify-around bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] h-auto min-h-[30vh] md:min-h-[45vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                  <div className="flex flex-col h-auto min-h-[30vh] md:min-h-[55vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                    <TitleWithBar
                      content={String(nameMain)}
                      comparison
                      barColor="#12A9E7"
                    />
                    {loadingMain ? (
                      <Spinner animation="border" className="m-auto" />
                    ) : (
                      <PostEngagement
                        pageData={pageDataMain}
                        pageType={pageType}
                      />
                    )}
                  </div>
                </div>
                <div className="engagementChartContainer flex flex-col justify-around bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] h-auto min-h-[30vh] md:min-h-[45vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                  <div className="flex flex-col h-auto min-h-[30vh] md:min-h-[55vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                    <TitleWithBar
                      content={String(nameSecondary)}
                      comparison={true}
                      barColor="#12A9E7"
                    />
                  </div>
                </div>
              </div>
            </main>

            <main className="bg-darkBlueAxion rounded-2xl mt-8 p-4">
              <TitleWithBar
                content="Sentimento Médio dos Comentários"
                barColor="#12A9E7"
                dark={true}
              />
              <div className="ChartsContainer grid grid-cols-[90%] md:grid-cols-[35rem] xl:grid-cols-[30rem_30rem] 2xl:grid-cols-[35rem_35rem] justify-center items-center gap-12 mt-5">
                <div className="commentsSentimentChartContainer flex flex-col justify-around bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] h-auto min-h-[30vh] md:min-h-[45vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                  <div className="flex flex-col h-auto min-h-[30vh] md:min-h-[55vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                    <TitleWithBar
                      content={String(nameMain)}
                      comparison
                      barColor="#2F5CFC"
                      subTitle
                    />
                    {loadingMain ? (
                      <Spinner animation="border" className="m-auto" />
                    ) : pageDataMain?.commentsStatistics.sentimentStatistics
                        .sentimentAverage !== null ? (
                      <>
                        <ScoreChart
                          id={id}
                          score={Number(
                            pageDataMain?.commentsStatistics.sentimentStatistics.sentimentAverage.toFixed(
                              2,
                            ),
                          )}
                        />
                        <div className="w-[90%] self-center h-[1px] mt-4 mb-8 bg-gray-60" />
                        <div className="flex items-center justify-center">
                          <SmallBarChart pageData={pageDataMain} />
                        </div>
                      </>
                    ) : (
                      <span className="self-center text-2xl mt-5">
                        Nenhum comentário encontrado
                      </span>
                    )}
                  </div>
                </div>
                <div className="commentsSentimentChartContainer flex flex-col justify-around bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] h-auto min-h-[30vh] md:min-h-[45vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                  <div className="flex flex-col h-auto min-h-[30vh] md:min-h-[55vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                    <TitleWithBar
                      content={String(nameSecondary)}
                      comparison={true}
                      barColor="#2F5CFC"
                      subTitle
                    />
                  </div>
                </div>
              </div>
            </main>

            <main className="bg-darkBlueAxion rounded-2xl mt-8 p-4">
              <TitleWithBar
                content="Indicadores Chave"
                barColor="#12A9E7"
                dark={true}
              />
              <div className="ChartsContainer grid grid-cols-[90%] md:grid-cols-[35rem] xl:grid-cols-[30rem_30rem] 2xl:grid-cols-[35rem_35rem] justify-center items-center gap-12 mt-5">
                <div className="keyIndicatorChartContainer flex flex-col justify-around bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] h-auto min-h-[30vh] md:min-h-[45vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                  <div className="flex flex-col h-auto min-h-[30vh] md:min-h-[55vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                    <TitleWithBar
                      content={String(nameMain)}
                      comparison
                      barColor="#12A9E7"
                      subTitle
                    />
                    <ChartTip content="Os valores do lado esquerdo do gráfico representam dados do período anterior, e os valores do lado direito do gráfico representam dados do período atual." />
                    {loadingMain ? (
                      <Spinner animation="border" className="m-auto" />
                    ) : (
                      <KeyIndicators pageData={pageDataMain} />
                    )}
                  </div>
                </div>
                <div className="keyIndicatorChartContainer flex flex-col justify-around bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] h-auto min-h-[30vh] md:min-h-[45vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                  <div className="flex flex-col h-auto min-h-[30vh] md:min-h-[55vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                    <TitleWithBar
                      content={String(nameSecondary)}
                      comparison={true}
                      barColor="#12A9E7"
                      subTitle
                    />
                  </div>
                </div>
              </div>
            </main>

            <main className="bg-darkBlueAxion rounded-2xl mt-8 p-4">
              <TitleWithBar
                content={
                  pageType === "youtube"
                    ? "Nuvem de Palavras"
                    : "Horários de Engajamento"
                }
                barColor="#12A9E7"
                dark={true}
              />
              <div className="ChartsContainer grid grid-cols-[90%] md:grid-cols-[35rem] xl:grid-cols-[30rem_30rem] 2xl:grid-cols-[35rem_35rem] justify-center items-center gap-12 mt-5">
                {pageType === "youtube" ? (
                  <div className="wordCloudContainer flex flex-col justify-around bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] h-auto min-h-[30vh] md:min-h-[45vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                    <div className="flex flex-col h-auto min-h-[30vh] md:min-h-[55vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                      <TitleWithBar
                        barColor="#080E45"
                        content={String(nameMain)}
                        subTitle
                      />
                      {loadingMain ? (
                        <Spinner animation="border" className="m-auto" />
                      ) : (
                        <div>
                          <ChartTip content="my text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when a..." />
                          <div className="h-[22rem]">
                            <SimpleWordcloud
                              socialMediaData={pageDataMain.wordCloud}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="timeChartContainer chart flex flex-col justify-around bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] h-auto min-h-[30vh] md:min-h-[45vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                    <TitleWithBar
                      content={String(nameMain)}
                      comparison
                      barColor="#12A9E7"
                      subTitle
                    />
                    {loadingMain ? (
                      <Spinner animation="border" className="m-auto" />
                    ) : (
                      <div className="h-[19rem]">
                        <VotersActive pageData={pageDataMain} />
                      </div>
                    )}

                    <Tip>
                      <img src="/dashboard/userIcon.svg" alt="" />
                      <p>
                        Se quiser ter um maior alcance nas Redes Sociais se
                        atente a estes horários.
                      </p>
                    </Tip>
                  </div>
                )}
                {pageType === "youtube" ? (
                  <div className="wordCloudContainer flex flex-col justify-around bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] h-auto min-h-[30vh] md:min-h-[45vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                    <div className="flex flex-col h-auto min-h-[30vh] md:min-h-[55vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                      <TitleWithBar
                        barColor="#080E45"
                        content={String(nameSecondary)}
                        subTitle
                      />
                    </div>
                  </div>
                ) : (
                  <div className="timeChartContainer chart flex flex-col justify-around bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] h-auto min-h-[30vh] md:min-h-[45vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                    <TitleWithBar
                      content={String(nameSecondary)}
                      comparison={true}
                      barColor="#12A9E7"
                      subTitle
                    />
                  </div>
                )}
              </div>
            </main>
          </>
        ) : (
          <main className="bg-darkBlueAxion rounded-2xl mt-8 p-4">
            <TitleWithBar
              content="Engajamento de Publicações"
              barColor="#12A9E7"
              dark={true}
            />
            <div className="ChartsContainer grid grid-cols-[90%] md:grid-cols-[35rem] xl:grid-cols-[30rem_30rem] 2xl:grid-cols-[35rem_35rem] justify-center items-center gap-12 mt-5">
              <div className="flex flex-col gap-4 bg-white rounded-lg flex-wrap p-2 justify-around lg:mx-auto md:justify-center">
                <TitleWithBar barColor="#080E45" content={String(nameMain)} />
                <div className="flex">
                  <div className="bg-white p-4 rounded-lg w-[17.25rem] h-full">
                    <TitleWithBar content="Score Total" barColor="#D38945" />
                    <div className="flex justify-center p-[0_8%]">
                      <ScoreChart
                        score={Number(
                          pageDataMain &&
                            pageDataMain?.currentFormat.news.average !== null
                            ? pageDataMain?.currentFormat.news.average.toFixed(
                                0,
                              )
                            : 0,
                        )}
                        id="newsScoreComparison"
                      />
                    </div>
                  </div>
                  <TotalQuotes
                    value={
                      pageDataMain && pageDataMain?.currentFormat.news.total
                    }
                    firstDate={new Date(
                      new Date().setDate(
                        new Date().getDate() - selectedTimeValues.value,
                      ),
                    ).toLocaleDateString("pt-BR")}
                    lastDate={new Date().toLocaleDateString("pt-BR")}
                  />
                </div>

                <div className="sentimentChartContainer w-full lg:w-[30rem]">
                  <SentimentChart
                    positive={
                      pageDataMain && pageDataMain?.currentFormat.news.positive
                    }
                    negative={
                      pageDataMain && pageDataMain?.currentFormat.news.negative
                    }
                    neutral={
                      pageDataMain && pageDataMain?.currentFormat.news.neutral
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4 bg-white rounded-lg flex-wrap p-2 justify-around lg:mx-auto md:justify-center">
                <TitleWithBar
                  barColor="#080E45"
                  content={String(nameSecondary)}
                />
                <div className="flex">
                  <div className="bg-white p-4 rounded-lg w-[17.25rem] h-full">
                    <TitleWithBar content="Score Total" barColor="#D38945" />
                    <div className="flex justify-center p-[0_8%]">
                      <ScoreChart score={0} id="newsScoreComparison2" />
                    </div>
                  </div>
                  <TotalQuotes
                    value={0}
                    firstDate={new Date(
                      new Date().setDate(
                        new Date().getDate() - selectedTimeValues.value,
                      ),
                    ).toLocaleDateString("pt-BR")}
                    lastDate={new Date().toLocaleDateString("pt-BR")}
                  />
                </div>
                <div className="sentimentChartContainer w-full lg:w-[30rem]">
                  <SentimentChart positive={0} negative={0} neutral={0} />
                </div>
              </div>
            </div>
          </main>
        )
      ) : pageEmpty !== "" ? (
        <div className="w-full h-full text-center mt-8 text-xl font-semibold">
          {pageEmpty}
        </div>
      ) : (
        <div className="w-full h-full flex justify-center text-center">
          <Spinner animation="border" />
        </div>
      )}
    </>
  );
}
