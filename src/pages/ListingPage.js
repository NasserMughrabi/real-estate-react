import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getListingForUser } from "../api/users";
import Listing from "../components/listings/Listing";
import { Flex } from "@chakra-ui/react";
import HomeBtn from "../components/common/HomeBtn";

const ListingPage = () => {
  const { userId } = useParams();
  const { listingId } = useParams();
  const [listing, setListing] = useState();

  useEffect(() => {
    const getListing = async () => {
      try {
        const fetchedListing = await getListingForUser(userId, listingId);
        setListing(fetchedListing);
      } catch (error) {
        console.log("error getting listing by id: ", listingId);
      }
    };
    getListing();
  }, []);

  return (
    <Flex justifyContent={"center"}>
      <HomeBtn />
      <Listing listing={listing} />
    </Flex>
  );
};

export default ListingPage;
