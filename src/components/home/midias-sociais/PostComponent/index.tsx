import Image from "next/image";

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

  const redirect = (url: string) => {
    if (confirm("Você será redirecionado para a publicação original")) {
      window.open(url, "_blank");
    } else {
      return;
    }
  };

  return (
    <div
      className={`Container flex gap-3 max-h-40 rounded-lg 
      ${
        type === "facebook"
          ? selectedPostId === post.id
            ? "border-[1px] bg-gray-20 border-[#0037c1]"
            : ""
          : type === "instagram"
            ? selectedPostId === post.id
              ? "border-[1px] bg-gray-20 border-[#EB4956]"
              : ""
            : type === "tiktok"
              ? selectedPostId === post.id
                ? "border-[1px] bg-gray-20 border-[#292D32]"
                : ""
              : selectedPostId === post.id
                ? "border-[1px] bg-gray-20 border-[#FF0000]"
                : ""
      } 
          ${type === "facebook" ? "border-[#0037c1]" : type === "instagram" ? "border-[#EB4956]" : type === "tiktok" ? "border-[#292D32]" : "border-[#FF0000]"} hover:cursor-pointer hover:bg-gray-20 transition duration-300 p-2`}
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
            className="object-cover w-16 h-16 m-0 cursor-pointer hover:scale-[1.05]"
            onClick={() => redirect(post.url)}
          />
          <p>
            {post.text && post.text.length > 100
              ? `${post.text.substring(0, 100)}...`
              : post.text || `${post.description.substring(0, 100)}...`}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <div className="postFeedback= w-full justify-between flex gap-2 ml-2 mt-2">
            <div className="flex">
              <div className="Feedback flex items-center min-w-20 gap-1">
                <Image
                  width={20}
                  height={20}
                  src={`/dashboard/midias-sociais/${type}Like.svg`}
                  alt=""
                />
                <strong
                  style={{
                    color:
                      type === "facebook"
                        ? "#0037C1"
                        : type === "instagram"
                          ? "#EB4956"
                          : type === "tiktok"
                            ? "#292D32"
                            : "#ff0000",
                    fontSize: "0.85rem",
                  }}
                >
                  {pageData?.posts[index].like}
                </strong>
              </div>
              <div className="Feedback flex items-center min-w-20 gap-1">
                <Image
                  width={20}
                  height={20}
                  src={`/dashboard/midias-sociais/${type}Comment.svg`}
                  alt=""
                />
                <strong
                  style={{
                    color:
                      type === "facebook"
                        ? "#0037C1"
                        : type === "instagram"
                          ? "#EB4956"
                          : type === "tiktok"
                            ? "#292D32"
                            : "#ff0000",
                    fontSize: "0.85rem",
                  }}
                >
                  {pageData?.posts[index].commentCount}
                </strong>
              </div>
              <div className="commentScore relative w-20 h-3 rounded bg-gradient-to-r from-[#8d0000] via-[#c2c600aa] to-[#008425] ">
                <div
                  className="bar absolute w-1 h-3 rounded bg-[#3c3c3c] -translate-x-1/2"
                  style={{ marginLeft: `${post.sentiment / 10}%` }}
                />
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
