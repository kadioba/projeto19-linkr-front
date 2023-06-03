import { useEffect, useState } from "react";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { Tagify } from "react-tagify";
import { useNavigate } from "react-router-dom";
import useMyContext from "../../contexts/MyContext.jsx";
import API from "../../config/api.js";
import {
  AuthorName,
  ImageContent,
  LinkContent,
  PictureAndLikes,
  PostContainer,
  PostContent,
  PostText,
  tagStyle,
} from "./styles";

export default function PostComponent({ postId, post, userId, username, setPosts }) {
  const { refresh, setRefresh, token } = useMyContext();

  const navigate = useNavigate();

  const [myPost, setMyPost] = useState(post);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isInitialRender, setIsInitialRender] = useState(true);

  const [liked, setLiked] = useState(Object.hasOwn(myPost.liked_by, userId.toString()));
  const [howMany, setHowMany] = useState(Object.keys(myPost.liked_by).length);
  const [dispatchLike, setDispatchLike] = useState(false);

  function onHashtagClick(tag) {
    setPosts(undefined);
    setRefresh(!refresh);
    return navigate(`/hashtag/${tag}`);
  }

  const likeHandler = () => {
    if (isUpdating) return;
    setIsUpdating(true);
    setMyPost((prev) => {
      if (liked) {
        const { [userId.toString()]: omittedKey, ...updatedPost } = prev;
        setHowMany(howMany - 1);
        setLiked(false);
        return updatedPost;
      } else {
        const newLiked = {
          ...prev,
          [userId.toString()]: username,
        };
        setHowMany(howMany + 1);
        setLiked(true);
        return newLiked;
      }
    });
    setDispatchLike(!dispatchLike);
  };

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
      return;
    }
    API.likePost(token, postId)
      .then((res) => {
        if (res.data.isLiked !== liked) {
          setLiked(!liked);
          console.log("Reverting like state due remote divergence...")
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsUpdating(false);
        console.log("IsUpdating end")
      });
    // eslint-disable-next-line
  }, [dispatchLike]);

  return (
    <PostContainer>
      <PictureAndLikes>
        <img src={post.picture} alt="" onClick={() => navigate(`/user/${post.user_id}`)} />
        <span data-test="like-btn" onClick={likeHandler}>
          {liked ? <IoHeartSharp color="red" size="20px" /> : <IoHeartOutline color="white" size="20px" />}
        </span>
        <h2 data-test="counter">
          {howMany} like{howMany > 1 ? "s" : ""}
        </h2>
      </PictureAndLikes>
      <PostContent>
        <AuthorName data-test="username" onClick={() => navigate(`/user/${post.user_id}`)}>
          {post.username}
        </AuthorName>
        <PostText data-test="description">
          <Tagify onClick={(tag) => onHashtagClick(tag)} tagStyle={tagStyle} detectMentions={false}>
            {post.content}
          </Tagify>
        </PostText>
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
