import { useEffect, useState } from "react";
import PostForm from "../../components/PostForm";
import {
  AppContainer,
  ContentDivider,
  TimelineContainer,
  TimelineTitle,
  TrendingHashtagsContainer,
  TrendingHashtagsTitle,
} from "./styles";
import useMyContext from "../../contexts/MyContext.jsx";
import PostComponent from "../../components/PostComponent";
import TrendingHashtags from "../../components/TrendingHashtags/TrendingHashtags.jsx";
import API from "../../config/api";

export default function TimelinePage() {
  const { token } = useMyContext();
  const { user } = useMyContext();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const requestPosts = API.getPosts(token);
    requestPosts
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log("An error occured while trying to fetch the posts, please refresh the page");
      });
  }, [loading, token]);

  const handlePostLike = (postId, likedByUserIds, likedByUsernames) => {
    setPosts((prev) => {
      return prev.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            liked_by_user_ids: likedByUserIds,
            liked_by_usernames: likedByUsernames,
          };
        }
        return post;
      });
    });
  };

  function renderPosts() {
    if (posts) {
      if (posts.length === 0) return <h1 data-test="message">There are no posts yet</h1>;
      else {
      }
      return posts.map((post) => {
        return (
          <PostComponent
            data-test="post"
            key={post.id}
            post={post}
            userId={user.id}
            username={user.username}
            handlePostLike={handlePostLike}
          />
        );
      });
    } else {
      return <h1>Loading...</h1>;
    }
  }

  return (
    <AppContainer>
      <TimelineContainer>
        <TimelineTitle>timeline</TimelineTitle>
        <PostForm userPicture={user.picture} token={token} loading={loading} setLoading={setLoading} />
        {renderPosts()}
      </TimelineContainer>
      <TrendingHashtagsContainer data-test="trending">
        <TrendingHashtagsTitle>trending</TrendingHashtagsTitle>
        <ContentDivider></ContentDivider>
        <TrendingHashtags />
      </TrendingHashtagsContainer>
    </AppContainer>
  );
}
