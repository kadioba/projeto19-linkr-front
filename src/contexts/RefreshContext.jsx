import { createContext, useContext, useState } from "react";

const RefreshContext = createContext();

export const RefreshProvider = ({ children }) => {
  const [refresh, setRefresh] = useState(false);
  const value = { refresh, setRefresh };
  return <RefreshContext.Provider value={value}>{children}</RefreshContext.Provider>;
};

export default function useRefreshContext() {
  return useContext(RefreshContext);
}
