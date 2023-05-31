import { useState } from "react";
import {AiOutlineSearch} from "react-icons/ai";
import {MdClear} from "react-icons/md";
import * as S from "./styles";

export default function SearchBar(props){
    const [search, setSearch] = useState("");

    return(
        <S.ContainerSearchBar header={props.header}>
            <S.SearchBar>
                <input 
                    type="text" 
                    placeholder="Search for people"
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                />
                {(search.length === 0) ?
                    <AiOutlineSearch/> :
                    <MdClear onClick={() => setSearch("")}/>
                }
            </S.SearchBar>
        </S.ContainerSearchBar>
    );
}