import React, { useState, createContext } from "react";

export const ListingContext = createContext();

export const ListingProvider = ({ children }) => {
  const [allListings, setAllListings] = useState([]);

  return (
    <ListingContext.Provider value={{allListings, setAllListings}}>
      {children}
    </ListingContext.Provider>
  );
};
