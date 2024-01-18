import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  position: relative;
  padding-bottom: 4rem;
`;

interface ProgressBarProps {
  step: number;
}

export const ProgressBar = styled.div<ProgressBarProps>`
  position: absolute;
  top: 3.7rem;
  background-color: ${({ theme }) => theme.color.darkBlueAxion};
  height: 5px;
  transition: 0.5s ease-in-out;

  width: ${({ step }) =>
    step === 1 ? "10%" : step === 2 ? "50%" : step === 3 ? "90%" : "100%"};
`;

export const Main = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 6.1rem;

  @media (min-width: 768px) {
    margin-bottom: 0;
  }

  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;

export const FormContainer = styled.div`
  width: calc(100% - 3vw);
  padding: 0 8%;

  @media (min-width: 1024px) {
    width: 50vw;
  }

  .loginButton {
    width: 100%;
    padding: 1rem 0;
    margin: 2.8rem 0 2rem;
  }
`;

export const RegisterFormHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 6vh;

  strong {
    font-size: 1.5rem;
  }

  span {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.color.gray_80};
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 4vh;

  & label {
    font-size: 0.9rem;
    font-weight: bold;
  }

  & input {
    padding: 0.5rem;
    border: 1px solid lightgray;
    border-radius: 5px;
    transition: 0.3s;
  }
`;

export const PasswordRecovery = styled.div`
  display: flex;
  justify-content: flex-end;

  button {
    border: 0;
    color: ${({ theme }) => theme.color.brand_blue};
  }
`;

export const TermsContainer = styled.div`
  display: flex;
  gap: 0.3rem;
  align-items: center;
  font-size: 0.9rem;

  input {
  }

  span {
    color: ${({ theme }) => theme.color.brand_blue};
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      color: ${({ theme }) => theme.color.purpleAxion};
    }
  }
`;

export const NextButton = styled.button`
  width: 100%;
  padding: 0.8rem;
  border-radius: 5px;
  margin: 3vh 0;
  border: 0;
  background-color: ${({ theme }) => theme.color.darkBlueAxion};
  border: 2px solid ${({ theme }) => theme.color.darkBlueAxion};
  color: white;
  font-weight: bold;
`;

export const BackButton = styled(NextButton)`
  background-color: transparent;
  color: ${({ theme }) => theme.color.darkBlueAxion};
`;

export const ArtSection = styled.div`
  position: relative;
  align-self: flex-start;
  background-image: url("/foto.png");
  min-height: 100vh;
  height: 100%;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top center;

  @media (min-width: 1024px) {
    width: 50vw;
  }
`;
