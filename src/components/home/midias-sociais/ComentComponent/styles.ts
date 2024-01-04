import styled from "styled-components";

interface CommentProps {
  type?: "instagram" | "facebook" | "tiktok" | "youtube";
}

export const CommentContainer = styled.div<CommentProps>`
  display: flex;
  gap: 0.625rem;
  border: 1px solid
    ${({ type }) =>
      type === "facebook"
        ? "#0037C1"
        : type === "instagram"
        ? "#E14479"
        : type === "tiktok"
        ? "#80C7CF"
        : "#FF0000"};
  border-radius: 10px;
  padding: 1rem 1rem 0.4rem 0.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0.5rem;
  }
`;

export const CommentContent = styled.div`
  width: 100%;
`;

export const NameAndContent = styled.div`
  strong {
    font-size: 0.9rem;
  }

  p {
    font-size: 0.8rem;
    margin: 0 0 0.5rem;
    font-weight: 500;
  }
`;

export const CommentFeedback = styled.div<CommentProps>`
  display: flex;
  justify-content: ${({ type }) =>
    type === "facebook" ? "flex-start" : "space-between"};
  align-items: center;
  gap: 1rem;
`;

export const FeedbackContainer = styled.div``;

interface ScoreProps {
  score: number;
}

export const CommentScore = styled.div`
  position: relative;
  width: 5rem;
  height: 0.625rem;
  border-radius: 0.35rem;
  background-image: linear-gradient(
    to right,
    #8d0000,
    #c2c600aa,
    #22c24f,
    #008425
  );
`;

export const Bar = styled.div<ScoreProps>`
  position: absolute;
  width: 3px;
  height: 14px;
  margin-left: ${({ score }) => score / 10}%;
  background-color: #3c3c3c;
  border-radius: 2px;
  top: -2px;
  transform: translateX(-50%);
`;

export const CommentDate = styled.div`
  font-weight: 700;
  color: #494949;
  font-size: 0.7rem;
`;
