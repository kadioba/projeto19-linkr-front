import { useState } from "react";
import { AuthorName, ImageContent, LinkContent, PictureAndLikes, PostContainer, PostContent, PostText } from "./styles";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";

export default function PostComponent({ post, userId }) {

  const checkLiked = post.liked_by_user_ids.includes(userId);


  const [liked] = useState(checkLiked);

  return (
    <PostContainer>
      <PictureAndLikes>
        <img src={post.picture} alt="" />
        <span data-test="like-btn" onClick={() => {}}>
          {liked ? <IoHeartSharp color="white" size="20px" /> : <IoHeartOutline color="white" size="20px" />}
        </span>
        <h2 data-test="counter">
          {post.liked_by_user_ids.length} like{post.liked_by_user_ids.length > 1 ? "s" : null}
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
