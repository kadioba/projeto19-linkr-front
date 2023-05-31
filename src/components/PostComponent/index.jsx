import { IoHeartOutline, IoHeartSharp } from 'react-icons/io5';
import { PostContainer } from './styles';

export default function PostComponent(props) {

    const [liked, setLiked] = useState(false);


    return (
        <PostContainer>
            <PictureAndLikes>
                <img src="" alt="" />
                {liked ? < IoHeartSharp /> : < IoHeartOutline />}
            </PictureAndLikes>
            <PostContent>
                <AuthorName>Author Name</AuthorName>
                <PostText>Post Text</PostText>
            </PostContent>
        </PostContainer>
    )
}