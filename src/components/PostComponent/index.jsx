import { useState } from "react";
import { AuthorName, Container, ImageContent, LinkContent, PictureAndLikes, PostContainer, PostContent, PostText } from "./styles";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { useNavigate } from "react-router";


export default function PostComponent({ post }) {

    const navigate = useNavigate();

    const [liked, setLiked] = useState(false);

    return (
        <PostContainer>
            <PictureAndLikes>
                <img src={post.picture} alt="" />
                {liked ? < IoHeartSharp color="white" size="20px" /> : < IoHeartOutline color="white" size="20px" />}
                <h2>1 like</h2>
            </PictureAndLikes>
            <PostContent>
                <AuthorName>{post.username}</AuthorName>
                <PostText>{post.content}</PostText>
                <LinkContent href={post.url} target="_blank">
                    <div>
                        <h1>{post.url_title}</h1>
                        <p>{post.url_description}</p>
                        <h2>{post.url}</h2>
                    </div>
                    <ImageContent src={post.url_picture} alt="" />
                </LinkContent>
            </PostContent>
        </PostContainer>
    )
}