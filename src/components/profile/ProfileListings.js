import React, { useEffect, useContext } from "react";
import { ListingContext } from "../../context/listingContext";
import { getAllListings } from "../../api/listings";
import { Flex } from "@chakra-ui/react";
import Listing from "../listings/Listing";

const ProfileListings = ({ profileUser }) => {
  const { allListings, setAllListings } = useContext(ListingContext);

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
  }, [setAllListings]);

  return (
    <Flex flexWrap="wrap" justify="center" pt={5}>
      {allListings
        .filter((listing) => listing?.user?.username === profileUser?.username)
        .map((listing) => {
          return <Listing key={listing?.id} listing={listing} />;
        })}
    </Flex>
  );
};

export default ProfileListings;
