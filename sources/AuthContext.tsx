import React, { useState, createContext } from "react";
import { AuthPropsContext } from "./Types";

export const AuthenticatedUserContext = createContext<AuthPropsContext | {}>({});

export const AuthenticatedUserProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState({});

  const value = {
    user: user, 
    setUser: setUser,
  };

  return (
    <AuthenticatedUserContext.Provider value={value}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};
