import { useEffect, useState } from "react";
import PostForm from "../../components/PostForm/PostForm";
import {
  AppContainer,
  ContentDivider,
  TimelineContainer,
  TimelineTitle,
  TrendingHashtagsContainer,
  TrendingHashtagsTitle,
} from "./styles";
import useMyContext from "../../contexts/MyContext";
import TrendingHashtags from "../../components/TrendingHashtags/TrendingHashtags";
import API from "../../config/api";
import PostsRenderer from "../../components/PostsRenderer/PostsRenderer";
import useInterval from "../../hooks/useInterval.jsx";

export default function TimelinePage() {
  const { token } = useMyContext();
  const { user } = useMyContext();
  const [posts, setPosts] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [apiCallComplete, setApiCallComplete] = useState(false);
  const [newPostsCount, setNewPostsCount] = useState(0);
  const [newPosts, setNewPosts] = useState(posts);

  useEffect(() => {
    const requestPosts = API.getPosts(token);
    requestPosts
      .then((res) => {
        setPosts(res.data);
        setApiCallComplete(true);
      })
      .catch((_err) => {
        alert("An error occurred while trying to fetch the posts, please refresh the page");
      });
  }, [loading, token]);

  useInterval(() => {
    if (apiCallComplete) {
      API.getPosts(token)
        .then((res) => {
          const gotPosts = res.data;
          const prevPosts = posts;
          if (gotPosts && prevPosts) {
            const lastPostId = prevPosts[0].id;
            const newPostsCounter = gotPosts.filter((post) => post.id > lastPostId).length;
            if (newPostsCounter > 0) {
              console.log(newPostsCounter);
              setNewPosts(gotPosts);
              setNewPostsCount(newPostsCounter);
            } else {
              console.log("No new posts");
            }
          }
        })
        .catch((err) => {
          console.error("Interval API error:", err);
        });
    }
  }, 15000);

  const updatePosts = () => {
    setPosts(newPosts);
    setNewPostsCount(0);
  };

  return (
    <AppContainer>
      <TimelineContainer>
        <TimelineTitle>timeline</TimelineTitle>
        {newPostsCount ? <button onClick={updatePosts}>aqui carai</button> : <></>}
        <PostForm user={user} token={token} loading={loading} setLoading={setLoading} setPosts={setPosts} />
        <PostsRenderer posts={posts} user={user} setPosts={setPosts} />
      </TimelineContainer>
      <TrendingHashtagsContainer data-test="trending">
        <TrendingHashtagsTitle>trending</TrendingHashtagsTitle>
        <ContentDivider></ContentDivider>
        <TrendingHashtags loading={loading} setPosts={setPosts} posts={posts} />
      </TrendingHashtagsContainer>
    </AppContainer>
  );
}
