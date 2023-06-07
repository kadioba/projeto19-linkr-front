import { IoPaperPlaneOutline } from "react-icons/io5";
import { CommentsContainer, CommentInputContainer } from "./styles";
import { useEffect, useState } from "react";
import API from "../../config/api";
import Comment from "../CommentComponent/Comment";

export default function CommentsComponent(props) {

    const { token, postId } = props

    const [comment, setComment] = useState("")
    const [comments, setComments] = useState([])

    console.log(comments)

    useEffect(() => {
        const promisse = API.getPostComments(token, postId)
        promisse.then((res) => {
            setComments(res.data)
        })
    }, [])

    function handleSendComment(e) {
        e.preventDefault()
        const promisse = API.publishComment(token, postId, { content: comment })
        promisse
            .then((res) => {
                setComments([...comments, res.data])
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
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgHMEvAmwb8c8MGAVd5RXwt7szQCwu-QnKR6G9Ze2sCOthXlt1DZsIncqZ4JuNLvM_kcU&usqp=CAU" alt="" />
                <form onSubmit={handleSendComment}>
                    <input value={comment} type="text" placeholder="write a comment..." onChange={(e) => setComment(e.target.value)} />
                    <IoPaperPlaneOutline size="15px" color="#FFFFFF" onClick={handleSendComment} />
                </form>
            </CommentInputContainer>
        </CommentsContainer>
    )
}