import { useEffect, useState } from "react";
import API from "../../config/api";
import { Hashtag } from "./styles";
import { useNavigate } from "react-router";
import useTokenContext from "../../contexts/TokenContext";
import useRefreshContext from "../../contexts/RefreshContext";

export default function TrendingHashtags(props) {
  const { loading, setPosts } = props;

  const { token } = useTokenContext();
  const { refresh, setRefresh } = useRefreshContext();

  const [trendingHashtags, setTrendingHashtags] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function getTrendingHashtags() {
      try {
        const { data: trendingHashtags } = await API.getTrendingHashtags(token);
        setTrendingHashtags(trendingHashtags);
      } catch (err) {
        console.log(err);
      }
    }
    getTrendingHashtags();
  }, [loading, props.posts]);

  async function openHashtagPage(hashtag) {
    setPosts(undefined);
    setRefresh(!refresh);
    return navigate(`/hashtag/${hashtag}`);
  }

  return (
    <>
      {trendingHashtags.map((hashtag) => (
        <Hashtag data-test="hashtag" key={hashtag.hashtag_id} onClick={() => openHashtagPage(hashtag.name)}>
          #{hashtag.name}
        </Hashtag>
      ))}
    </>
  );
}
