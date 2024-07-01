import React, { useState, useEffect } from "react";
import Listing from "../components/Listing";
// import { listings } from "../utils/data";
import { Alert, Flex } from "@chakra-ui/react";
import { getAllListings } from "../api/listings";

const Home = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    // Fetch users when component mounts
    const fetchListings = async () => {
      try {
        const fetchedListings = await getAllListings();
        setListings(fetchedListings);
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    };
    fetchListings();
  }, []);

  return (
    <Flex flexWrap="wrap" justify="center">
      {listings.map((listing) => {
        return <Listing key={listing.id} listing={listing} />;
      })}
    </Flex>
  );
};

export default Home;
