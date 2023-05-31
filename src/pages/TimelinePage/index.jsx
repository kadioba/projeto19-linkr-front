import { useEffect, useState } from "react";
import PostForm from "../../components/PostForm";
import { AppContainer, TimelineContainer, TimelineTitle } from "./styles";
import useMyContext from "../../contexts/MyContext.jsx";
import axios from "axios";
import API from "../../config/api";
import { PostContainer } from "../../components/PostComponent/styles";

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

    }, [user, posts]);



    return (
        <AppContainer>
            <TimelineContainer>
                <TimelineTitle>timeline</TimelineTitle>
                <PostForm userPicture={userData.picture} token={user} posts={posts} setPosts={setPosts} />
                <PostContainer />
            </TimelineContainer>
        </AppContainer>
    )
}