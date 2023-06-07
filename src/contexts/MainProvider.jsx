import React from 'react';
import { TokenProvider } from "./TokenContext";
import { UserProvider } from "./UserContext";
import { RefreshProvider } from "./RefreshContext";

const MainProvider = ({ children }) => {
  return (
    <TokenProvider>
      <UserProvider>
        <RefreshProvider>
          {children}
        </RefreshProvider>
      </UserProvider>
    </TokenProvider>
  );
};

export default MainProvider;
