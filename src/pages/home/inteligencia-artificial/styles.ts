import { styled } from "styled-components";

export const Content = styled.div`
  background-color: ${({ theme }) => theme.color.gray_10};
  margin: 0.37rem 0 1rem 0.4rem;
  border-radius: 25px 0 0 25px;
  padding: 1.2rem;
  position: relative;
  width: calc(100% - 17rem);
  left: calc(100% - 17rem);

  @media(max-width: 1024px) {
    width: 100%;
    left: 100%;
  }
`;

export const ChatConteiner = styled.div`
  height: 95vh;
  background-color: #fff;
  border-radius: 50px;
  padding: 2rem 0 1rem;
  transition: 0.3s ease-in;
`;

export const ChatContent = styled.div`
  height: 100%;
  max-width: 57rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: auto;
`;

export const ChatHeader = styled.header`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

export const IaImgContainer = styled.div`
  background: linear-gradient(109deg, #d8d8d8 0%, #0d123c 96.63%);
  border-radius: 6px;
  width: 48px;
  height: 29px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ChatFooter = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.75rem;
`;

export const SuggestionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  @media (max-width: 1200px) {
    gap: 1rem;
    align-items: center;
    flex-direction: column;
  }
`;

export const TextareaAndButton = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 1rem;

  #chatInput {
    border-radius: 10px;
    border: 2px solid #0d123c;
    resize: none;
    width: 100%;
    max-width: 57rem;
    overflow: hidden;
    padding: 0.875rem;
    height: 3.5rem;
    font-size: 1.2rem;
    &::-webkit-scrollbar {
      width: 10px;
    }

    &::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    &::-webkit-scrollbar-thumb {
      background: #cfcfcf;
      border-radius: 5px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: #ababab;
    }

    &::placeholder {
      font-family: Bruno Ace SC, sans-serif;
      color: #8c8c8c;
      font-size: 1.2rem;
    }
  }

  button {
    border: 0;
    background: transparent;
    margin-bottom: 0.5rem;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }
`;
