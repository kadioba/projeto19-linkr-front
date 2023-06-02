import { createContext, useContext, useState } from "react";
import useStickyState from "../hooks/useStickyState.jsx";

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [token, setToken] = useStickyState();
  const [user, setUser] = useState("");
  const [refresh, setRefresh] = useState(false)
  return <MyContext.Provider value={{ token, setToken, user, setUser, refresh, setRefresh }}>{children}</MyContext.Provider>;
};

export default function useMyContext() {
  return useContext(MyContext);
}
