import * as S from "./styles";
import RefreshIcon from "../../assets/refresh-icon.svg";

export default function NewPostsButton(props) {
  const { newPostsCount, updatePosts } = props;

  return (
    <S.NewPostsButton onClick={updatePosts}>
      <span>
        Load {newPostsCount} new post{newPostsCount > 1 ? "s" : ""}, load more!
      </span>
      <img src={RefreshIcon} alt="Add new posts" />
    </S.NewPostsButton>
  );
}
