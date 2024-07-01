import React from "react";
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
} from "@chakra-ui/react";
import { AiOutlineUser } from "react-icons/ai";

const Listing = ({ listing }) => {
  return (
    <Card maxW="sm" m={4}>
      <CardBody>
        <HStack py={2} alignItems={"center"}>
          <Avatar size={"sm"} name={listing.user.username} />
          <Box fontWeight={"bold"}>{listing.user.username}</Box>
        </HStack>
        <Image
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{listing.address}</Heading>
          <Text>{listing.description}</Text>
          <Flex justifyContent={"space-between"}>
            <Text color="blue.600" fontSize="2xl">
              ${listing.price}
            </Text>
            <Button variant="solid" colorScheme="blue">
              Details
            </Button>
          </Flex>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default Listing;
