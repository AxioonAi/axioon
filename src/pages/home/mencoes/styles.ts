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
  width: calc(100% - 17rem);
  left: calc(100% - 17rem);
`;

export const Main = styled.main`
  margin: 2%;
  border-radius: 10px;
`;

export const TopCardsContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: space-around;
`;

export const CardsContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));
  justify-items: center;
  gap: 1rem;
  margin: 1.8rem 0;
`;