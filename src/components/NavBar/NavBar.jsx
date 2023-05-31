import { useState } from "react";
import * as S from "./styles";
import {MdKeyboardArrowDown, MdKeyboardArrowUp} from "react-icons/md";
import SearchBar from "../SearchBar/SearchBar";
import useMyContext from "../../contexts/MyContext.jsx";

export default function NavBar() {

    const [showLogout, setShowLogout] = useState(false);
    const { setUser } = useMyContext();

    return(
        <S.ContainerNavBar>
            <S.LogoText>linkr</S.LogoText>
            <SearchBar header={true}/>
            <S.ContainerUserActions>
                    {(showLogout) ? 
                    <>
                        <MdKeyboardArrowUp onClick={() => setShowLogout(false)}/> 
                        <div onClick={() => setUser("")}>
                            <p>Logout</p>
                        </div> 
                    </>
                    : 
                    <MdKeyboardArrowDown onClick={() => setShowLogout(true)}/>}
                    <img src="https://img.r7.com/images/meme-sorriso-forcado-hide-the-pain-harold-maurice-andras-arato-08112019141226221?dimensions=630x404"/>
            </S.ContainerUserActions>
        </S.ContainerNavBar>
    );
}