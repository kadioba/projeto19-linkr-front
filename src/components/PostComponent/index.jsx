import { useState } from "react";
import { AuthorName, Hashtag, ImageContent, LinkContent, PictureAndLikes, PostContainer, PostContent, PostText } from "./styles";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
// import ReactHashtag from "react-hashtag";
import { useNavigate } from "react-router-dom";
import useMyContext from "../../contexts/MyContext.jsx";

export default function PostComponent({ post, userId, setPosts }) {

  const checkLiked = post.liked_by_user_ids.includes(userId);

  const { refresh, setRefresh } = useMyContext();

  const navigate = useNavigate()

  const [liked] = useState(checkLiked);

  function onHashtagClick(hashtag) {
    const hashtagWithoutHash = hashtag.substring(1)
    setPosts(undefined)
    setRefresh(!refresh)
    return navigate(`/hashtag/${hashtagWithoutHash}`)
  }
  

  return (
    <PostContainer>
      <PictureAndLikes>
        <img src={post.picture} alt="" />
        <span data-test="like-btn" onClick={() => { }}>
          {liked ? <IoHeartSharp color="white" size="20px" /> : <IoHeartOutline color="white" size="20px" />}
        </span>
        <h2 data-test="counter">
          {post.liked_by_user_ids.length} like{post.liked_by_user_ids.length > 1 ? "s" : null}
        </h2>
      </PictureAndLikes>
      {/* <PostContent>
        <AuthorName data-test="username">{post.username}</AuthorName>
        <PostText data-test="description">
          <ReactHashtag 
            renderHashtag={(hashtagValue) => (
              <Hashtag onClick={()=>onHashtagClick(hashtagValue)}>{hashtagValue}</Hashtag>)}>
            {post.content}
          </ReactHashtag>
        </PostText>
        <LinkContent data-test="link" href={post.url} target="_blank">
          <div>
            <h1>{post.url_title}</h1>
            <p>{post.url_description}</p>
            <h2>{post.url}</h2>
          </div>
          <ImageContent src={post.url_picture} alt="" />
        </LinkContent>
      </PostContent> */}
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
