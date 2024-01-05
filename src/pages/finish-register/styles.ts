import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 22rem;

  strong {
    font-size: 1.5rem;
  }

  span {
    font-size: 1.1rem;
  }

  @media (min-width: 768px) {
    strong {
      font-size: 3rem;
    }

    span {
      font-size: 1.4rem;
    }
  }
`;

export const AccessButton = styled.button`
  background-color: ${({ theme }) => theme.color.darkBlueAxion};
  color: white;
  padding: 0.6rem 5rem;
  border: 0;
  border-radius: 5px;
  margin-top: 2rem;
  transition: 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.color.hoverDarkBlueAxion};
  }

  @media (min-width: 768px) {
    padding: 1rem 10rem;
  }
`;
