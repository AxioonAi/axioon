import { ScoreChart } from "../../ScoreChart";
import { MentionsCard } from "../../mencoes/MentionsCard";
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
import { SimpleWordcloud } from "../WordCloud";
import { TitleWithBar } from "@/components/Global/TitleWithBar";
import Image from "next/image";
import { useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";

interface Props {
  pageType: "instagram" | "facebook" | "youtube" | "tiktok";
  pageData: any;
  metaads?: any;
  id: string;
  loading: boolean;
  locked?: boolean;
  mentionsData?: any;
  selectedTimeValues?: any;
}

export function SocialMidiaPage({
  pageType,
  pageData,
  metaads,
  id,
  loading,
  locked,
  mentionsData,
  selectedTimeValues,
}: Props) {
  const [selectedValue, setSelectedValue] = useState("Relevância");
  const values = ["Relevância", "Mais recente", "Sentimento"];
  const [selectedValueComments, setSelectedValueComments] =
    useState("Relevância");
  const valuesComments = ["Relevância", "Mais recente", "Sentimento"];

  const [showModal, setShowModal] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showMoreComments, setShowMoreComments] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [seeMoreMentions, setSeeMoreMentions] = useState(false);

  const groupGenderConf = [
    {
      dataKey: "Homens",
      color: "#0D123C",
      total:
        metaads && metaads.advertising.length !== 0
          ? metaads?.advertising[selectedIndex].totalByGender[0].value.toFixed(
              0,
            )
          : 0,
    },
    {
      dataKey: "Mulheres",
      color: "#E7298A",
      total:
        metaads && metaads.advertising.length !== 0
          ? metaads?.advertising[selectedIndex].totalByGender[1].value.toFixed(
              0,
            )
          : 0,
    },
  ];

  const openModal = (index: number) => {
    setShowModal(true);
    setSelectedIndex(index);
  };

  return (
    <div className="pageContainer flex flex-col items-center justify-center m-auto p-2">
      {!pageData ? (
        <label className="flex gap-2 mt-5 text-3xl">
          {loading ? (
            <Spinner animation="border" />
          ) : (
            <div className="flex gap-2 items-center justify-center">
              <img
                src="/dashboard/midias-sociais/noData.svg"
                alt=""
                className="w-16 h-16"
              />
              <span className="w-1/2">
                Não encontramos nenhum dado do {pageType} no período
                selecionado.
              </span>
            </div>
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
                <ChartTip content="Este gráfico mostra as últimas publicações dentro do período selecionado, apresentando seus respectivos dados de engajamento." />
                <PostEngagement
                  pageData={pageData !== undefined ? pageData : []}
                  pageType={pageType}
                />
              </div>
            </div>

            <div className="commentsSentimentChartContainer flex flex-col justify-around bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] h-auto min-h-[30vh] md:min-h-[45vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
              <div className="flex flex-col">
                <TitleWithBar
                  content="Sentimento Médio dos Comentários:"
                  barColor="#2F5CFC"
                  subTitle
                />
                <ChartTip content="Este gráfico mostra o sentimento médio dos comentários dentro do período selecionado." />
                {pageData?.commentsStatistics.sentimentStatistics
                  .sentimentAverage !== null ? (
                  <>
                    <ScoreChart
                      id={id}
                      score={Number(
                        pageData?.commentsStatistics.sentimentStatistics.sentimentAverage.toFixed(
                          2,
                        ),
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
                <TitleWithBar content="Indicadores Chave:" barColor="#12A9E7" />
                <ChartTip content="Os valores do lado esquerdo do gráfico representam dados do período anterior, e os valores do lado direito do gráfico representam dados do período atual." />
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
                  <ChartTip content="Esta nuvem de palavras representa as palavras mais usadas no canal no período selecionado." />
                  <div className="h-[22rem]">
                    <SimpleWordcloud socialMediaData={pageData.wordCloud} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="timeChartContainer chart flex flex-col justify-around bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] h-auto min-h-[30vh] md:min-h-[45vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                <div className="flex w-11/12">
                  <TitleWithBar
                    content="Horário que os Eleitores estão mais Ativos em Sua Rede Social:"
                    barColor="#12A9E7"
                    subTitle
                  />
                </div>
                <ChartTip content="Este gráfico mostra o horário que os eleitores mais estiveram ativos dentro do período selecionado." />
                <div className="h-[19rem]">
                  <VotersActive pageData={pageData} />
                </div>

                <div className="Tip flex items-center gap-2">
                  <img src="/dashboard/userIcon.svg" alt="" />
                  <p className="text-sm m-0 p-0">
                    Se quiser ter um maior alcance nas Redes Sociais se atente a
                    estes horários.
                  </p>
                </div>
              </div>
            )}

            {id === "comparison" || id === "comparison2" ? (
              <></>
            ) : (
              <>
                <div className="postsContainer flex flex-col justify-around bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] h-auto">
                  <div className="postsHeader flex flex-col gap-12 md:flex-row md:gap-0 justify-between p-4">
                    <div className="mt-2">
                      <TitleWithBar content="Publicações" barColor="#12A9E7" />
                    </div>
                    <div className="labelAndSelect flex flex-col items-center gap-1 p-2">
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
                    {selectedValue === "Mais recente"
                      ? pageData?.posts
                          .sort(
                            (a: any, b: any) =>
                              Number(new Date(b.date)) -
                              Number(new Date(a.date)),
                          )
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
                          ))
                      : selectedValue === "Relevância"
                        ? pageData?.posts
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
                            ))
                        : pageData.posts
                            .sort((a: any, b: any) => b.sentiment - a.sentiment)
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
                      className={` ${pageData.posts.length <= 4 ? "invisible" : "flex"} border-0 bg-transparent text-sm font-bold text-black underline`}
                      onClick={() => setShowMore(!showMore)}
                    >
                      {showMore ? "Ver Menos" : "Ver Mais"}
                    </button>
                  </div>
                </div>

                <div className="commentsContainer flex flex-col justify-around bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] h-auto">
                  <div className="commentsHeader flex flex-col gap-12 md:flex-row md:gap-0 justify-between p-4">
                    <div className="mt-2">
                      <TitleWithBar content="Comentários" barColor="#12A9E7" />
                    </div>
                    <div className="labelAndSelect flex flex-col items-center gap-1 p-2">
                      <strong>Ordenar por:</strong>
                      <OrderSelect
                        selectedValue={selectedValueComments}
                        values={valuesComments}
                        setSelectedValue={setSelectedValueComments}
                        id="comments-order-select"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col self-center w-full gap-4 px-3 h-[50vh] overflow-y-auto">
                    {selectedPostId === "" ? (
                      <label className="text-black text-center justify-center">
                        Selecione uma publicação
                      </label>
                    ) : pageData.posts.filter(
                        (post: any) => post?.id === selectedPostId,
                      )[0].comments.length === 0 ? (
                      <label className="text-black text-center justify-center">
                        Sem comentários
                      </label>
                    ) : selectedValueComments === "Mais recente" ? (
                      pageData.posts
                        .filter((post: any) => post.id === selectedPostId)[0]
                        .comments.sort(
                          (a: any, b: any) =>
                            Number(new Date(b.date)) - Number(new Date(a.date)),
                        )
                        .slice(
                          0,
                          showMoreComments
                            ? pageData.posts.filter(
                                (post: any) => post?.id === selectedPostId,
                              )[0].comments.length
                            : 5,
                        )
                        .map((comment: any, index: any) => (
                          <CommentComponent type={pageType} comment={comment} />
                        ))
                    ) : selectedValueComments === "Relevância" ? (
                      pageData.posts
                        .filter((post: any) => post?.id === selectedPostId)[0]
                        .comments.slice(
                          0,
                          showMoreComments
                            ? pageData.posts.filter(
                                (post: any) => post?.id === selectedPostId,
                              )[0].comments.length
                            : 5,
                        )
                        .map((comment: any, index: any) => (
                          <CommentComponent type={pageType} comment={comment} />
                        ))
                    ) : (
                      pageData.posts
                        .filter((post: any) => post.id === selectedPostId)[0]
                        .comments.sort(
                          (a: any, b: any) =>
                            b.sentimentAnalysis - a.sentimentAnalysis,
                        )
                        .slice(
                          0,
                          showMoreComments
                            ? pageData.posts.filter(
                                (post: any) => post?.id === selectedPostId,
                              )[0].comments.length
                            : 5,
                        )
                        .map((comment: any, index: any) => (
                          <CommentComponent type={pageType} comment={comment} />
                        ))
                    )}
                  </div>
                  <div className="seeMore flex justify-center mt-4 p-2">
                    <button
                      className={`${
                        selectedPostId === ""
                          ? "invisible"
                          : selectedPostId !== "" &&
                              pageData.posts.filter(
                                (post: any) => post?.id === selectedPostId,
                              )[0].comments.length === 0
                            ? "invisible"
                            : selectedPostId !== "" &&
                                pageData.posts.filter(
                                  (post: any) => post?.id === selectedPostId,
                                )[0].comments.length <= 5
                              ? "invisible"
                              : "flex"
                      } border-0 bg-transparent text-sm font-bold text-black underline`}
                      onClick={() => setShowMoreComments(!showMoreComments)}
                    >
                      {showMoreComments ? "Ver Menos" : "Ver Mais"}
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
                                <div className="Cards flex flex-col rounded border-[0.3px] border-[#0037c1] w-full lg:w-[49%] py-1 px-2 shadow">
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
                                    className="self-center p-2 border border-[#0037c1] text-sm rounded cursor-pointer hover:scale-[1.01] transition duration-200 ease-in"
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
          {pageType === "instagram" && (
            <>
              <div className="commentsSentimentChartContainer flex flex-col justify-around bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] h-auto w-11/12 my-2 min-h-[30vh] md:min-h-[45vh] xl:min-h-[45vh] 2xl:min-h-[40vh] 3xl:min-h-[30vh]">
                <div className="flex flex-col">
                  <TitleWithBar content="Menções" barColor="#2F5CFC" />
                  <div className="flex flex-wrap gap-1 items-center justify-center">
                    {mentionsData && (
                      <>
                        <div>
                          <ScoreChart
                            score={
                              mentionsData.currentFormat.mentions.mentions
                                .length !== 0
                                ? Number(
                                    mentionsData?.currentFormat.mentions.average.toFixed(
                                      0,
                                    ),
                                  )
                                : 0
                            }
                            id="mentionsScore"
                          />
                        </div>
                        <div>
                          <TotalQuotes
                            value={
                              mentionsData.currentFormat.mentions.mentions
                                .length !== 0
                                ? mentionsData?.currentFormat.mentions.total
                                : 0
                            }
                            firstDate={new Date(
                              new Date().setDate(
                                new Date().getDate() - selectedTimeValues.value,
                              ),
                            ).toLocaleDateString("pt-BR")}
                            lastDate={new Date().toLocaleDateString("pt-BR")}
                          />
                        </div>
                        <SentimentChart
                          positive={
                            mentionsData.currentFormat.mentions.mentions
                              .length !== 0
                              ? mentionsData?.currentFormat.mentions.positive
                              : 0
                          }
                          negative={
                            mentionsData.currentFormat.mentions.mentions
                              .length !== 0
                              ? mentionsData?.currentFormat.mentions.negative
                              : 0
                          }
                          neutral={
                            mentionsData.currentFormat.mentions.mentions
                              .length !== 0
                              ? mentionsData?.currentFormat.mentions.neutral
                              : 0
                          }
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="commentsSentimentChartContainer flex flex-col justify-around bg-white relative xs:p-5 rounded-lg border border-[#c3c3c3] h-auto w-11/12 my-2 min-h-[30vh] md:min-h-[45vh] xl:min-h-[45vh] 2xl:min-h-[45vh] 3xl:min-h-[30vh]">
                <div className="flex flex-col">
                  <TitleWithBar
                    content="Comentários das Menções"
                    barColor="#2F5CFC"
                  />
                  {pageType === "instagram" &&
                    mentionsData &&
                    mentionsData.currentFormat.mentions.mentions.length !==
                      0 && (
                      <>
                        <div className="flex justify-end items-center mt-4">
                          <span
                            className="underline"
                            onClick={() => setSeeMoreMentions(!seeMoreMentions)}
                          >
                            {seeMoreMentions ? "Ver Menos" : "Ver Mais"}
                          </span>
                        </div>
                        <div className="flex flex-col xl:flex-row w-full h-full xl:h-52 xl:p-0 items-center justify-center gap-4 my-4 lg:justify-around">
                          <div className="hidden lg:flex justify-between flex-wrap gap-2 h-full w-full overflow-x-hidden overflow-y-scroll">
                            {mentionsData?.currentFormat.mentions.mentions
                              .slice(
                                0,
                                seeMoreMentions
                                  ? mentionsData.currentFormat.mentions.mentions
                                      .length
                                  : 3,
                              )
                              .map((item: any, index: any) => (
                                <MentionsCard
                                  key={index}
                                  sentimentClassification={
                                    item.sentimentClassification
                                  }
                                  sentiment={item.sentiment}
                                  source={item.profile}
                                  comments={item.comments}
                                  commentSentiment={item.commentSentiment}
                                  url={item.url}
                                  date={item.date
                                    .split("T")[0]
                                    .split("-")
                                    .reverse()
                                    .join("/")}
                                  content={item.title}
                                />
                              ))}
                          </div>
                          <div className="lg:hidden flex flex-col gap-1 h-[70vh]">
                            <Swiper
                              direction="vertical"
                              slidesPerView={seeMoreMentions ? 3.5 : 3}
                              className="mySwiper2 h-full"
                            >
                              {mentionsData?.currentFormat.mentions.mentions
                                .slice(
                                  0,
                                  seeMoreMentions
                                    ? mentionsData.currentFormat.mentions
                                        .mentions.length
                                    : 3,
                                )
                                .map((item: any, index: any) => (
                                  <SwiperSlide>
                                    <MentionsCard
                                      key={index}
                                      sentimentClassification={
                                        item.sentimentClassification
                                      }
                                      sentiment={item.sentiment}
                                      source={item.profile}
                                      comments={item.comments}
                                      commentSentiment={item.commentSentiment}
                                      url={item.url}
                                      date={item.date
                                        .split("T")[0]
                                        .split("-")
                                        .reverse()
                                        .join("/")}
                                      content={item.title}
                                    />
                                  </SwiperSlide>
                                ))}
                            </Swiper>
                          </div>
                        </div>
                      </>
                    )}
                </div>
              </div>
            </>
          )}
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
                                className={`w-4 h-4 ${item.name === "Homens" ? "bg-darkBlueAxion" : item.name === "Mulheres" ? "bg-[#E7298A]" : "bg-[#E5E8F0]"} rounded-full`}
                              />
                              <span className="text-darkBlueAxion font-semibold">
                                {item.value.toFixed(0)}
                              </span>
                            </div>
                            <span className="text-xs text-gray-50">
                              {item.name}
                            </span>
                          </div>
                        ),
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
                        (item: any) => Number(item.percentage),
                      )
                    }
                    labels={
                      metaads &&
                      metaads?.advertising[0].deliveryRegion.map(
                        (item: any) => item.region,
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
