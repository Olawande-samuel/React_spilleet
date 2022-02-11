
import React, { createContext, useContext } from "react";

export const UserContext = createContext(null);

export const SearchContext = createContext(null);

export const useUser = () => {
  return useContext(UserContext);
};