import { useEffect, useState } from "react";
import PostForm from "../../components/PostForm";
import { AppContainer, ContentDivider, TimelineContainer, TimelineTitle, TrendingHashtagsContainer, TrendingHashtagsTitle } from "./styles";
import useMyContext from "../../contexts/MyContext.jsx";
import axios from "axios";
import API from "../../config/api";
import { PostContainer } from "../../components/PostComponent/styles";
import PostComponent from "../../components/PostComponent";
import TrendingHashtags from "../../components/TrendingHashtags/TrendingHashtags.jsx";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router";

export default function TimelinePage() {

    const navigate = useNavigate();
    const { user, setUser } = useMyContext();
    const [userData, setUserData] = useState({});
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (!user) return navigate("/");
        const config = {
            headers: {
                "Authorization": `Bearer ${user}`
            }
        }
        const requestUserData = axios.get(`http://localhost:5000/user`, config);
        requestUserData.then((res) => {
            setUserData(res.data);
        });
        const requesPosts = axios.get(`http://localhost:5000/posts`, config);
        requesPosts.then((res) => {
            setPosts(res.data);
        });
        requesPosts.catch((err) => {
            console.log("An error occured while trying to fetch the posts, please refresh the page");
        })

    }, [user, navigate]);

    function renderPosts() {
        if (posts) {
            if (posts.length === 0) return (<h1>There are no posts yet</h1>)
            else {

            }
            return posts.map((post) => { return <PostComponent key={post.id} post={post} /> })
        } else {
            return <h1>Carregando...</h1>
        }
    }


    return (
        <AppContainer>
            <TimelineContainer>
                <TimelineTitle>timeline</TimelineTitle>
                <PostForm userPicture={userData.picture} token={user} posts={posts} setPosts={setPosts} />
                {renderPosts()}
            </TimelineContainer>
            <TrendingHashtagsContainer>
                <TrendingHashtagsTitle>trending</TrendingHashtagsTitle>
                <ContentDivider></ContentDivider>
                <TrendingHashtags />
            </TrendingHashtagsContainer>
        </AppContainer>
    )
}
