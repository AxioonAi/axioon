import { keyframes, styled } from "styled-components";

export const Content = styled.div`
  background-color: ${({ theme }) => theme.color.gray_10};
  margin: 0.37rem 0 1rem 0.4rem;
  border-radius: 25px 0 0 25px;
  padding: 1.2rem;
  position: relative;
  width: calc(100% - 17rem);
  left: calc(100% - 17rem);

  @media (max-width: 1024px) {
    width: 100%;
    left: 100%;
  }
`;
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const ChatConteiner = styled.div`
  height: 95vh;
  background-color: #fff;
  border-radius: 50px;
  padding: 2rem 0 1rem;
  transition: 0.3s ease-in;

  @media (max-width: 768px) {
    border-radius: 15px;
  }
`;

export const ChatContent = styled.div`
  height: 100%;
  max-width: 57rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: auto;

  .welcomeMessage {
    font-family: "Bruno Ace SC", serif;
    font-size: 2rem;
    animation: ${fadeIn} 0.3s ease-in;
    color: #0d123c;
    text-align: center;
  }

  @media (max-width: 768px) {
    .welcomeMessage {
      font-size: 1.2rem;
    }
  }
`;

export const ChatHeader = styled.header`
  display: flex;
  align-items: flex-start;
  gap: 1rem;

  @media (max-width: 768px) {
    img {
      width: 12rem;
      height: auto;
    }
  }
`;

export const IaImgContainer = styled.div`
  background: linear-gradient(109deg, #d8d8d8 0%, #0d123c 96.63%);
  border-radius: 6px;
  width: 48px;
  height: 29px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    width: 2rem;
    height: auto;
    padding: 0.2rem;

    img {
      width: 1.5rem;
      height: auto;
    }
  }
`;

export const ChatFooter = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.75rem;
`;
export const ChatBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  height: 100%;
  margin-top: 1rem;
  overflow-x: hidden;
  overflow-y: auto;
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
`;

export const IaMessage = styled.div`
  border-radius: 0px 15px 15px 15px;
  color: white;
  background: ${({ theme }) => theme.color.darkBlueAxion};
  font-size: 0.8rem;
  font-weight: bold;
  text-align: justify;
  padding: 1rem 0.5rem;
  margin-right: 1rem;

  pre {
    white-space: pre-wrap;
  }

  @media (min-width: 1024px) {
    border-radius: 0px 30px 30px 30px;
    font-size: 1rem;
  }
`;

export const UserMessage = styled(IaMessage)`
  border-radius: 15px 0 15px 15px;
  margin-right: 0;
  margin-left: 1rem;
  color: ${({ theme }) => theme.color.darkBlueAxion};
  background: white;
  border: 2px solid ${({ theme }) => theme.color.darkBlueAxion};
  @media (min-width: 1024px) {
    border-radius: 30px 0 30px 30px;
    font-size: 1rem;
  }
`;

export const SuggestionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  animation: ${fadeIn} 0.3s ease-in;
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
  padding: 0 1rem;

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

    &:focus {
      outline: 2px solid #0d123c;
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

  @media (max-width: 768px) {
    #chatInput {
      font-size: 1rem;

      &::placeholder {
        font-size: 1rem;
      }
    }
  }
`;


 export const ReloadButton = styled.button`
  width: 2rem;
  height: 2rem;
  align-self: flex-end;
  
  justify-self: flex-end;
  background-color: transparent;
  border: none;
  animation: ${fadeIn} 0.3s ease-in;
  img{
    width: 100%;
    height: 100%;
  }
  :hover{
    scale: 1.01;
  }
 `;
 interface MessageProps {
  show: boolean;
}
 export const Message = styled.div<MessageProps>`
 position: absolute;

 padding: 0.3rem;
 right: -0.5rem;
 top: -4.5rem;
 border: 1px solid black;
 border-radius: 10px;
 text-align: justify;
 color: #1f1f1f;
 background-color: white;
 z-index: ${({ show }) => (show ? 100 : -1)};
 opacity: ${({ show }) => (show ? 1 : 0)};
 transition: 0.3s ease-in;

 .arrow {
   position: absolute;
   background-color: white;
   width: 0.7rem;
   height: 0.7rem;
   right: 1rem;

   transform: rotate(45deg);
   border-right: 1px solid black;
   border-bottom: 1px solid black;
 }
`;
 