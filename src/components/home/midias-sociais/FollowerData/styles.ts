import styled from "styled-components";

export const Container = styled.div`
  /* position: relative;
  height: 50vh;

  @media (min-width: 768px) {
    height: 70vh;
    width: 90%;
  }

  @media (min-width: 1024px) {
    height: 27rem;
    width: 27rem;
  }

  @media (min-width: 1440px) {
    height: 26rem;
    width: 26rem;
  } */
`;

export const ChartCenterInfo = styled.div`
  position: absolute;
  top: 50%;
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
