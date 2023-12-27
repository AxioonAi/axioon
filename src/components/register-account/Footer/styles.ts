import styled from "styled-components";

interface Props {
  type: "light" | "dark";
}

export const StyledFooter = styled.footer<Props>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid
    ${({ theme, type }) => (type === "light" ? theme.color.gray_60 : "#fff")};
  height: 10rem;
  font-size: 0.85rem;
  color: ${({ type }) => (type === "light" ? "#4e4b59" : "#fff")};
  position: absolute;
  bottom: 0;
  width: 100%;

  & > * {
    margin: 0 1rem;
  }

  p {
    margin: 0;
  }

  @media (min-width: 768px) {
    height: 4rem;
  }
`;
