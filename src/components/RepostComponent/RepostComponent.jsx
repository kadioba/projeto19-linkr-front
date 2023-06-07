import { RepostContainer } from "./styles.jsx";
import { BiRepost } from 'react-icons/bi';

export default function RepostComponent({reposter_username}){
    return (
        <RepostContainer>
            <BiRepost />
            <p>Re-posted by <span>{reposter_username}</span></p>
        </RepostContainer>
    )
}