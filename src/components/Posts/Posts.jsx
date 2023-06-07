import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import SearchBar from "../SearchBar/SearchBar";
import { useState } from "react";

export default function Posts() {
  const [posts, setPosts] = useState(undefined);
  const [fetch, setFetch] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const value = { posts, setPosts, fetch, setFetch, disabled, setDisabled };
  return (
    <>
      <NavBar />
      <SearchBar header={false} />
      <Outlet context={value} />
    </>
  );
}
