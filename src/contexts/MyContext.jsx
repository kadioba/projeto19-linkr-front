import { createContext, useContext } from "react";
import useStickyState from "../hooks/useStickyState.jsx";

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [token, setToken] = useStickyState();
  return <MyContext.Provider value={{ token, setToken }}>{children}</MyContext.Provider>;
};

export default function useMyContext() {
  return useContext(MyContext);
}
