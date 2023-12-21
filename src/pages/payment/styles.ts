import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
`

export const Main = styled.main`

`

export const RadioContainer = styled.div`
  display: flex;
  gap: 1.25rem;
`;

export const RadioGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;

  input[type="radio"] {
    display: none;
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

export const PaymentContainer = styled.div`
  padding: 5rem 4rem;
`

export const PaymentSelector = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`