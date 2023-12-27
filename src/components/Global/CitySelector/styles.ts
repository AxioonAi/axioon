import { Dropdown } from "react-bootstrap";
import { styled } from "styled-components";
import px2vw from "@/utils/size";

export const Container = styled.div`
  display: flex;
`;

export const Button = styled(Dropdown)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Toggle = styled(Dropdown.Toggle)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${px2vw(12, 320)};

  @media (min-width: 768px) {
    font-size: ${px2vw(12, 768)};
  }

  @media (min-width: 1024px) {
    font-size: ${px2vw(12, 1024)};
  }
`;

export const Menu = styled(Dropdown.Menu)`
  background-color: #0d123c;
  border: 1px solid ${({ theme }) => theme.color.secondary_100};

  opacity: 0.95;
  padding: 0 5px;
`;

export const ItemText = styled(Dropdown.ItemText)`
  color: ${({ theme }) => theme.color.primary_80};
`;

export const Item = styled(Dropdown.Item)`
  text-align: center;
  color: ${({ theme }) => theme.color.gray_10};
  border-bottom: 1px solid ${({ theme }) => theme.color.gray_10};
  padding: 10px;
  &:hover {
    color: #0d123c;
  }
  &:last-child {
    border: 0;
  }
`;
