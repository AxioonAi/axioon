import styled from "styled-components";

interface ModalProps {
  isVisible: boolean;
}

export const Content = styled.main<ModalProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1.4rem;
  padding: 1rem;
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  align-self: center;
  gap: 1.4rem;
`;

export const FormGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-direction: column;

  label {
    font-weight: 600;
  }

  input {
    padding: 1.25rem 1rem;
    border-radius: 5px;
    border: 1px solid ${({ theme }) => theme.color.gray_20};
    outline: 0;
    color: ${({ theme }) => theme.color.gray_100};
    font-size: 0.9rem;
  }
`;

export const SuccessModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 7.5rem;
    height: 7.5rem;
    margin: 3.5rem 0 1.5rem;
  }

  h2 {
    color: ${({ theme }) => theme.color.gray_100};
    font-size: 1.6rem;
    text-align: center;
    font-weight: 600;
  }

  span {
    text-align: center;
    color: ${({ theme }) => theme.color.gray_100};
  }

  .button {
    width: 70%;
    margin: 3rem 0 4.5rem;
  }
`;
