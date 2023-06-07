import * as S from "./styles";
import TrendingHashtags from "../../components/TrendingHashtags/TrendingHashtags";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../config/api";
import PostsRenderer from "../../components/PostsRenderer/PostsRenderer";
import useUserContext from "../../contexts/UserContext";
import useTokenContext from "../../contexts/TokenContext";

export default function UserPage() {
  const navigate = useNavigate();
  const { user, setFollowUpdated } = useUserContext();
  const { token } = useTokenContext();
  const [userData, setUserData] = useState({});
  const [posts, setPosts] = useState(undefined);
  const { id } = useParams();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!token) return navigate("/");

    const requestUserData = API.getUserById(token, id);
    requestUserData
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.log("An error occured while trying to fetch the user data, please refresh the page");
      });

    const requestPosts = API.getPostById(token, id);
    requestPosts
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log("An error occured while trying to fetch the posts, please refresh the page");
      });
    // eslint-disable-next-line
  }, [id]);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  function changeFollowState() {
    API.followUser(token, id)
      .then((res) => {
        setFollowUpdated(false);
        setDisabledButton(false);
      })
      .catch((err) => {
        console.log("An error occurred while trying to follow the user, please try again");
        setDisabledButton(false);
      });

      setDisabledButton(true);
      setFollowUpdated(true);
  }

  return (
    <S.ContainerUserPage>
      <S.HeaderUserPage buttonStyle={(user.following !== undefined && id in user.following) ? "true" : undefined}>
        <div>
          <img
            alt="profile"
            src={userData.picture}
            onLoad={handleImageLoad}
            style={!imageLoaded ? { display: "none" } : {}}
          />
          {imageLoaded ? (
            <p>{userData.username}'s posts</p>
          ) : (
            <>
              <S.ImagePlaceholder />
              <S.TextPlaceholder />
            </>
          )}
        </div>
        {user.id != id && 
            <button disabled={disabledButton} onClick={() => changeFollowState()}>
              {
                (disabledButton) ? "..." : (user.following !== undefined && id in user.following) ? "Unfollow" : "Follow"
              }
            </button>
          }
      </S.HeaderUserPage>
      <S.ContentUserPage>
        <div>
          <PostsRenderer posts={posts} user={user} setPosts={setPosts} />
        </div>
        <S.TrendingHashtagsContainer data-test="trending">
          <S.TrendingHashtagsTitle>trending</S.TrendingHashtagsTitle>
          <S.ContentDivider></S.ContentDivider>
          <TrendingHashtags setPosts={setPosts} posts={posts} />
        </S.TrendingHashtagsContainer>
      </S.ContentUserPage>
    </S.ContainerUserPage>
  );
}
