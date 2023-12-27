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

  @media (max-width: 1024px) {
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
  align-items: center;
  text-align: center;
  background-color: white;
  width: 90%;
  margin: 2%;
  border-radius: 10px;
  padding: 2%;
`;

export const NotificationsRows = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-top: 3rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray_20};
  color: ${({ theme }) => theme.color.darkBlueAxion};
`;
