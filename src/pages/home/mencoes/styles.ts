import { styled } from "styled-components";

interface ContainerProps {
  type: boolean;
}

export const Content = styled.div`
  background-color: ${({ theme }) => theme.color.gray_10};
  margin: 0.37rem 0 1rem 0.4rem;
  border-radius: 25px 0 0 25px;
  padding: 1.2rem;
  position: relative;
  width: calc(100% - 18rem);
  left: calc(100% - 18rem);

  @media (max-width: 1024px) {
    width: 100%;
    left: 100%;
  }

  @media (max-width: 768px) {
    padding: 1.2rem 0.5rem;
  }
`;

export const Main = styled.main`
  margin: 2%;
  border-radius: 10px;
  max-width: 1080px;
  margin: 2% auto;
`;

export const TopCardsContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: space-around;

  @media (max-width: 1420px) {
    max-width: 800px;
    margin: auto;
    justify-content: space-between;
  }

  @media (max-width: 768px) {
    justify-content: center;
  }

  .sentimentChartContainer {
    width: 30rem;

    @media (max-width: 1420px) {
      width: 100%;
    }

    @media (max-width: 768px) {
      width: 100%;
    }
  }
`;

export const CardsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 1.8rem 0;

  @media (max-width: 1320px) {
    justify-content: space-around;
  }
`;
