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

  @media (max-width: 1023px) {
    width: 100%;
    left: 100%;
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
  }

  @media (max-width: 425px) {
    padding: 0.1rem;
    margin: 0.37rem 0 1rem 0.1rem;
  }
`;

export const Header = styled.header`
  height: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
`;

export const Main = styled.main`
  margin: 2%;
  border-radius: 10px;

  @media (max-width: 768px) {
    margin: 0;
  }
`;

export const LikesAndComentsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 0.6rem;
  flex-wrap: wrap;
`;

export const ChartsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(32rem, 1fr));
  justify-items: center;
  align-items: center;
  gap: 3rem;
  margin-top: 1.2rem;
`;

export const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1.25rem;
  width: 35rem;
  height: 100%;
  background-color: #fff;
  border-radius: 10px;
  border: 0.3px solid #c3c3c3;

  .chartContent {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }
`;

export const ChartCenterInfo = styled.div`
  position: absolute;
  top: 49%;
  left: 36%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  align-items: center;

  .percentage {
    line-height: 1;
    font-size: 2rem;
  }

  .gain {
    font-size: 0.7rem;
    color: #22c24f;
  }

  .description {
    font-size: 0.7rem;
    color: #8790ab;
  }
`;

export const FollowerDataLegendContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
