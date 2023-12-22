import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  padding-bottom: 4rem;
  min-height: 100vh;
`;

export const Main = styled.main`
  display: flex;
  justify-content: space-between;

  @media (max-width: 1180px) {
    flex-direction: column-reverse;
  }
`;

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

  @media (max-width: 1180px) {
    margin: auto;
  }
`;

export const PaymentSelector = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const SelectedPlan = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 2rem;
  gap: 2rem;

  @media (max-width: 1180px) {
    margin: auto;
  }
`;

export const ArtContainer = styled.div`
  position: relative;
  width: 487.408px;
  height: 647.094px;
  flex-shrink: 0;
  border-radius: 7.568px;
  border: 0.757px solid #0d123c;
  background: linear-gradient(to bottom right, #0d123c 75%, #fff 100%, #000 50%)
      bottom right / 51% 51% no-repeat,
    linear-gradient(to bottom left, #0d123c 75%, #fff 100%, #000 50%) bottom
      left / 51% 51% no-repeat,
    linear-gradient(to top left, #0d123c 75%, #fff 100%, #000 50%) top left /
      50% 51% no-repeat,
    linear-gradient(to top right, #0d123c 75%, #fff 100%, #000 50%) top right /
      51% 50% no-repeat;

  .logoContainer {
    display: flex;
    justify-content: center;
    margin-top: 4rem;
  }

  .art {
    position: absolute;
    bottom: 0;
    right: 0;
  }
`;
