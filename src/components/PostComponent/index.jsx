import React, { useEffect, useRef, useState } from "react";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { Tagify } from "react-tagify";
import { useNavigate } from "react-router-dom";
import useMyContext from "../../contexts/MyContext.jsx";
import API from "../../config/api";
import {
  AuthorName,
  ImageContent,
  LinkContent,
  PictureAndLikes,
  PostContainer,
  PostContent,
  PostText,
  tagStyle,
  ContentInput,
  EspacoIcones,
  PostHeader,
} from "./styles";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import DeleteConfirmation from "../DeleteConfirmation/index.jsx";

export default function PostComponent({ postId, post, userId, username, setPosts, posts }) {
  const { refresh, setRefresh, token } = useMyContext();

  const navigate = useNavigate();

  const [myPost, setMyPost] = useState(post);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isInitialRender, setIsInitialRender] = useState(true);

  const [liked, setLiked] = useState(Object.hasOwn(myPost.liked_by, userId.toString()));
  const [howMany, setHowMany] = useState(Object.keys(myPost.liked_by).length);
  const [dispatchLike, setDispatchLike] = useState(false);

  //
  const [editing, setEditing] = useState(false);
  const [newContent, setNewContent] = useState(post.content);
  const [postContent, setPostContent] = useState(post.content);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const [loading, setLoading] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
    if (!editing) {
      setNewContent(postContent);
    }
  }, [editing]);

  function submitEdit() {
    setLoading(true);
    const promisse = API.editarPost(token, post.id, { content: newContent });
    promisse
      .then((res) => {
        setEditing(false);
        setPostContent(newContent);
      })
      .catch((err) => {
        alert("Houve um erro ao editar seu post");
      })
      .finally(() => {
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
          console.log("Reverting like state due remote divergence...");
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsUpdating(false);
        console.log("IsUpdating end");
      });
    // eslint-disable-next-line
  }, [dispatchLike]);

  function submitDelete() {
    setLoading(true);
    const promise = API.deletarPost(token, post.id);
    promise
      .then((res) => {
        setDeleteConfirmation(false);
        setPosts((prevPosts) => prevPosts.filter((updatedPost) => updatedPost.id !== post.id));
      })
      .catch((err) => {
        console.log(err);
        alert("Houve um erro ao deletar seu post");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <PostContainer data-test="post">
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
        <PostHeader>
          <AuthorName data-test="username" onClick={() => navigate(`/user/${post.user_id}`)}>
            {post.username}
          </AuthorName>
          {userId === post.user_id ? (
            <div>
              <FaPencilAlt color="white" size="19px" onClick={() => setEditing(!editing)} />
              <EspacoIcones />
              <FaTrash color="white" size="19px" onClick={() => setDeleteConfirmation(true)} />
            </div>
          ) : null}
        </PostHeader>
        {editing ? (
          <ContentInput
            ref={inputRef}
            value={newContent}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />
        ) : (
          <PostText data-test="description">
            <Tagify onClick={(tag) => onHashtagClick(tag)} tagStyle={tagStyle} detectMentions={false}>
              {postContent}
            </Tagify>
          </PostText>
        )}

        <LinkContent data-test="link" href={post.url} target="_blank">
          <div>
            <h1>{post.url_title}</h1>
            <p>{post.url_description}</p>
            <h2>{post.url}</h2>
          </div>
          <ImageContent src={post.url_picture} alt="" />
        </LinkContent>
      </PostContent>
      {deleteConfirmation ? (
        <DeleteConfirmation setDeleteConfirmation={setDeleteConfirmation} submitDelete={submitDelete} />
      ) : null}
    </PostContainer>
  );
}
