import { useEffect, useState } from "react";
import PostForm from "../../components/PostForm";
import { AppContainer, ContentDivider, HashtagPageContainer, HashtagTitle, TimelineContainer, TimelineTitle, TrendingHashtagsContainer, TrendingHashtagsTitle } from "./styles";
import useMyContext from "../../contexts/MyContext.jsx";
import axios from "axios";
import API from "../../config/api";
import PostComponent from "../../components/PostComponent";
import TrendingHashtags from "../../components/TrendingHashtags/TrendingHashtags.jsx";
import { useParams } from "react-router";

export default function HashtagPage() {

    const { user } = useMyContext();
    const [userData, setUserData] = useState({});
    const [posts, setPosts] = useState([]);

    const { hashtag } = useParams();

    console.log(hashtag)

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
            <HashtagPageContainer>
                <HashtagTitle># {hashtag}</HashtagTitle>
                <PostComponent />
            </HashtagPageContainer>
            <TrendingHashtagsContainer>
                <TrendingHashtagsTitle>trending</TrendingHashtagsTitle>
                <ContentDivider></ContentDivider>
                <TrendingHashtags />
            </TrendingHashtagsContainer>
        </AppContainer>
    )
}