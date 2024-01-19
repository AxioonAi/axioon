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
  const date = new Date(post.date || post.created_at);

  return (
    <div
      className={`Container flex gap-3 max-h-40 rounded-lg border ${type === "facebook" ? "border-[#0037c1]" : type === "instagram" ? "border-[#505CCA]" : type === "tiktok" ? "border-[#E03855]" : "border-[#FF0000]"} hover:cursor-pointer hover:bg-gray-20 transition duration-300 p-2`}
      onClick={() => setSelectedPostId(post.id)}
    >
      <div className="postContent flex flex-col mb-1 text-sm text-black w-full overflow-hidden">
        <div className="flex gap-1">
          <Image
            width={50}
            height={50}
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
            className="object-cover w-16 h-16 m-0"
          />
          <p>
            {/* {post.text && post.text.length > 100
              ? `${post.text.substring(0, 100)}...`
              : post.text || (post.description && post.description.length > 100)
                ? `${post.description.substring(0, 100)}...`
                : post.description} */}
            {post.text && post.text.length > 100
              ? `${post.text.substring(0, 100)}...`
              : post.text || post.description}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <div className="postFeedback= w-full justify-between flex gap-2 ml-2 mt-2">
            <div className="flex">
              <div className="Feedback flex items-center min-w-20 gap-1">
                <Image
                  width={20}
                  height={20}
                  src="/dashboard/midias-sociais/facebookLike.svg"
                  alt=""
                />
                <strong style={{ color: "#0037C1", fontSize: "0.85rem" }}>
                  {pageData?.posts[index].like}
                </strong>
              </div>
              <div className="Feedback flex items-center min-w-20 gap-1">
                <Image
                  width={20}
                  height={20}
                  src="/dashboard/midias-sociais/facebookComment.svg"
                  alt=""
                />
                <strong style={{ color: "#0037C1", fontSize: "0.85rem" }}>
                  {pageData?.posts[index].commentCount}
                </strong>
              </div>
              <div className="Feedback flex items-center min-w-20 gap-1">
                <Image
                  width={20}
                  height={20}
                  src="/dashboard/midias-sociais/facebookShare.svg"
                  alt=""
                />
                <strong style={{ color: "#0037C1", fontSize: "0.85rem" }}>
                  {pageData?.posts[index].shares}
                </strong>
              </div>
            </div>

            <div className="postDate self-end text-sm text-[#494949]">
              {date.toLocaleDateString("pt-BR")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
