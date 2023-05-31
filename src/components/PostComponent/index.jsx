import { useState } from "react";
import { AuthorName, Container, LinkContent, PictureAndLikes, PostContainer, PostContent, PostText } from "./styles";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";


export default function PostComponent() {

    const [liked, setLiked] = useState(false);

    return (
        <PostContainer>
            <PictureAndLikes>
                <img src="https://static.poder360.com.br/2021/12/kimjongun-abr2020-1536x1024-1-848x477.jpeg" alt="" />
                {liked ? < IoHeartSharp color="white" size="20px" /> : < IoHeartOutline color="white" size="20px" />}
                <h2>1 like</h2>
            </PictureAndLikes>
            <PostContent>
                <AuthorName>KimJong UN</AuthorName>
                <PostText>Muito maneiro esse tutorial de como fazer Kabum</PostText>
                <LinkContent>Link Content</LinkContent>
            </PostContent>
        </PostContainer>
    )
}