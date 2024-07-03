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

const listingsImages = [
  "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/36362/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/209296/pexels-photo-209296.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/209315/pexels-photo-209315.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/3209035/pexels-photo-3209035.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/2029665/pexels-photo-2029665.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/3288102/pexels-photo-3288102.png?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/3288100/pexels-photo-3288100.png?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1571470/pexels-photo-1571470.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/280232/pexels-photo-280232.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/6283973/pexels-photo-6283973.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/187815/pexels-photo-187815.jpeg?auto=compress&cs=tinysrgb&w=800",
];

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
          src={listingsImages[getRandomNumber(0, listingsImages.length - 1)]}
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

function getRandomNumber(min, max) {
  // Ensure min and max are integers
  min = Math.ceil(min);
  max = Math.floor(max);

  // Generate a random number between min (inclusive) and max (inclusive)
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default Listing;
