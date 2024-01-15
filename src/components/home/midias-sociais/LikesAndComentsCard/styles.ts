import styled from "styled-components";

interface Props {
  barColor: string;
  isSelected: boolean;
}

export const Container = styled.div<Props>`
  position: relative;
  width: 17.5rem;
  height: 7rem;
  background-color: white;
  padding: 1rem 2rem;
  border-radius: 10px;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.2);
  border: 1px solid #959595;
  transition: 0.2s;

  opacity: ${({ isSelected }) => (isSelected ? 1 : 0.5)};

  &:hover {
    cursor: pointer;
  }
  s header {
    font-size: 1.25rem;
    color: ${({ theme }) => theme.color.gray_100};
  }

  .verticalBar {
    position: absolute;
    left: 0.8rem;
    height: 3.5rem;
    border: 2px solid ${({ barColor }) => barColor};
    border-radius: 50px;
  }
`;

export const Feedback = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1.2rem;
`;

export const FeedbackGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.4rem;
  gap: "0.1rem";

  img {
    width: 1.5rem;
    height: auto;
  }

  strong {
    font-size: 1.2rem;
    line-height: 0.9;
  }

  span {
    font-size: 0.625rem;
    color: ${({ theme }) => theme.color.gray_90};
  }

  .group {
    display: flex;
    gap: 0.1rem;
    align-items: center;
  }
`;
