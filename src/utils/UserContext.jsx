import React from "react";
import { createContext, useContext } from "react";
import useUserData from "./useUserData";

const UserProvider = createContext();

export const useHandleUser = () => useContext(UserProvider);

function UserContext({ children }) {
  const handleUser = useUserData();
  return (
    <UserProvider.Provider value={handleUser}>{children}</UserProvider.Provider>
  );
}

export default UserContext;
