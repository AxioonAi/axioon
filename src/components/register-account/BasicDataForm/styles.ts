import styled from "styled-components";

export const RegisterForm = styled.div``;

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
