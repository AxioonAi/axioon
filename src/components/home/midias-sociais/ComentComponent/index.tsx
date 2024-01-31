import Image from "next/image";

interface Props {
  type: "instagram" | "facebook" | "youtube" | "tiktok";
  comment: any;
}

export function CommentComponent({ type, comment }: Props) {
  const commentDate = new Date(
    comment.date || comment.timestamp || comment.created_at,
  );

  return (
    <div
      className={`Container flex w-full gap-3 max-h-40 rounded-lg border ${type === "facebook" ? "border-[#0037c1]" : type === "instagram" ? "border-[#EB4956]" : type === "tiktok" ? "border-[#292D32]" : "border-[#FF0000]"} hover:cursor-pointer hover:bg-gray-20 transition duration-300 p-2`}
    >
      <div className="commentContent flex flex-col mb-1 text-sm text-black w-full overflow-hidden">
        <div className="flex gap-1">
          <Image
            width={50}
            height={50}
            src="/dashboard/midias-sociais/stockProfilePic.svg"
            alt=""
            className="rounded-5 object-cover w-16 h-16 m-0"
          />
          <div className="flex flex-col">
            <strong>{comment.ownerUsername || comment.username}</strong>
            <p>
              {comment.text.length > 100
                ? `${comment.text.substring(0, 100)}...`
                : comment.text}
            </p>
          </div>
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
                            : "#0037C1",
                    fontSize: "0.85rem",
                  }}
                >
                  {comment?.likeCount}
                </strong>
              </div>
              <div className="commentScore relative w-20 h-3 rounded bg-gradient-to-r from-[#8d0000] via-[#c2c600aa] to-[#008425] ">
                <div
                  className="bar absolute w-1 h-3 rounded bg-[#3c3c3c]"
                  style={{
                    marginLeft: `${comment.sentimentAnalysis / 10}%`,
                  }}
                />
              </div>
            </div>

            <div className="postDate self-end text-sm text-[#494949]">
              <span>{commentDate.toLocaleDateString("pt-BR")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
