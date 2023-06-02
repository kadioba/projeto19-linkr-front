import { useEffect, useRef, useState } from "react";
import * as S from "./styles";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import SearchBar from "../SearchBar/SearchBar";
import useMyContext from "../../contexts/MyContext.jsx";
import API from "../../config/api";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);
  const { setUser, user, token } = useMyContext();
  const menuRef = useRef(null);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const requestUserData = API.buscarUsuario(user);
    requestUserData
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.log("An error occurred while trying to fetch the user data, please refresh the page");
      });
  
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowLogout(false);
      }
    }
  
    document.addEventListener("mousedown", handleClickOutside);
    if (!token) return navigate("/");

    API.getUser(token)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log("An error occured while trying to fetch the user data, please refresh the page", err);
      });
      
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);  

  const handleToggleMenu = () => {
    setShowLogout((prevShowLogout) => !prevShowLogout);
  };

  const handleLogout = () => {
    setToken("");
    setUser("");
    navigate("/");
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <S.ContainerNavBar>
      <S.LogoText onClick={() => navigate("/timeline")}>linkr</S.LogoText>
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
        {!imageLoaded && <S.ImagePlaceholder />}
        <img
          alt={`${user.username}'s xoxo`}
          src={user.picture}
          onLoad={handleImageLoad}
          onClick={handleToggleMenu}
          style={{ display: imageLoaded ? "inline-block" : "none" }}
        />
      </S.ContainerUserActions>
    </S.ContainerNavBar>
  );
}
