import { Modal } from "react-bootstrap";
import styled from "styled-components";

interface ModalProps {
  isVisible: boolean;
}

export const Content = styled.main<ModalProps>`
  margin: auto;
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.4em;
`;

export const FormHeader = styled.div`
  margin-bottom: 2rem;
  text-align: center;
  div {
    display: flex;
    justify-content: center;
    margin: 3.5rem 0 1.5rem;
  }

  h1 {
    font-size: 1.6rem;
    font-weight: bold;
    text-align: center;
  }

  span {
    font-weight: 0.875rem;
    text-align: center;
    color: ${({ theme }) => theme.color.gray_80};
  }
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
  padding: 0 2rem;

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
