import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  padding-bottom: 4rem;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding-bottom: 8rem;
  }
`;

export const Main = styled.main`
  display: flex;
  justify-content: space-between;
  max-width: 1440px;
  margin: auto;

  @media (max-width: 1180px) {
    flex-direction: column-reverse;
  }
`;
