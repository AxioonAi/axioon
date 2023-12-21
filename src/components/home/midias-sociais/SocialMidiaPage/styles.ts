import Theme from "@/styles/themes";
import Image from "next/image";
import styled from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 1200px;
  margin: auto;
  padding: 0.5rem;
`;

export const ChartsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  /* display: grid;
  grid-template-columns: 33rem 33rem;
  justify-items: center;
  align-items: center; */
  /* gap: 1rem; */
  width: 100%;

  @media (max-width: 1420px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 768px) {
    .title {
      padding: 0.5rem;
    }
  }
`;

export const ChartContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-color: #fff;
  border-radius: 10px;
  border: 0.3px solid #c3c3c3;
  margin-bottom: 2rem;

  @media (max-width: 500px) {
    padding: 1rem 0.3rem;
  }
`;

export const PostEngagmentContainer = styled(ChartContainer)`
  width: 33rem;
  height: 25rem;

  @media (max-width: 768px) {
    width: 100%;
    height: 25rem;
    padding: 0;

    .title {
      margin: 1rem 1rem 3rem 1rem;
    }
  }
`;

export const ScoreChartContainer = styled(PostEngagmentContainer)`
  @media (max-width: 768px) {
    height: 30rem;
  }

  @media (max-width: 500px) {
    height: 37rem;
  }
`;

export const KeyIndicatorsContainer = styled(ChartContainer)`
  width: 33rem;
  height: 30rem;

  @media (max-width: 768px) {
    width: 100%;
  }

  @media (max-width: 550px) {
    height: 31rem;
    padding: 1rem 0.4rem;
  }
`;

export const VotersActiveContainer = styled(ChartContainer)`
  width: 33rem;
  height: 30rem;

  .chart {
    height: 23rem;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 29rem;

    .chart {
      height: 18rem;
    }
  }
`;

export const Tip = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  p {
    font-size: 0.75rem;
    margin: 0;
    padding: 0;
  }
`;

// export const KeyIndicatorsContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: space-around;
//   height: 100%;
//   width: 100%;
//   padding-top: 3rem;
// `;

export const KeyIndicatorContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 1rem 1rem 2rem;
`;

export const PostsAndComments = styled.div`
  display: grid;
  grid-template-columns: 54% 45%;
  grid-gap: 1%;

  @media (max-width: 1380px) {
    grid-template-columns: 1fr;
  }
`;

export const PostsContainer = styled.div`
  background-color: white;
  border-radius: 15px;
  margin-top: 0.5rem;
  border: 0.3px solid #c3c3c3;
  width: 95%;

  @media (min-width: 768px) {
    width: 100%;
  }
`;

export const PostsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 3rem;
  }
`;

export const LabelAndSelect = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;

  @media (max-width: 768px) {
    /* flex-direction: column; */
  }
`;

export const SeeMorePosts = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
  padding: 0.5rem;

  button {
    border: 0;
    background-color: transparent;
    font-size: 0.8rem;
    font-weight: bold;
    color: black;
    text-decoration: underline;
  }
`;

export const CommentsContainer = styled.div`
  background-color: white;
  border-radius: 15px;
  margin-top: 0.5rem;
  padding: 0 1rem 2rem;
  border: 0.3px solid #c3c3c3;
  width: 95%;

  @media (min-width: 768px) {
    width: 100%;
  }
`;

export const CommentsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 3rem;
  }
`;

export const Comments = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const MetaAdsContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-color: #fff;
  border-radius: 10px;
  border: 0.3px solid #c3c3c3;
  margin-top: 0.5rem;
  margin-bottom: 2rem;
  width: 100%;
`;

export const MetaAdsLogo = styled(Image)`
  position: absolute;
  width: 30vw;
  height: 10vh;
  margin-left: 5%;

  @media (min-width: 768px) {
    width: 20vw;
    margin-left: 0;
  }

  @media (min-width: 1024px) {
    width: 12vw;
  }
`;

export const MetaAdsCardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  gap: 1rem;
  margin-top: 15%;

  @media (min-width: 768px) {
    margin-top: 10%;
  }

  @media (min-width: 1024px) {
    margin-top: 7%;
  }
`;

export const MetaAdsCards = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  border: 0.3px solid #0037c1;
  padding: 5px 10px;
  width: 100%;

  @media (min-width: 1024px) {
    width: 40%;
  }
`;
