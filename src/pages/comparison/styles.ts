import styled from "styled-components";

interface ComparisonProps {
  type: "instagram" | "facebook" | "tiktok" | "youtube";
  percentage: number;
  user: 1 | 2;
}

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.color.gray_10};
  margin: 0.37rem 0 1rem 0.4rem;
  border-radius: 25px 0 0 25px;
  padding: 1.2rem;
  position: relative;
  width: calc(100% - 17rem);
  left: calc(100% - 17rem);
  align-items: center;
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: white;
  width: 100%;
  margin: 2%;
  border-radius: 10px;
  padding: 2%;
`;

export const HeadToHeadBar = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.color.darkBlueAxion};
  width: 100%;
  height: 3rem;
  border-radius: 10px;
  margin-top: 2%;
  justify-content: space-between;
  align-items: center;
`;

export const CenterContainer = styled.div`
  display: flex;
  width: 20%;
  background-color: white;
  justify-content: space-between;
`;

export const ImageCircle = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.color.darkBlueAxion};
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
`;

export const Image = styled.img`
  width: 3rem;
  height: 3rem;
`;

export const Grid = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  margin-top: 2%;
  padding: 2%;
  border: 1px solid #bebebe;
  justify-content: space-between;
`;

export const IndividualContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

export const GridLine = styled.div`
  background-color: transparent;
  border: 1px solid #bebebe;
`;

export const ComparisonBars = styled.div<ComparisonProps>`
  display: flex;
  flex-direction: row;
  background-color: ${({ type }) =>
    type === "instagram"
      ? "#EE4B5F"
      : type === "facebook"
      ? "#0037C1"
      : type === "tiktok"
      ? "#80C7CF"
      : "#ff0000"};
  border-radius: 20px;
  color: white;
  width: ${({ percentage }) => percentage + "%"};
  height: 2.5rem;
  align-items: center;
  justify-content: space-between;
  padding: ${({ user }) => (user === 1 ? "0 30px 0 10px" : "0 10px 0 30px")};
`;
