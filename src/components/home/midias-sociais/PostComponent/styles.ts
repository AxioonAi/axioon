import styled from "styled-components";

interface PostProps {
  type: "instagram" | "facebook" | "tiktok" | "youtube";
}

export const PostContainer = styled.div<PostProps>`
  display: flex;
  gap: 0.75rem;
  border-radius: 10px;
  border: 1px solid
    ${({ type }) =>
      type === "facebook"
        ? "#0037C1"
        : type === "instagram"
        ? "#505CCA"
        : type === "tiktok"
        ? "#E03855"
        : "#FF0000"};
  padding: 1rem 1rem 0.4rem 0.5rem;

  @media (max-width: 768px) {
    flex-direction: column;

    .logo {
      width: 2.5rem;
      height: 2.5rem;
    }
  }
`;

export const PostContent = styled.div`
  p {
    margin: 0 0 0.2rem 0;
    font-size: 1rem;
    font-weight: 500;
    color: #1f1f1f;
    width: 100%;
    max-height: 5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
`;

export const PostFeedback = styled.div`
  display: flex;
  gap: 2.75rem;
  margin-left: 0.5rem;

  @media (max-width: 1450px) {
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

export const FeedbackContainer = styled.div`
  width: 5rem;
`;

export const PostDate = styled.div`
  color: #494949;
  font-size: 0.9rem;
  font-weight: 500;
`;
