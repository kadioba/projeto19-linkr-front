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
import { useNavigate } from "react-router-dom";
import API from "../../config/api";

export default function TimelinePage() {
  const navigate = useNavigate();
  const { user } = useMyContext();
  const [userData, setUserData] = useState({});
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return navigate("/");

    const requestUserData = API.buscarUsuario(user);
    requestUserData
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.log("An error occured while trying to fetch the user data, please refresh the page");
      });
    const requestPosts = API.buscarPosts(user);
    requestPosts
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log("An error occured while trying to fetch the posts, please refresh the page");
      });
  }, [loading]);

  function renderPosts() {
    if (posts) {
      if (posts.length === 0) return <h1 data-test="message">There are no posts yet</h1>;
      else {
      }
      return posts.map((post) => {
        return <PostComponent data-test="post" key={post.id} post={post} userId={userData.id} token={user} />;
      });
    } else {
      return <h1>Loading...</h1>;
    }
  }

  return (
    <AppContainer>
      <TimelineContainer>
        <TimelineTitle>timeline</TimelineTitle>
        <PostForm userPicture={userData.picture} token={user} loading={loading} setLoading={setLoading} />
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
