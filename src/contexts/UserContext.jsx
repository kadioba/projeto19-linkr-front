import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [followUpdated, setFollowUpdated] = useState(false);
  const value = { user, setUser, followUpdated, setFollowUpdated };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default function useUserContext() {
  return useContext(UserContext);
}
