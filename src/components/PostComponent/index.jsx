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
        {liked ? <IoHeartSharp color="white" size="20px" /> : <IoHeartOutline color="white" size="20px" />}
        <h2>
          {post.liked_by_user_ids.length} like{post.liked_by_user_ids.length > 1 ? "s" : null}
        </h2>
      </PictureAndLikes>
      <PostContent>
        <AuthorName>{post.username}</AuthorName>
        <PostText>{post.content}</PostText>
        <LinkContent href={post.url} target="_blank">
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
