// import axios from "axios";
import React, { useState, useEffect, createContext } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      const [username, userId] = token.split(" ");
      setUser({ id: Number(userId), username: username });
    }
  }, []);

  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  );
}
