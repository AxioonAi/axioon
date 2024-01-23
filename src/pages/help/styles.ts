import styled from "styled-components";

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.color.gray_10};
  margin: 0.37rem 0 1rem 0.4rem;
  border-radius: 25px 0 0 25px;
  padding: 1.2rem;
  position: relative;
  width: calc(100% - 18rem);
  left: calc(100% - 18rem);
  align-items: center;
  @media (max-width: 1023px) {
    width: 100%;
    left: 100%;
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 90%;
  height: 100%;
  margin: 2%;
  border-radius: 10px;
  padding: 2%;
`;

export const Cards = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border-radius: 10px;
  border: 1px solid black;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.25);
  background-color: white;
  width: 25%;
  margin: 2%;
  padding: 1%;
`;
