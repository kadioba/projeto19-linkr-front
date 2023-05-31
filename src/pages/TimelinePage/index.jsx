import { useEffect, useState } from "react";
import PostForm from "../../components/PostForm";
import { AppContainer, ContentDivider, TimelineContainer, TimelineTitle, TrendingHashtagsContainer, TrendingHashtagsTitle } from "./styles";
import useMyContext from "../../contexts/MyContext.jsx";
import axios from "axios";
import API from "../../config/api";
import { PostContainer } from "../../components/PostComponent/styles";
import PostComponent from "../../components/PostComponent";
import TrendingHashtags from "../../components/TrendingHashtags/TrendingHashtags.jsx";

export default function TimelinePage() {

    const { user, setUser } = useMyContext();
    const [userData, setUserData] = useState({});
    const [posts, setPosts] = useState([]);

    useEffect(() => {
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

    }, []);



    return (
        <AppContainer>
            <TimelineContainer>
                <TimelineTitle>timeline</TimelineTitle>
                <PostForm userPicture={userData.picture} token={user} posts={posts} setPosts={setPosts} />
                <PostComponent />
            </TimelineContainer>
            <TrendingHashtagsContainer>
                <TrendingHashtagsTitle>trending</TrendingHashtagsTitle>
                <ContentDivider></ContentDivider>
                <TrendingHashtags />
            </TrendingHashtagsContainer>
        </AppContainer>
    )
}