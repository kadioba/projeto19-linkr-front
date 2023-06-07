import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { MdClear } from "react-icons/md";
import { DebounceInput } from "react-debounce-input";
import { useNavigate } from "react-router-dom";
import API from "../../config/api";
import * as S from "./styles";
import useTokenContext from "../../contexts/TokenContext";
import useUserContext from "../../contexts/UserContext";

export default function SearchBar(props) {
  const { token } = useTokenContext();
  const { user } = useUserContext();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [isOnFocus, setIsOnFocus] = useState(false);
  const [searchResultList, setSearchResultList] = useState([]);

  const handleClickOutside = () => {
    setTimeout(() => setIsOnFocus(false), 150);
  };

  useEffect(() => {
    if (search.length < 3) return setSearchResultList([]);

    if (user) {
      const searchUsers = API.searchUsers(token, search);
      searchUsers
        .then((res) => {
          setSearchResultList(res.data);
        })
        .catch((err) => {
          console.log("An error occurred, please refresh the page");
        });
    }
  }, [search]);

  function sortSearch(searchResult){
    searchResult.sort((a, b) => {
      const idA = a.id;
      const idB = b.id;
    
      if (idA in user.following && !(idB in user.following)) {
        return -1; 
      } else if (idB in user.following && !(idA in user.following)) {
        return 1; 
      }
    
      return 0; 
    });

    return searchResult;
  }

  return (
    <S.ContainerSearchBar header={props.header}>
      <S.SearchBar>
        <DebounceInput
          type="text"
          placeholder="Search for people"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          debounceTimeout={300}
          onFocus={() => setIsOnFocus(true)}
          onBlur={handleClickOutside}
          data-test="search"
        />
        {search.length === 0 ? <AiOutlineSearch /> : <MdClear onClick={() => setSearch("")} />}
      </S.SearchBar>
      <S.ContainerSearchResults display={isOnFocus && search.length >= 3 ? "true" : undefined}>
        {sortSearch(searchResultList).map((result, index) => (
          <div key={index} data-test="user-search" onClick={() => navigate(`user/${result.id}`)}>
            <img src={result.picture} alt="User Avatar" />
            <p>{result.username}</p>
            {(result.id in user.following) && <p>• following</p>}
          </div>
        ))}
      </S.ContainerSearchResults>
    </S.ContainerSearchBar>
  );
}
