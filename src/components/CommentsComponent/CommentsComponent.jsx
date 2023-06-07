import { IoPaperPlaneOutline } from "react-icons/io5";
import { CommentContainer, CommentInputContainer } from "./styles";
import { useEffect, useState } from "react";
import API from "../../config/api";

export default function CommentsComponent(props) {

    const { token, postId } = props

    const [comment, setComment] = useState("")
    const [comments, setComments] = useState([])

    console.log(comments)

    useEffect(() => {
        const promisse = API.getPostComments(token, postId)
        promisse.then((res) => {
            setComments(res.data)
            console.log(res)
        })
    }, [])

    function handleSendComment(e) {
        e.preventDefault()
        //const promisse = API.commentPost(token, postId, { text: comment })
        console.log(comment)
        setComment("")
    }

    return (
        <CommentContainer>
            <CommentInputContainer>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgHMEvAmwb8c8MGAVd5RXwt7szQCwu-QnKR6G9Ze2sCOthXlt1DZsIncqZ4JuNLvM_kcU&usqp=CAU" alt="" />
                <form onSubmit={handleSendComment}>
                    <input value={comment} type="text" placeholder="write a comment..." onChange={(e) => setComment(e.target.value)} />
                    <IoPaperPlaneOutline size="15px" color="#FFFFFF" onClick={handleSendComment} />
                </form>
            </CommentInputContainer>
        </CommentContainer>
    )
}