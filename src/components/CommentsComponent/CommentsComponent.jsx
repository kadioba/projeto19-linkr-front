import { IoPaperPlaneOutline } from "react-icons/io5";
import { CommentsContainer, CommentInputContainer } from "./styles";
import { useEffect, useState } from "react";
import API from "../../config/api";
import Comment from "../CommentComponent/Comment";
import useUserContext from "../../contexts/UserContext";

export default function CommentsComponent(props) {

    const { token, postId } = props
    const { user } = useUserContext();

    const [comment, setComment] = useState("")
    const [comments, setComments] = useState([])
    const [isAuthor, setIsAuthor] = useState(false)

    console.log(props.postUserId)
    console.log(user.id)

    useEffect(() => {
        verifyAuthor()
        const promisse = API.getPostComments(token, postId)
        promisse.then((res) => {
            setComments(res.data)
        })
    }, [])

    function verifyAuthor() {
        if (props.postUserId === user.id) {
            setIsAuthor(true)
        }
        else {
            setIsAuthor(false)
        }
    }


    function handleSendComment(e) {
        e.preventDefault()
        const promisse = API.publishComment(token, postId, { content: comment })
        promisse
            .then((res) => {
                console.log(res)
                const newComment = { ...res.data, picture: user.picture, username: user.username, is_author: isAuthor }
                console.log(newComment)
                setComments([...comments, newComment])
            })
            .catch((err) => {
                console.log(err)
            })
        setComment("")

    }

    return (
        <CommentsContainer>
            {comments.map(commentRecived => <Comment key={commentRecived.id} comment={commentRecived} />)}
            <CommentInputContainer>
                <img src={user.picture} alt="" />
                <form onSubmit={handleSendComment}>
                    <input value={comment} type="text" placeholder="write a comment..." onChange={(e) => setComment(e.target.value)} />
                    <IoPaperPlaneOutline size="15px" color="#FFFFFF" onClick={handleSendComment} />
                </form>
            </CommentInputContainer>
        </CommentsContainer>
    )
}