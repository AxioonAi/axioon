import styled from "styled-components";

export const RegisterHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray_60};

  img {
    width: 7rem;
    height: auto;
    margin-left: 2%;
  }

  button {
    padding: 0.6rem 0.8rem;
    border: 1px solid ${({ theme }) => theme.color.darkBlueAxion};
    border-radius: 5px;
    color: ${({ theme }) => theme.color.darkBlueAxion};
    font-weight: bold;
    margin-right: 2%;
    transition: 0.3s;
    font-size: 0.8rem;
    background-color: transparent;

    &:hover {
      background-color: ${({ theme }) => theme.color.darkBlueAxion};
      color: white;
    }
  }

  @media(min-width: 768px) {
    img {
      width: 10rem;
      font-size: 1rem;
    }
  }
`;
