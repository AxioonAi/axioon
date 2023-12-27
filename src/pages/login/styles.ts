import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  position: relative;
  padding-bottom: 4rem;
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

export const LoginForm = styled.div`
  /* width: 50vw; */
  padding: 0 8%;

  @media (min-width: 1024px) {
    width: 50vw;
  }

  .loginButton {
    width: 100%;
    padding: 0.5rem 0;
    margin: 2rem 0 2rem;
  }
`;

export const AxionLogo = styled.div`
  display: flex;
  justify-content: center;
  padding: 5vh;

  img {
    width: 12rem;
  }

  @media (min-width: 1024px) {
    img {
      width: auto;
    }
  }
`;

export const LoginFormHeader = styled.div`
  display: flex;
  flex-direction: column;

  strong {
    font-size: 1.4rem;
  }

  span {
    font-size: 0.9rem;
  }
`;

export const GoogleLogin = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid ${({ theme }) => theme.color.gray_60};
  border-radius: 9px;
  padding: 1rem 0;
  margin: 2.5vh 0;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2vh;

  & label {
    font-size: 0.9rem;
    font-weight: 500;
  }

  & input {
    padding: 0.5rem;
    border: 1px solid lightgray;
    border-radius: 5px;
    transition: 0.3s;
  }

  img {
    position: absolute;
    right: 1rem;
    bottom: 0.6rem;
    cursor: pointer;
  }
`;

export const PasswordRecovery = styled.div`
  display: flex;
  justify-content: flex-end;

  button {
    background: transparent;
    border: 0;
    color: ${({ theme }) => theme.color.brand_blue};
  }
`;

export const LoginButton = styled.button`
  width: 100%;
  padding: 0.8rem;
  border-radius: 5px;
  margin: 3vh 0;
  border: 0;
  background-color: ${({ theme }) => theme.color.darkBlueAxion};
  color: white;
  font-weight: bold;
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
