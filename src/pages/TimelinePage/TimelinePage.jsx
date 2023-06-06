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
import NewPostsButton from "../../components/NewPostsButton/NewPostsButton.jsx";

export default function TimelinePage() {
  const { token } = useMyContext();
  const { user } = useMyContext();
  const [posts, setPosts] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [newPosts, setNewPosts] = useState(posts);
  const [newPostsCount, setNewPostsCount] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await API.getPosts(token);
        setPosts(data);
      } catch (err) {
        alert("An error occured while trying to fetch the posts, please refresh the page");
      }
    };

    fetchPosts();
  }, [loading, token]);

  useInterval(
    () => {
      const fetchNewPosts = async () => {
        try {
          const { data } = await API.getPosts(token);
          const lastPostId = posts[0].id;
          const newPostsCounter = data.filter((post) => post.id > lastPostId).length;
          if (newPostsCounter) {
            setNewPosts(data);
            setNewPostsCount(newPostsCounter);
          }
        } catch (err) {
          console.error("Interval API error");
        }
      };

      fetchNewPosts();
    },
    posts ? 15000 : null
  );

  const updatePosts = () => {
    setPosts(newPosts);
    setNewPostsCount(0);
  };

  return (
    <AppContainer>
      <TimelineContainer>
        <TimelineTitle>timeline</TimelineTitle>
        <PostForm user={user} token={token} loading={loading} setLoading={setLoading} setPosts={setPosts} />
        {newPostsCount ? <NewPostsButton updatePosts={updatePosts} newPostsCount={newPostsCount} /> : <></>}
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
