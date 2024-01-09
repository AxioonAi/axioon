import Image from "next/image";
import {
  Bar,
  CommentContainer,
  CommentContent,
  CommentDate,
  CommentFeedback,
  CommentScore,
  FeedbackContainer,
  NameAndContent,
} from "./styles";
import { MessageSVG } from "../../../../../public/dashboard/midias-sociais/messageSVG";
import { HeartSVG } from "../../../../../public/dashboard/midias-sociais/heartSVG";
import { windowWidth } from "@/utils/windowWidth";

interface Props {
  type: "instagram" | "facebook" | "youtube" | "tiktok";
  comment: any;
  commentScore: any;
}

export function CommentComponent({ type, comment, commentScore }: Props) {
  function formatNumber(number: number) {
    if (number >= 1000) {
      return (number / 1000).toFixed(1) + "k";
    } else {
      return number;
    }
  }

  const commentDate = new Date(
    comment.date || comment.timestamp || comment.created_at
  );

  return (
    <CommentContainer type={type}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Image
            width={50}
            height={50}
            src="https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg"
            alt=""
            className="rounded-5"
          />
          {windowWidth(768) && (
            <strong style={{ fontSize: "0.925rem" }}>{comment.username}</strong>
          )}
        </div>
        {windowWidth(768) && (
          <CommentDate>
            <span>{commentDate.toLocaleDateString()}</span>
          </CommentDate>
        )}
      </div>
      <CommentContent>
        <NameAndContent>
          {!windowWidth(768) && <strong>{comment.username}</strong>}
          <p>{comment.text}</p>
        </NameAndContent>
        <CommentFeedback type={type}>
          <div className="flex justify-evenly items-center w-full">
            {type === "facebook" && (
              <>
                <CommentFeedback>
                  <div className="flex justify-center items-center">
                    <Image
                      width={24}
                      height={24}
                      src="/dashboard/midias-sociais/facebookLike.png"
                      alt=""
                    />
                    <strong style={{ color: "#0037C1", fontSize: "0.75rem" }}>
                      {comment.likeCount}
                    </strong>
                  </div>
                </CommentFeedback>
                <CommentDate>
                  <span>{commentDate.toLocaleDateString()}</span>
                </CommentDate>
              </>
            )}
            {type !== "facebook" && (
              <CommentFeedback>
                <FeedbackContainer
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                  }}
                >
                  <HeartSVG
                    color={type === "instagram" ? "#EB4956" : "#292D32"}
                    size="small"
                  />
                  <strong
                    style={{
                      color: type === "instagram" ? "#EB4956" : "#292D32",
                      fontSize: "0.85rem",
                    }}
                  >
                    {comment.likeCount}
                  </strong>
                </FeedbackContainer>

                {comment.replyCount ? (
                  <FeedbackContainer
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                    }}
                  >
                    <MessageSVG
                      color={type === "instagram" ? "#EB4956" : "#292D32"}
                      size="small"
                    />
                    <strong
                      style={{
                        color: type === "instagram" ? "#EB4956" : "#292D32",
                        fontSize: "0.85rem",
                      }}
                    >
                      {comment.replyCount}
                    </strong>
                  </FeedbackContainer>
                ) : (
                  <></>
                )}
              </CommentFeedback>
            )}
            <CommentScore>
              <Bar className="bar" score={comment.sentimentAnalysis} />
            </CommentScore>
          </div>
          {type !== "facebook" && !windowWidth(768) && (
            <CommentDate>
              <span>{commentDate.toLocaleDateString()}</span>
            </CommentDate>
          )}
        </CommentFeedback>
      </CommentContent>
    </CommentContainer>
  );
}
