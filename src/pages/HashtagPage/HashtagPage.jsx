import { useEffect, useState } from "react";
import {
  AppContainer,
  ContentDivider,
  HashtagPageContainer,
  HashtagTitle,
  LoadingContainer,
  TrendingHashtagsContainer,
  TrendingHashtagsTitle,
} from "./styles";
import useMyContext from "../../contexts/MyContext.jsx";
import API from "../../config/api";
import PostComponent from "../../components/PostComponent";
import TrendingHashtags from "../../components/TrendingHashtags/TrendingHashtags.jsx";
import { useParams } from "react-router";
import { MutatingDots } from "react-loader-spinner";

export default function HashtagPage() {

    const { user, token, refresh } = useMyContext();
    const [postsByHashtag, setPostsByHashtag] = useState(undefined);

    const { hashtag } = useParams();

    useEffect(() => {
        async function getPostsByHashtag() {
            try {
                const { data } = await API.getPostsByHashtag(token, hashtag)
                setPostsByHashtag(data)
            } catch (err) {
                console.log(err)
            }
        }
        getPostsByHashtag()
    }, [refresh]);

    function renderPosts() {
        if (postsByHashtag) {
            if (postsByHashtag.length === 0) return (<h1>There are no posts yet</h1>)

            return postsByHashtag.map((post) => { return <PostComponent key={post.id} post={post} userId={user.id} /> })
        } else {
            return (
                <LoadingContainer>
                    <MutatingDots
                    height="100"
                    width="100"
                    color="#ffffff"
                    secondaryColor='#ffffff'
                    radius='12.5'
                    ariaLabel="mutating-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
                </LoadingContainer>
            )
        }
    }


    return (
        <AppContainer>
            <HashtagPageContainer>
                <HashtagTitle># {hashtag}</HashtagTitle>
                {renderPosts()}
            </HashtagPageContainer>
            <TrendingHashtagsContainer>
                <TrendingHashtagsTitle>trending</TrendingHashtagsTitle>
                <ContentDivider />
                <TrendingHashtags setPosts={setPostsByHashtag} />
            </TrendingHashtagsContainer>
        </AppContainer>
    )
}
