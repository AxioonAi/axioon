import { TitleWithBar } from "@/components/Global/TitleWithBar";
import {
  ChartContainer,
  ChartsContainer,
  Comments,
  CommentsContainer,
  CommentsHeader,
  KeyIndicatorContent,
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
} from "./styles";
import { PostEngagement } from "../PostEngagement";
import { ScoreChart } from "../../ScoreChart";
import { VotersActive } from "../VotersActive";
import { SmallBarChart } from "../SmallBarChart";
import { KeyIndicator } from "../KeyIndicator";
import { VotersInfoSelect } from "@/components/home/seu-eleitorado/VotersInfoSelect";
import { useState } from "react";
import { OrderSelect } from "../OrderSelect";
import { PostComponent } from "../PostComponent";
import { CommentComponent } from "../ComentComponent";
import { ChartTip } from "../ChartTip";
import { KeyIndicators } from "../KeyIndicators";
import px2vw from "@/utils/size";
import { GlobalButton } from "@/components/Global/Button";
import { Modal } from "react-bootstrap";
import Theme from "@/styles/themes";

interface Props {
  pageType: "instagram" | "facebook" | "youtube" | "tiktok";
  id: string;
}

export function SocialMidiaPage({ pageType, id }: Props) {
  const keyIndicatorsData = [
    { name: "Likes", previousValue: 12000, currentValue: 9000 },
    { name: "Comentários", previousValue: 12000, currentValue: 9000 },
    { name: "Sentimento Médio", previousValue: 12000, currentValue: 9000 },
    { name: "Compartilhamentos", previousValue: 12000, currentValue: 9000 },
  ];

  const [selectedValue, setSelectedValue] = useState("Relevância");
  const values = ["Relevância", "Mais recente"];

  const posts = [1, 2, 3];

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

  const [showModal, setShowModal] = useState(false);

  return (
    <PageContainer>
      <ChartsContainer>
        <PostEngagmentContainer>
          <TitleWithBar
            content="Engajamento de Publicações"
            barColor="#12A9E7"
            className="mb-4 title"
          />
          <PostEngagement />
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
            <ScoreChart id={id} score={750} />
          </div>
          <div
            style={{
              width: "90%",
              borderTop: "1px solid #000000",
              margin: "0 auto",
            }}
          />
          <div className="p-5">
            <SmallBarChart />
          </div>
        </ScoreChartContainer>

        <KeyIndicatorsContainer>
          <TitleWithBar
            content="Indicadores Chave:"
            barColor="#12A9E7"
            subTitle
          />
          <ChartTip content="my text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when a..." />
          <KeyIndicators />
        </KeyIndicatorsContainer>

        <VotersActiveContainer>
          <TitleWithBar
            content="Horário que os Eleitores estão mais Ativos em Sua Rede Social:"
            barColor="#12A9E7"
            subTitle
          />
          <div className="chart">
            <VotersActive />
          </div>

          <Tip>
            <img src="/dashboard/userIcon.svg" alt="" />
            <p>
              Se quiser ter um maior alcance nas Redes Sociais se atente a estes
              horários.
            </p>
          </Tip>
        </VotersActiveContainer>
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
                  gap: "1rem",
                  padding: "0 0.875rem",
                }}
              >
                {posts.map((post, index) => (
                  <PostComponent
                    type={pageType}
                    likes={Math.floor(Math.random() * 5000)}
                    comments={Math.floor(Math.random() * 5000)}
                    feedbacks={Math.floor(Math.random() * 5000)}
                  />
                ))}
              </div>
              <SeeMorePosts>
                <button>Ver mais</button>
              </SeeMorePosts>
            </PostsContainer>

            <CommentsContainer>
              <CommentsHeader>
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
              </CommentsHeader>
              <Comments>
                <CommentComponent
                  type={pageType}
                  likes={Math.floor(Math.random() * 5000)}
                  comments={Math.floor(Math.random() * 5000)}
                  commentScore={700}
                />
                <CommentComponent
                  type={pageType}
                  likes={Math.floor(Math.random() * 5000)}
                  comments={Math.floor(Math.random() * 5000)}
                  commentScore={700}
                />
                <CommentComponent
                  type={pageType}
                  likes={Math.floor(Math.random() * 5000)}
                  comments={Math.floor(Math.random() * 5000)}
                  commentScore={700}
                />
                <CommentComponent
                  type={pageType}
                  likes={Math.floor(Math.random() * 5000)}
                  comments={Math.floor(Math.random() * 5000)}
                  commentScore={700}
                />
                <CommentComponent
                  type={pageType}
                  likes={Math.floor(Math.random() * 5000)}
                  comments={Math.floor(Math.random() * 5000)}
                  commentScore={700}
                />
              </Comments>
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
      <Modal show={showModal} onHide={() => setShowModal(false)} />
    </PageContainer>
  );
}
