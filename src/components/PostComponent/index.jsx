import React, { useEffect, useRef, useState } from "react";
import { AuthorName, ContentInput, EspacoIcones, ImageContent, LinkContent, PictureAndLikes, PostContainer, PostContent, PostHeader, PostText } from "./styles";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import API from "../../config/api";

export default function PostComponent({ post, userId, token }) {
  //const checkLiked = post.liked_by_user_ids.includes(userId);

  //const [liked] = useState(checkLiked);

  const [editing, setEditing] = useState(false);
  const [newContent, setNewContent] = useState(post.content);
  const [postContent, setPostContent] = useState(post.content);

  const [loading, setLoading] = useState(false);

  const inputRef = useRef(null);

  function editPost() {
    setEditing(true)
  }

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
    if (!editing) {
      setNewContent(postContent)
    }
  }, [editing]);

  function submitEdit() {
    setLoading(true)
    const promisse = API.editarPost(token, post.id, { content: newContent });
    promisse
      .then((res) => {
        setEditing(false);
        setPostContent(newContent);
        setLoading(false);
      })
      .catch((err) => {
        alert("Houve um erro ao editar seu post");
        setLoading(false);
      });
  }

  const handleKeyDown = (event) => {
    if (event.keyCode === 13 && !event.shiftKey) {
      event.preventDefault();
      submitEdit();
    }
    if (event.keyCode === 27) setEditing(false);
  };

  const handleChange = (event) => {
    setNewContent(event.target.value);
  };

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
      <PostContent>
        <PostHeader>
          <AuthorName data-test="username">{post.username}</AuthorName>
          {(userId === post.user_id) ? (
            <div>
              <FaPencilAlt color="white" size="19px" onClick={() => setEditing(!editing)} />
              <EspacoIcones />
              <FaTrash color="white" size="19px" />
            </div>) : null}
        </PostHeader>
        {editing ?
          <ContentInput ref={inputRef}
            value={newContent}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={loading}
          /> : <PostText data-test="description">{postContent}</PostText>}

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
