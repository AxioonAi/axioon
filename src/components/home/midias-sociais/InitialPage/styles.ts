import styled from "styled-components";

export const ChartsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(32rem, 1fr));
  justify-items: center;
  align-items: center;
  gap: 3rem;
  margin-top: 1.2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ChartContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
  background-color: #fff;
  border-radius: 10px;
  border: 0.3px solid #c3c3c3;

  .chartContent {
    @media (min-width: 768px) {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
    }
  }
`;

export const EngagmentDataContainer = styled(ChartContainer)`
  width: 35rem;
  height: 30rem;

  .chartContent {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 3rem;
  }

  .legends {
    width: auto;
    height: auto;
    margin-left: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
    width: 100%;
    height: 37rem;

    .chartContent {
      flex-direction: column-reverse;
    }

    .chart {
      width: 100%;
      max-height: 20rem;
      display: flex;
      justify-content: center;
    }

    .legends {
      justify-content: center;
      flex-direction: row;
      margin-bottom: 1rem;
      flex-wrap: wrap;
    }
  }
`;

export const EngagmentLegendContainer = styled.div<EngagmentLegendProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .circle {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: ${({ circleColor }) => circleColor};
  }

  strong {
    width: 4rem;
    font-size: 0.75rem;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    strong {
      width: auto;
    }
  }
`;

export const WordCloudContainer = styled(ChartContainer)`
  width: 35rem;
  height: 30rem;

  @media (max-width: 768px) {
    width: 100%;
  }

  @media (max-width: 550px) {
    height: 35rem;
    padding: 1rem 0rem;

    .title {
      padding: 1rem 0.5rem;
    }
  }
`;

export const KeyIndicatorsContainer = styled(ChartContainer)`
  width: 35rem;
  height: 30rem;

  @media (max-width: 768px) {
    width: 100%;
  }

  @media (max-width: 550px) {
    height: 31rem;
    padding: 1rem 0.4rem;
  }
`;

export const ChartCenterInfo = styled.div`
  position: absolute;
  top: 25%;
  left: 50%;
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

interface EngagmentLegendProps {
  circleColor: string;
}

export const FollowerDataContainer = styled(ChartContainer)``;
