import px2vw from "@/utils/size";
import { Button } from "react-bootstrap";
import { styled } from "styled-components";

interface ButtonProps {
  background: string;
  color: string;
  fontSize?: number;
  width: string | number;
  height: string | number;
  loading: boolean;
}

export const Container = styled.button<ButtonProps>`
  background: ${(props) => (props.background ? props.background : "black")};
  color: ${({ color, theme }) => (color ? color : theme.color.gray_10)};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  font-size: ${(props) =>
    props.fontSize ? `${px2vw(props.fontSize, 320)}` : `${px2vw(15, 320)}`};

  @media (min-width: 768px) {
    font-size: ${(props) =>
      props.fontSize ? `${px2vw(props.fontSize, 768)}` : `${px2vw(15, 768)}`};
  }

  @media (min-width: 1024px) {
    font-size: ${(props) =>
      props.fontSize ? `${px2vw(props.fontSize, 1024)}` : `${px2vw(15, 1024)}`};
  }
  border: 0;
  font-weight: bold;
  transition: 0.3s ease-in-out;
  &:disabled {
    background-color: ${({ theme }) => theme.color.secondary_60};
  }

  &:hover {
    cursor: pointer;
    background: ${(props) => (props.background ? props.background : "black")};
    opacity: 0.8;
    scale: 1.025;
  }

  &:focus {
    background: ${(props) => (props.background ? props.background : "black")};
    opacity: 0.8;
    scale: 1.025;
  }
`;
