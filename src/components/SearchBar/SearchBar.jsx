import { useEffect, useState } from "react";
import {AiOutlineSearch} from "react-icons/ai";
import {MdClear} from "react-icons/md";
import * as S from "./styles";
import { DebounceInput } from 'react-debounce-input';
import useMyContext from "../../contexts/MyContext.jsx";
import API from "../../config/api";
import { useNavigate } from "react-router-dom";

export default function SearchBar(props){
    const [search, setSearch] = useState("");
    const [isOnFocus, setIsOnFocus] = useState(false);
    const { user, token } = useMyContext();
    const [searchResultList, setSearchResultList] = useState([]);
    const navigate = useNavigate();

    const handleClickOutside = () => {
		setTimeout(() => setIsOnFocus(false), 150);
	};

    useEffect(() => {
        if (search.length < 3) return setSearchResultList([]);

		if (user) {
			const searchUsers = API.procurarUsuarios(token, search);
            searchUsers
            .then((res) => {
                setSearchResultList(res.data);
              })
              .catch((err) => {
                console.log("An error occurred while trying to fetch the user data, please refresh the page");
              });
		}

        console.log(searchResultList);
    },[search])

    return(
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
                />
                {(search.length === 0) ?
                    <AiOutlineSearch/> :
                    <MdClear onClick={() => setSearch("")}/>
                }
            </S.SearchBar>
            <S.ContainerSearchResults display={(isOnFocus && search.length >= 3) ? "true" : undefined }>
                {searchResultList.map((result, index) => (
                    <div key={index} onClick={() => navigate(`user/${result.id}`)}>
                        <img src={result.picture}/>
                        <p>{result.username}</p>
                    </div>
                ))}
            </S.ContainerSearchResults>
        </S.ContainerSearchBar>
    );
}