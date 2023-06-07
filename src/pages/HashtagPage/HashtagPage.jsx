import { useEffect, useState } from "react";
import {
  AppContainer,
  ContentDivider,
  HashtagPageContainer,
  HashtagTitle,
  TrendingHashtagsContainer,
  TrendingHashtagsTitle,
} from "./styles";
import API from "../../config/api";
import TrendingHashtags from "../../components/TrendingHashtags/TrendingHashtags";
import { useParams } from "react-router";
import PostsRenderer from "../../components/PostsRenderer/PostsRenderer";
import useUserContext from "../../contexts/UserContext";
import useTokenContext from "../../contexts/TokenContext";
import useRefreshContext from "../../contexts/RefreshContext";
import InfiniteScroll from "react-infinite-scroller";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent.jsx";

export default function HashtagPage() {
  const { user } = useUserContext();
  const { token } = useTokenContext();
  const { refresh } = useRefreshContext();
  const [posts, setPosts] = useState(undefined);
  const [hasMorePosts, setHasMorePosts] = useState(false);

  const { hashtag } = useParams();

  useEffect(() => {
    async function getPostsByHashtag() {
      try {
        const { data } = await API.getPostsByHashtag(token, hashtag);
        setPosts(data);
        if (data?.length >= 10) {
          setHasMorePosts(true);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getPostsByHashtag();
    // eslint-disable-next-line
  }, [refresh]);

  const fetchMorePosts = async (page) => {
    if (posts?.length < 10) {
      setHasMorePosts(false);
      return;
    }
    try {
      const { data } = await API.getPostsByHashtag(token, hashtag, page);
      const hasMore = data?.length > 0;

      setPosts((prevPosts) => [...prevPosts, ...data]);
      setHasMorePosts(hasMore);
    } catch (err) {
      console.error("Error fetching more posts:", err);
    }
  };

  return (
    <AppContainer>
      <HashtagPageContainer>
        <HashtagTitle data-test="hashtag-title">#{hashtag}</HashtagTitle>
        <InfiniteScroll
          pageStart={1}
          loadMore={fetchMorePosts}
          hasMore={hasMorePosts}
          loader={<LoadingComponent key="loading" />}
        >
          <PostsRenderer posts={posts} user={user} setPosts={setPosts} />
        </InfiniteScroll>
      </HashtagPageContainer>
      <TrendingHashtagsContainer>
        <TrendingHashtagsTitle>trending</TrendingHashtagsTitle>
        <ContentDivider />
        <TrendingHashtags setPosts={setPosts} posts={posts} />
      </TrendingHashtagsContainer>
    </AppContainer>
  );
}
