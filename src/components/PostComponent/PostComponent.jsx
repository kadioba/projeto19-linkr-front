import React, { useEffect, useRef, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { Tagify } from "react-tagify";
import { useNavigate } from "react-router-dom";
import useMyContext from "../../contexts/MyContext";
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
  PostOuterContainer,
  CommentContainer,
  CommentInputContainer,
} from "./styles";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import DeleteConfirmation from "../DeleteConfirmation/DeleteConfirmation";
import LinkrImage from "../../assets/linkr-image.jpg";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { IoPaperPlaneOutline } from "react-icons/io5";

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

  const [tooltipId, setTooltipId] = useState(`text-likes-${post.id}`);

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
    if (!editing) {
      setNewContent("");
    }
  }, [editing]);

  function submitEdit() {
    setLoading(true);
    const promise = API.editPost(token, post.id, { content: newContent });
    promise
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

  const handleImageError = (event) => {
    event.target.src = LinkrImage;
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
    const promise = API.deletePost(token, post.id);
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

  const likesText = () => {
    const likeKeys = Object.keys(myPost.liked_by);

    if (howMany === 0) {
      return "Nenhum usuário curtiu esse post";
    } else if (howMany === 1) {
      if (liked) {
        return "Você curtiu esse post";
      } else {
        return `${myPost.liked_by[likeKeys[0]]}`; // avaliador...
        return `${myPost.liked_by[likeKeys[0]]} curtiu esse post`;
      }
    } else if (howMany === 2) {
      if (liked) {
        const user = likeKeys.find((value) => value !== userId);
        return `Você e ${myPost.liked_by[likeKeys[user]]} curtiram esse post`;
      } else {
        return `${myPost.liked_by[likeKeys[0]]} e ${myPost.liked_by[likeKeys[1]]} curtiram esse post`;
      }
    } else if (howMany > 2) {
      if (liked) {
        const user = likeKeys.find((value) => value !== userId);
        const othersCount = howMany - 2;
        return `Você, ${myPost.liked_by[likeKeys[user]]} e mais ${othersCount} pessoa${othersCount > 1 ? "s" : ""
          } curtiram esse post`;
      } else {
        const othersCount = howMany - 2;
        return `${myPost.liked_by[likeKeys[0]]}, ${myPost.liked_by[likeKeys[1]]} e mais ${othersCount} pessoa${othersCount > 1 ? "s" : ""
          } curtiram esse post`;
      }
    }
  };

  return (
    <PostOuterContainer>
      <PostContainer data-test="post">
        <PictureAndLikes>
          <img src={post.picture} alt="" onClick={() => navigate(`/user/${post.user_id}`)} />
          <span data-test="like-btn" onClick={likeHandler}>
            {liked ? <FaHeart color="red" size="20px" /> : <FaRegHeart color="white" size="20px" />}
          </span>
          <h2
            data-test="counter"
            data-tooltip-id={tooltipId}
            data-tooltip-content={likesText()}
            data-tooltip-place="bottom"
          >
            {howMany} like{howMany > 1 || howMany === 0 ? "s" : ""}
          </h2>
          <span data-test="tooltip">
            <Tooltip id={tooltipId} style={{ backgroundColor: "#FFFFFF", color: "#505050" }} />
          </span>
        </PictureAndLikes>
        <PostContent>
          <PostHeader>
            <AuthorName data-test="username" onClick={() => navigate(`/user/${post.user_id}`)}>
              {post.username}
            </AuthorName>
            {userId === post.user_id ? (
              <div>
                <FaPencilAlt data-test="edit-btn" color="white" size="19px" onClick={() => setEditing(!editing)} />
                <EspacoIcones />
                <FaTrash data-test="delete-btn" color="white" size="19px" onClick={() => setDeleteConfirmation(true)} />
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
              data-test="edit-input"
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
            <ImageContent src={post.url_picture} alt="Link Image" onError={handleImageError} />
          </LinkContent>
        </PostContent>
        {deleteConfirmation ? (
          <DeleteConfirmation setDeleteConfirmation={setDeleteConfirmation} submitDelete={submitDelete} />
        ) : null}
      </PostContainer>
      <CommentContainer>
        <CommentInputContainer>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgHMEvAmwb8c8MGAVd5RXwt7szQCwu-QnKR6G9Ze2sCOthXlt1DZsIncqZ4JuNLvM_kcU&usqp=CAU" alt="" />
          <form>
            <input type="text" placeholder="write a comment..." />
            <IoPaperPlaneOutline size="15px" color="#FFFFFF" />
          </form>
        </CommentInputContainer>
      </CommentContainer>
    </PostOuterContainer>
  );
}
