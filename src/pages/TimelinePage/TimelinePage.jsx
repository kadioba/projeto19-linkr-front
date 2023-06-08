import { useEffect, useState } from "react";
import API from "../../config/api";
import useInterval from "../../hooks/useInterval";
import useTokenContext from "../../contexts/TokenContext";
import useUserContext from "../../contexts/UserContext";
import PostForm from "../../components/PostForm/PostForm";
import PostsRenderer from "../../components/PostsRenderer/PostsRenderer";
import TrendingHashtags from "../../components/TrendingHashtags/TrendingHashtags";
import NewPostsButton from "../../components/NewPostsButton/NewPostsButton";
import {
  AppContainer,
  ContentDivider,
  TimelineContainer,
  TimelineTitle,
  TrendingHashtagsContainer,
  TrendingHashtagsTitle,
} from "./styles";
import { useOutletContext } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroller";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent.jsx";

export default function TimelinePage() {
  const { token } = useTokenContext();
  const { user } = useUserContext();
  const { posts, setPosts, fetch, setFetch } = useOutletContext();
  const [loading, setLoading] = useState(false);
  const [newPosts, setNewPosts] = useState(posts);
  const [newPostsCount, setNewPostsCount] = useState(0);
  const [hasMorePosts, setHasMorePosts] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await API.getPosts(token, undefined, "TimelinePage");
        setPosts(data);
        if (data?.length >= 10) {
          setHasMorePosts(true);
        }
      } catch (err) {
        alert("An error occurred while trying to fetch the posts, please refresh the page");
      }
    };

    fetchPosts();
    // eslint-disable-next-line
  }, [fetch, token]);

  useInterval(
    () => {
      const fetchNewPosts = async () => {
        try {
          const { data } = await API.getPosts(token, undefined, "fetchNewPosts");
          const lastPostTimestamp = posts[0].created_at;
          let index = -1;
          for (let i = 0; i < data.length; i++) {
            if (data[i].created_at <= lastPostTimestamp) {
              break;
            }
            index = i;
          }
          if (index !== -1) {
            const newPostsFromData = data.slice(0, index + 1);
            const newPostsFromDataLength = newPostsFromData.length;
            if (newPostsFromDataLength) {
              const mergedArray = [...newPostsFromData, ...posts];
              setNewPosts(mergedArray);
              setNewPostsCount(newPostsFromDataLength);
            }
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

  const fetchMorePosts = async (page) => {
    if (posts?.length < 10) {
      setHasMorePosts(false);
      return;
    }
    try {
      const { data } = await API.getPosts(token, page, "InfiniteScroll");
      const hasMore = data?.length > 0;

      setPosts((prevPosts) => [...prevPosts, ...data]);
      setHasMorePosts(hasMore);
    } catch (err) {
      console.error("Error fetching more posts:", err);
    }
  };

  return (
    <AppContainer>
      <TimelineContainer>
        <TimelineTitle>timeline</TimelineTitle>
        <PostForm user={user} token={token} loading={loading} setLoading={setLoading} setPosts={setPosts} />
        {newPostsCount ? <NewPostsButton updatePosts={updatePosts} newPostsCount={newPostsCount} /> : null}
        <InfiniteScroll
          initialLoad={false}
          pageStart={1}
          loadMore={fetchMorePosts}
          hasMore={hasMorePosts}
          loader={<LoadingComponent key="loading" />}
          threshold={800}
        >
          <PostsRenderer posts={posts} user={user} setPosts={setPosts} />
        </InfiniteScroll>
      </TimelineContainer>
      <TrendingHashtagsContainer data-test="trending">
        <TrendingHashtagsTitle>trending</TrendingHashtagsTitle>
        <ContentDivider></ContentDivider>
        <TrendingHashtags loading={loading} setPosts={setPosts} posts={posts} />
      </TrendingHashtagsContainer>
    </AppContainer>
  );
}
