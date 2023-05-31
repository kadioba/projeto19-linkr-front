import { useState } from "react";
import * as S from "./styles";
import {MdKeyboardArrowDown, MdKeyboardArrowUp} from "react-icons/md";
import SearchBar from "../SearchBar/SearchBar";

export default function NavBar() {

    const [showLogout, setShowLogout] = useState(false);

    return(
        <S.ContainerNavBar>
            <S.LogoText>linkr</S.LogoText>
            <SearchBar header={true}/>
            <S.ContainerUserActions>
                    {(showLogout) ? 
                    <>
                        <MdKeyboardArrowUp onClick={() => setShowLogout(false)}/> 
                        <div>
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