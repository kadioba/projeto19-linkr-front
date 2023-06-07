import * as S from "./styles";
import TrendingHashtags from "../../components/TrendingHashtags/TrendingHashtags";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../config/api";
import PostsRenderer from "../../components/PostsRenderer/PostsRenderer";
import useUserContext from "../../contexts/UserContext";
import useTokenContext from "../../contexts/TokenContext";
import InfiniteScroll from "react-infinite-scroller";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent.jsx";

export default function UserPage() {
  const navigate = useNavigate();
  const { user, setFollowUpdated } = useUserContext();
  const { token } = useTokenContext();
  const [userData, setUserData] = useState({});
  const [posts, setPosts] = useState(undefined);
  const { id } = useParams();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasMorePosts, setHasMorePosts] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!token) return navigate("/");

    const fetchData = async () => {
      try {
        const res = await API.getUserDataWithPosts(token, id);
        setUserData(res.data.userData);
        setPosts(res.data.posts);
        if (res.data?.posts.length >= 10) {
          setHasMorePosts(true);
        }
      } catch (err) {
        console.log("An error occurred while trying to fetch the user data/posts, please refresh the page");
      }
    };

    fetchData();
  }, [id]);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);


  const fetchMorePosts = async (page) => {
    try {
      const { data } = await API.getPostById(token, id, page);
      const hasMore = data?.length > 0;

      setPosts((prevPosts) => [...prevPosts, ...data]);
      setHasMorePosts(hasMore);
    } catch (err) {
      console.error("Error fetching more posts:", err);
    }
  };

  function changeFollowState() {
    API.followUser(token, id)
      .then((res) => {
        setFollowUpdated(false);
        setDisabledButton(false);
      })
      .catch((err) => {
        alert("An error occurred while trying to follow the user, please try again");
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
          <InfiniteScroll
            pageStart={1}
            loadMore={fetchMorePosts}
            hasMore={hasMorePosts}
            loader={<LoadingComponent key="loading" />}
          >
            <PostsRenderer posts={posts} user={user} setPosts={setPosts} />
          </InfiniteScroll>
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
