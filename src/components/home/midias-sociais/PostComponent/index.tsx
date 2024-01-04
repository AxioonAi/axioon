import Image from "next/image";
import {
  FeedbackContainer,
  PostContainer,
  PostContent,
  PostDate,
  PostFeedback,
} from "./styles";
import { HeartSVG } from "../../../../../public/dashboard/midias-sociais/heartSVG";
import { MessageSVG } from "../../../../../public/dashboard/midias-sociais/messageSVG";
import { ViewSVG } from "../../../../../public/dashboard/midias-sociais/viewSVG";
import { windowWidth } from "@/utils/windowWidth";

interface Props {
  type: "instagram" | "facebook" | "youtube" | "tiktok";
  pageData: any;
  post: any;
  index: any;
  selectedPostId: string;
  setSelectedPostId: any;
}

export function PostComponent({
  type,
  post,
  index,
  pageData,
  selectedPostId,
  setSelectedPostId,
}: Props) {
  function formatNumber(number: number) {
    if (number >= 1000) {
      return (number / 1000).toFixed(1) + "k";
    } else {
      return number;
    }
  }

  const date = new Date(post.date || post.created_at);

  return (
    <PostContainer
      type={type}
      className="hover:cursor-pointer"
      onClick={() => setSelectedPostId(post.id)}
    >
      <Image
        width={80}
        height={80}
        src={
          type === "facebook"
            ? "/dashboard/midias-sociais/facebookLogo.png"
            : type === "instagram"
            ? "/dashboard/midias-sociais/instagramLogo.png"
            : type === "youtube"
            ? "/dashboard/midias-sociais/youtubeLogo.png"
            : "/dashboard/midias-sociais/tiktokLogo.png"
        }
        alt={""}
        style={{ objectFit: "cover", width: 80, height: 80, margin: 0 }}
      />
      {windowWidth(768) && <PostDate>{date.toLocaleDateString()}</PostDate>}
      <PostContent>
        <p>{post.text || post.description}</p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {type === "facebook" && (
            <PostFeedback>
              <FeedbackContainer>
                <Image
                  width={30}
                  height={30}
                  src="/dashboard/midias-sociais/facebookLike.png"
                  alt=""
                />
                <strong style={{ color: "#0037C1", fontSize: "0.85rem" }}>
                  {pageData?.posts[index].like}
                </strong>
              </FeedbackContainer>
              <FeedbackContainer
                style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}
              >
                <Image
                  width={20}
                  height={20}
                  src="/dashboard/midias-sociais/facebookComment.png"
                  alt=""
                />
                <strong style={{ color: "#0037C1", fontSize: "0.85rem" }}>
                  {pageData?.posts[index].commentCount}
                </strong>
              </FeedbackContainer>
              <FeedbackContainer
                style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}
              >
                <Image
                  width={20}
                  height={20}
                  src="/dashboard/midias-sociais/facebookShare.png"
                  alt=""
                />
                <strong style={{ color: "#0037C1", fontSize: "0.85rem" }}>
                  {pageData?.posts[index].shares}
                </strong>
              </FeedbackContainer>
            </PostFeedback>
          )}
          {type !== "facebook" && (
            <PostFeedback>
              <FeedbackContainer
                style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
              >
                <HeartSVG
                  color={type === "instagram" ? "#EB4956" : "#292D32"}
                />
                <strong
                  style={{
                    color: type === "instagram" ? "#EB4956" : "#292D32",
                    fontSize: "0.85rem",
                  }}
                >
                  {pageData?.posts[index].like}
                </strong>
              </FeedbackContainer>

              <FeedbackContainer
                style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
              >
                <MessageSVG
                  color={type === "instagram" ? "#EB4956" : "#292D32"}
                />
                <strong
                  style={{
                    color: type === "instagram" ? "#EB4956" : "#292D32",
                    fontSize: "0.85rem",
                  }}
                >
                  {pageData?.posts[index].commentCount}
                </strong>
              </FeedbackContainer>
              {pageData?.posts[index].shares ? (
                <FeedbackContainer
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                  }}
                >
                  <ViewSVG
                    color={type === "instagram" ? "#EB4956" : "#292D32"}
                  />
                  <strong
                    style={{
                      color: type === "instagram" ? "#EB4956" : "#292D32",
                      fontSize: "0.85rem",
                    }}
                  >
                    {pageData?.posts[index].shares}
                  </strong>
                </FeedbackContainer>
              ) : (
                <></>
              )}
            </PostFeedback>
          )}
          {!windowWidth(768) && (
            <PostDate>{date.toLocaleDateString()}</PostDate>
          )}
        </div>
      </PostContent>
    </PostContainer>
  );
}
