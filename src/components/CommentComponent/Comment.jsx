import { CommentContainer } from "./styles";

export default function Comment({ comment }) {
    function authorOrFollowing() {
        if (comment.is_author) {
            return <strong>• post’s author</strong>
        }
        else if (comment.is_followed) {
            return <strong>• following</strong>
        }
    }

    return (
        <CommentContainer data-test="comment">
            <img src={comment.picture} alt="" />
            <div>
                <h1>{comment.username} {authorOrFollowing()}</h1>
                <p>{comment.content}</p>
            </div>
        </CommentContainer>
    )
}
