import { useEffect, useRef, useState } from "react";
import * as S from "./styles";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import SearchBar from "../SearchBar/SearchBar";
import useMyContext from "../../contexts/MyContext.jsx";

export default function NavBar() {
  const [showLogout, setShowLogout] = useState(false);
  const { setUser } = useMyContext();
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowLogout(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggleMenu = () => {
    setShowLogout((prevShowLogout) => !prevShowLogout);
  };

  const handleLogout = () => {
    setUser("");
  };

  return (
    <S.ContainerNavBar>
      <S.LogoText>linkr</S.LogoText>
      <SearchBar header={true} />
      <S.ContainerUserActions ref={menuRef}>
        {showLogout ? (
          <>
            <MdKeyboardArrowUp onClick={handleToggleMenu} />
            <div onClick={handleLogout}>
              <p>Logout</p>
            </div>
          </>
        ) : (
          <MdKeyboardArrowDown onClick={handleToggleMenu} />
        )}
        <img src="https://img.r7.com/images/meme-sorriso-forcado-hide-the-pain-harold-maurice-andras-arato-08112019141226221?dimensions=630x404" onClick={handleToggleMenu}/>
      </S.ContainerUserActions>
    </S.ContainerNavBar>
  );
}
