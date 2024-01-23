import { TitleWithBar } from "@/components/Global/TitleWithBar";
import { PostEngagement } from "../midias-sociais/PostEngagement";
import { ScoreChart } from "../ScoreChart";
import { SmallBarChart } from "../midias-sociais/SmallBarChart";
import { ChartTip } from "../inteligencia-artificial/ChartTip";
import { KeyIndicators } from "../midias-sociais/KeyIndicators";
import { SimpleWordcloud } from "../midias-sociais/WordCloud";
import { VotersActive } from "../midias-sociais/VotersActive";
import { Tip } from "../midias-sociais/SocialMidiaPage/styles";

interface ComparisonProps {
  pageData: any;
  pageType: string;
  id: string;
  loading: boolean;
  locked?: boolean;
}
export function ComparisonType({
  pageData,
  pageType,
  id,
  loading,
  locked,
}: ComparisonProps) {
  console.log("pageData: ", pageData);
  return (
    <>
      <main className="bg-darkBlueAxion rounded-2xl mt-8 p-4">
        <TitleWithBar
          content="Engajamento de Publicações"
          barColor="#12A9E7"
          dark={true}
        />
        <div className="ChartsContainer grid grid-cols-[90%] md:grid-cols-[35rem] xl:grid-cols-[30rem_30rem] 2xl:grid-cols-[35rem_35rem] justify-center items-center gap-12 mt-5">
          <div className="engagementChartContainer flex flex-col justify-around bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] h-auto min-h-[30vh] md:min-h-[45vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
            <div className="flex flex-col">
              <TitleWithBar
                content="Engajamento de Publicações"
                barColor="#12A9E7"
              />
              {pageType}
              <PostEngagement pageData={pageData} />
            </div>
          </div>
          <div className="engagementChartContainer flex flex-col justify-around bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] h-auto min-h-[30vh] md:min-h-[45vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
            <div className="flex flex-col">
              <TitleWithBar
                content="Engajamento de Publicações"
                barColor="#12A9E7"
              />
              <PostEngagement pageData={pageData} />
            </div>
          </div>
        </div>
      </main>

      <main className="bg-darkBlueAxion rounded-2xl mt-8 p-4">
        <TitleWithBar
          content="Engajamento de Publicações"
          barColor="#12A9E7"
          dark={true}
        />
        <div className="ChartsContainer grid grid-cols-[90%] md:grid-cols-[35rem] xl:grid-cols-[30rem_30rem] 2xl:grid-cols-[35rem_35rem] justify-center items-center gap-12 mt-5">
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
                    id={id + "2"}
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
        </div>
      </main>

      <main className="bg-darkBlueAxion rounded-2xl mt-8 p-4">
        <TitleWithBar
          content="Engajamento de Publicações"
          barColor="#12A9E7"
          dark={true}
        />
        <div className="ChartsContainer grid grid-cols-[90%] md:grid-cols-[35rem] xl:grid-cols-[30rem_30rem] 2xl:grid-cols-[35rem_35rem] justify-center items-center gap-12 mt-5">
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
        </div>
      </main>

      <main className="bg-darkBlueAxion rounded-2xl mt-8 p-4">
        <TitleWithBar
          content="Engajamento de Publicações"
          barColor="#12A9E7"
          dark={true}
        />
        <div className="ChartsContainer grid grid-cols-[90%] md:grid-cols-[35rem] xl:grid-cols-[30rem_30rem] 2xl:grid-cols-[35rem_35rem] justify-center items-center gap-12 mt-5">
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
        </div>
      </main>
    </>
  );
}
