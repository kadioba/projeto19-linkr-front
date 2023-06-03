import * as S from "./styles";
import TrendingHashtags from "../../components/TrendingHashtags/TrendingHashtags.jsx";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../config/api";
import useMyContext from "../../contexts/MyContext.jsx";
import PostsRenderer from "../../components/PostsRenderer/PostsRenderer.jsx";

export default function UserPage() {
  const navigate = useNavigate();
  const { user, token } = useMyContext();
  const [userData, setUserData] = useState({});
  const [posts, setPosts] = useState(undefined);
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!user) return navigate("/");

    const requestUserData = API.buscarUsuarioId(token, id);
    requestUserData
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.log("An error occured while trying to fetch the user data, please refresh the page");
      });

    const requestPosts = API.buscarPostsId(token, id);
    requestPosts
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log("An error occured while trying to fetch the posts, please refresh the page");
      });
    // eslint-disable-next-line
  }, [id]);

  return (
    <S.ContainerUserPage>
      <S.ContentUserPage>
        <div>
          <img alt="profile" src={userData.picture} />
          <p>{userData.username}'s posts</p>
        </div>
        <div>
          <PostsRenderer posts={posts} user={user} setPosts={setPosts} />
        </div>
      </S.ContentUserPage>
      <S.TrendingHashtagsContainer data-test="trending">
        <S.TrendingHashtagsTitle>trending</S.TrendingHashtagsTitle>
        <S.ContentDivider></S.ContentDivider>
        <TrendingHashtags setPosts={setPosts} />
      </S.TrendingHashtagsContainer>
    </S.ContainerUserPage>
  );
}
