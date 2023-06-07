import { createContext, useContext } from "react";
import useStickyState from "../hooks/useStickyState";

const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useStickyState();
  const value = { token, setToken };
  return <TokenContext.Provider value={value}>{children}</TokenContext.Provider>;
};

export default function useTokenContext() {
  return useContext(TokenContext);
}
