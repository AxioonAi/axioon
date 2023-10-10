import { styled } from "styled-components";

interface ContainerProps {
  type: boolean;
}

export const Container = styled.div`
  display: flex;
`;

export const Content = styled.div`
  background-color: ${({ theme }) => theme.color.gray_10};
  width: calc(100% - 17rem);
`;

export const Main = styled.main`
  margin: 2%;
  background-color: white;
  border-radius: 10px;
  padding: 2.25rem;

  header {
    display: flex;
    justify-content: space-between;
    color: ${({ theme }) => theme.color.gray_100};

    h2 {
      font-size: 1.6rem;
      font-weight: 600;
    }

    button {
      background-color: ${({ theme }) => theme.color.brand_blue};
      color: white;
      border: 0;
      border-radius: 6px;
      padding: 0.75rem 3rem;
      transition: 0.3s;

      &:hover {
        background-color: ${({ theme }) => theme.color.brand_blue_hover};
      }
    }
  }

  label {
    font-weight: 600;
  }
`;

export const PersonalInfo = styled.div`
  display: grid;
  grid-template-columns: 8rem 1fr 1fr;
  justify-items: center;
  margin-top: 4rem;
`;

export const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 5rem;
    height: 5rem;
    object-fit: cover;
  }

  button {
    background-color: transparent;
    border: 0;
    color: ${({ theme }) => theme.color.brand_blue};
    transition: 0.3s;

    &:hover {
      color: ${({ theme }) => theme.color.brand_blue_hover};
    }
  }
`;

export const FormGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-direction: column;

  input,
  select,
  option {
    padding: 1.25rem 1rem;
    width: 30vw;
    border-radius: 5px;
    border: 1px solid ${({ theme }) => theme.color.gray_20};
    outline: 0;
    color: ${({ theme }) => theme.color.gray_100};
    font-size: 0.9rem;
  }
`;

export const RadioContainer = styled.div`
  display: flex;
  gap: 1.25rem;

  input[type="radio"] {
    display: none;
  }
`;

export const RadioGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

interface RadioSelectorProps {
  checked: boolean;
}

export const RadioSelector = styled.label<RadioSelectorProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.625rem;
  height: 1.625rem;
  border: 1px solid ${({ theme }) => theme.color.gray_60};
  border-radius: 50%;

  div {
    width: 1.125rem;
    height: 1.125rem;
    background-color: ${({ theme, checked }) =>
      checked ? theme.color.gray_60 : "trasnsparent"};
    border-radius: 50%;
  }
`;

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const CompanyInfo = styled.div`
  display: grid;
  grid-template-columns: 8rem 1fr 1fr;
  justify-items: center;
`;

export const UpdateInfo = styled.button`
  background-color: ${({ theme }) => theme.color.darkBlueAxion};
  color: white;
  border: 0;
  border-radius: 5px;
  padding: 1.2rem;
  transition: 0.3s;
  margin-top: 1.7rem;

  &:hover {
    background-color: ${({ theme }) => theme.color.hoverDarkBlueAxion};
  }
`;

export const DeleteAccount = styled.div`
  display: flex;
  justify-content: flex-end;

  button {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    border: 0;
    background-color: transparent;
    color: ${({ theme }) => theme.color.red_70};
    transition: 0.3s;
    font-weight: bold;

    svg {
      width: 1rem;
      height: 1rem;
    }

    &:hover {
      color: ${({theme}) => theme.color.red_90};
    }
  }
`;
