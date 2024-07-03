import React, { useEffect, useContext } from "react";
import Listing from "./Listing";
import { Flex } from "@chakra-ui/react";
import { getAllListings } from "../../api/listings";
import { ListingContext } from "../../context/listingContext";

const Listings = () => {
  const [allListings, setAllListings] = useContext(ListingContext);

  useEffect(() => {
    // Fetch users when component mounts
    const fetchListings = async () => {
      try {
        const fetchedListings = await getAllListings();
        setAllListings(fetchedListings);
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    };
    fetchListings();
  }, []);

  return (
    <Flex flexWrap="wrap" justify="center">
      {allListings.map((listing) => {
        return <Listing key={listing.id} listing={listing} />;
      })}
    </Flex>
  );
};

export default Listings;
