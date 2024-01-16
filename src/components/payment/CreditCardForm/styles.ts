import styled from "styled-components";

export const FormContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 35rem;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const FormDiv = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const RadioDiv = styled(FormDiv)`
  @media (max-width: 768px) {
    justify-content: center;
    flex-direction: row;
  }

  @media (max-width: 450px) {
    flex-direction: column;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;

  label {
    font-weight: 600;
    color: #4e4b59;
    font-size: 0.875rem;
  }

  input {
    padding: 0.75rem;
    width: 15rem;
    border-radius: 5px;
    border: 1px solid #d7d9dd;
    font-size: 0.875rem;

    &:focus {
      outline: none;
      border: 1px solid black;
    }
  }

  @media (max-width: 768px) {
    input[type="text"] {
      width: 100%;
    }
  }
`;

export const RadioGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  padding: 0.75rem 0;
  width: 15rem;

  input[type="radio"] {
    display: none;
  }

  @media (max-width: 768px) {
    width: auto;
  }
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
    transition: 0.3s;
    width: 1.125rem;
    height: 1.125rem;
    background-color: ${({ theme, checked }) =>
      checked ? theme.color.gray_60 : "trasnsparent"};
    border-radius: 50%;
  }
`;

export const PaymentSelector = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const FinishPayment = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;

  button {
    background-color: #0d123c;
    width: 20rem;
    height: 3.5rem;
    border-radius: 5px;
    color: white;
    font-weight: bold;
  }

  @media (max-width: 768px) {
    button {
      width: 16rem;
    }
  }
`;
