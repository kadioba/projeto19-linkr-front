import { createContext, useContext } from "react";
import useStickyState from "../hooks/useStickyState.jsx"

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [user, setUser] = useStickyState();
  return <MyContext.Provider value={{ user, setUser }}>{children}</MyContext.Provider>;
};

export default function useMyContext() {
  return useContext(MyContext);
}
