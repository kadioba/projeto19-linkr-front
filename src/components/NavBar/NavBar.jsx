import { useCallback, useEffect, useRef, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import API from "../../config/api";
import useMyContext from "../../contexts/MyContext";
import SearchBar from "../SearchBar/SearchBar";
import * as S from "./styles";

const NavBar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { setUser, user, token, setToken } = useMyContext();
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowLogout(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    API.getUser(token)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log("An error occurred while trying to fetch the user data, please refresh the page", err);
      });

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navigate, setUser, token]);

  const handleToggleMenu = useCallback(() => {
    setShowLogout((prevShowLogout) => !prevShowLogout);
  }, [setShowLogout]);

  const handleLogout = useCallback(() => {
    setToken("");
    setUser("");
    navigate("/");
  }, [navigate, setToken, setUser]);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  return (
    <S.ContainerNavBar>
      <S.LogoText onClick={() => navigate("/timeline")}>linkr</S.LogoText>
      <SearchBar header={true} />
      <S.ContainerUserActions ref={menuRef}>
        {showLogout ? (
          <>
            <MdKeyboardArrowUp onClick={handleToggleMenu} />
            <div data-test="menu">
              <p onClick={handleLogout} data-test="logout">Logout</p>
            </div>
          </>
        ) : (
          <MdKeyboardArrowDown onClick={handleToggleMenu} />
        )}
        <S.ImagePlaceholder style={!imageLoaded ? {} : { display: "none" }} />
        <img
          alt={`${user.username}'s xoxo`}
          src={user.picture}
          onLoad={handleImageLoad}
          onClick={handleToggleMenu}
          data-test= "avatar"
          style={!imageLoaded ? { display: "none" } : {}}
        />
      </S.ContainerUserActions>
    </S.ContainerNavBar>
  );
};

export default NavBar;
