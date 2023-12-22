import styled from "styled-components";

export const PixPaymentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 35rem;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const QrCodeContainer = styled.div`
  width: 14rem;
  height: 14rem;
  margin: 1rem auto;

  img {
    width: 100%;
    height: 100%;
  }

  @media(max-width: 768px) {
    width: 10rem;
    height: 10rem;
  }
`;

export const FinishPayment = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  justify-content: center;
  margin-top: 1.5rem;

  button {
    width: 20rem;
    height: 3.5rem;
    border-radius: 5px;
    color: white;
    font-weight: bold;
    transition: 0.2s;
  }

  button:first-child {
    background-color: #22C24F;
    border: 0;

    &:hover {
      background-color: #1B993E;
    }
  }

  button:last-child {
    background-color: #0d123c;

    &:hover {
      background-color: #131A57;
    }
  }

  @media (max-width: 768px) {
    button {
      width: 16rem;
    }
  }
`;
