import { useEffect, useState } from "react";
import { AuthorName, ImageContent, LinkContent, PictureAndLikes, PostContainer, PostContent, PostText } from "./styles";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import API from "../../config/api.js";
import useMyContext from "../../contexts/MyContext.jsx";

export default function PostComponent({ post, userId, username, handlePostLike }) {
  const [myPost, setMyPost] = useState(post);
  const [liked, setLiked] = useState(myPost.liked_by_user_ids.includes(userId));
  const [isUpdating, setIsUpdating] = useState(false);
  const [dispatchLike, setDispatchLike] = useState(false);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const { token } = useMyContext();

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
      return;
    }

    API.likePost(token, post.id)
      .then((res) => {
        if (res.data.isLiked !== liked) {
          setLiked(!liked);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsUpdating(false);
      });
    // eslint-disable-next-line
  }, [dispatchLike]);

  const likeHandler = () => {
    if (isUpdating) return;
    setIsUpdating(true);

    const { liked_by_user_ids, liked_by_usernames } = myPost;
    const indexToRemove = liked_by_usernames.indexOf(username);

    let newLikedByUserIds;
    let newLikedByUsernames;

    if (liked) {
      newLikedByUserIds = liked_by_user_ids.filter((id) => id !== userId);
      newLikedByUsernames = [...liked_by_usernames];
      newLikedByUsernames.splice(indexToRemove, 1);
    } else {
      newLikedByUserIds = [...liked_by_user_ids, userId];
      newLikedByUsernames = [...liked_by_usernames, username];
    }

    setLiked(!liked);
    setMyPost((prev) => {
      return {
        ...prev,
        liked_by_user_ids: newLikedByUserIds,
        liked_by_usernames: newLikedByUsernames,
      };
    });

    setDispatchLike(!dispatchLike);
    handlePostLike(post.id, newLikedByUserIds, newLikedByUsernames);
  };

  return (
    <PostContainer>
      <PictureAndLikes>
        <img src={post.picture} alt="" />
        <span data-test="like-btn" onClick={likeHandler}>
          {liked ? <IoHeartSharp color="red" size="20px" /> : <IoHeartOutline color="white" size="20px" />}
        </span>
        <h2 data-test="counter">
          {myPost.liked_by_user_ids.length} like{myPost.liked_by_user_ids.length > 1 ? "s" : ""}
        </h2>
      </PictureAndLikes>
      <PostContent>
        <AuthorName data-test="username">{post.username}</AuthorName>
        <PostText data-test="description">{post.content}</PostText>
        <LinkContent data-test="link" href={post.url} target="_blank">
          <div>
            <h1>{post.url_title}</h1>
            <p>{post.url_description}</p>
            <h2>{post.url}</h2>
          </div>
          <ImageContent src={post.url_picture} alt="" />
        </LinkContent>
      </PostContent>
    </PostContainer>
  );
}
