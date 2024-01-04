import Theme from "@/styles/themes";
import { Container, Feedback, FeedbackGroup } from "./styles";

interface LikesCardProps extends React.HTMLAttributes<HTMLDivElement> {
  type: "facebook" | "instagram" | "tiktok" | "youtube";
  name: string;
  likes: number;
  coments: number;
  barColor: string;
  isSelected: boolean;
}

export function LikesAndComentsCard({
  name,
  likes,
  coments,
  barColor,
  isSelected,
  type,
  ...rest
}: LikesCardProps) {
  const typeData = {
    facebook: {
      leftLabel: "Likes na Página",
      leftImg: "/dashboard/like.svg",
      rightLabel: "Seguidores",
      rightImg: "/dashboard/heart.svg",
    },
    instagram: {
      leftLabel: "Posts",
      leftImg: "/dashboard/posts.svg",
      rightLabel: "Seguidores",
      rightImg: "/dashboard/followers.svg",
    },
    tiktok: {
      leftLabel: "Likes",
      leftImg: "/dashboard/heart.svg",
      rightLabel: "Seguidores",
      rightImg: "/dashboard/followers.svg",
    },
    youtube: {
      leftLabel: "Inscritos",
      leftImg: "/dashboard/followers.svg",
      rightLabel: "Visualizações",
      rightImg: "/dashboard/views.svg",
    },
  };

  return (
    <Container barColor={barColor} isSelected={isSelected} {...rest}>
      <div className="verticalBar" />
      <header>{name}</header>
      <Feedback>
        <FeedbackGroup>
          <div className="group">
            <img src={typeData[type].leftImg} alt="" />
            <strong>{likes}</strong>
          </div>
          <span>{typeData[type].leftLabel}</span>
        </FeedbackGroup>

        <FeedbackGroup>
          <div className="group">
            <img src={typeData[type].rightImg} alt="" />
            <strong>{coments}</strong>
          </div>
          <span>{typeData[type].rightLabel}</span>
        </FeedbackGroup>
      </Feedback>
    </Container>
  );
}
