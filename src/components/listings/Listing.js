import React, { useContext } from "react";
import {
  Box,
  Image,
  Stack,
  Heading,
  Text,
  Button,
  Card,
  CardBody,
  Flex,
  Avatar,
  HStack,
  CloseButton,
  Link,
} from "@chakra-ui/react";
import { getAllListings, deleteListingById } from "../../api/listings";
import { ListingContext } from "../../context/listingContext";
import { UserContext } from "../../context/userContext";

const Listing = ({ listing }) => {
  const [allListings, setAllListings] = useContext(ListingContext);
  const [user] = useContext(UserContext);

  const deleteListing = async (id) => {
    try {
      await deleteListingById(id);
      const updatedListings = await getAllListings();
      setAllListings(updatedListings);
    } catch (error) {
      console.log("Error fetching listings:", error);
    }
  };

  return (
    <Card maxW="sm" m={4}>
      <CardBody>
        <Flex justifyContent={"space-between"}>
          <Link href={`http://localhost:3000/users/${listing?.user.id}`}>
            <HStack py={2} alignItems={"center"}>
              <Avatar size={"sm"} name={listing?.user.username} />
              <Box fontWeight={"bold"}>{listing?.user.username}</Box>
            </HStack>
          </Link>
          {user?.id === listing?.user.id && (
            <CloseButton
              colorScheme="red"
              _hover={{ backgroundColor: "#E53E3E", color: "white" }}
              onClick={() => deleteListing(listing?.id)}
            />
          )}
        </Flex>
        <Image
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{listing?.address}</Heading>
          <Text>{listing?.description}</Text>
          <Flex justifyContent={"space-between"}>
            <Text color="blue.600" fontSize="2xl">
              ${listing?.price}
            </Text>
            <Link
              _hover={{ textDecoration: "none" }}
              href={`http://localhost:3000/users/${listing?.user.id}/listings/${listing?.id}`}
            >
              <Button variant="solid" colorScheme="blue">
                Details
              </Button>
            </Link>
          </Flex>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default Listing;
