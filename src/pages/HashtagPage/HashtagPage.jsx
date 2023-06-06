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

export default function HashtagPage() {
  const { user } = useUserContext();
  const { token } = useTokenContext();
  const { refresh } = useRefreshContext();
  const [posts, setPosts] = useState(undefined);

  const { hashtag } = useParams();

  useEffect(() => {
    async function getPostsByHashtag() {
      try {
        const { data } = await API.getPostsByHashtag(token, hashtag);
        setPosts(data);
      } catch (err) {
        console.log(err);
      }
    }
    getPostsByHashtag();
    // eslint-disable-next-line
  }, [refresh]);

  return (
    <AppContainer>
      <HashtagPageContainer>
        <HashtagTitle data-test="hashtag-title">#{hashtag}</HashtagTitle>
        <PostsRenderer posts={posts} user={user} setPosts={setPosts} />
      </HashtagPageContainer>
      <TrendingHashtagsContainer>
        <TrendingHashtagsTitle>trending</TrendingHashtagsTitle>
        <ContentDivider />
        <TrendingHashtags setPosts={setPosts} posts={posts} />
      </TrendingHashtagsContainer>
    </AppContainer>
  );
}
