import { createContext, useContext, useState } from "react";
import useStickyState from "../hooks/useStickyState";

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [token, setToken] = useStickyState();
  const [user, setUser] = useState("");
  const [refresh, setRefresh] = useState(false);
  const value = { token, setToken, user, setUser, refresh, setRefresh };
  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

export default function useMyContext() {
  return useContext(MyContext);
}
