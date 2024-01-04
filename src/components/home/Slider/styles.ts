import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 9.5rem;
  height: 0.625rem;
  border-radius: 5px;

  @media (max-width: 768px) {
    width: 7rem;
  }
`;

interface FillProps {
  fill: string | number;
  fillColor: string;
}

export const SliderFilled = styled.div<FillProps>`
  position: relative;
  width: ${(props) => props.fill};
  height: 100%;
  border-radius: 10px 0 0 10px;
  background: ${(props) => props.fillColor};
`;

interface EmptyProps {
  empty: string | number;
  emptyColor: string;
}

export const SliderEmpty = styled.div<EmptyProps>`
  width: ${(props) => props.empty};
  height: 100%;
  background-color: ${(props) => props.emptyColor};
  border-radius: 0 10px 10px 0;
`;
