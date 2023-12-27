import styled from "styled-components";

interface Props {
  barColor: string;
  textColor: string;
  width?: string;
}

export const TitleContainer = styled.div<Props>`
  position: relative;
  padding-bottom: 0.2rem;
  font-size: 1.5rem;
  width: ${({ width }) => (width ? width : "auto")};

  h2 {
    color: ${({ textColor }) => textColor};
  }

  .bottom-bar {
    position: absolute;
    height: 0.75rem;
    width: 5.5rem;
    background-color: ${({ barColor }) => barColor};
    bottom: 0;
  }

  @media(max-width: 768px) {
    font-size: 1.3rem;
    width: 100%;
  }
`;
