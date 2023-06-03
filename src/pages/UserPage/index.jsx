import * as S from "./styles";
import TrendingHashtags from "../../components/TrendingHashtags/TrendingHashtags.jsx";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../config/api";
import useMyContext from "../../contexts/MyContext.jsx";
import PostComponent from "../../components/PostComponent";

export default function UserPage() {
    const navigate = useNavigate();
    const { user, token } = useMyContext();
    const [userData, setUserData] = useState({});
    const [posts, setPosts] = useState([]);
    const {id} = useParams();

    useEffect(() => {
        if (!user) return navigate("/");
    
        const requestUserData = API.buscarUsuarioId(token,id);
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
    }, [id]);

    function renderPosts() {
        if (posts) {
          if (posts.length === 0) return <h1 data-test="message">There are no posts yet</h1>;
          else {
          }
          return posts.map((post) => {
            return <PostComponent data-test="post" key={post.id} post={post} userId={userData.id} />;
          });
        } else {
          return <h1>Loading...</h1>;
        }
    }

    return(
        <S.ContainerUserPage>
            <S.ContentUserPage>
                <div>
                    <img src={userData.picture}/>
                    <p>{userData.username}’s posts</p>
                </div>

                <div>
                    {renderPosts()}
                </div>
            </S.ContentUserPage>
            <S.TrendingHashtagsContainer data-test="trending">
                <S.TrendingHashtagsTitle>trending</S.TrendingHashtagsTitle>
                <S.ContentDivider></S.ContentDivider>
                <TrendingHashtags />
            </S.TrendingHashtagsContainer>
        </S.ContainerUserPage>
    );

}