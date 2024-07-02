import React from "react";
import { Box, Avatar, HStack, Flex } from "@chakra-ui/react";

const ProfileHeader = ({ profileUser }) => {
  return (
    <Flex justify="center" pt={10} >
      <HStack py={2} alignItems={"center"}>
        <Avatar size={"xl"} name={profileUser?.username} />
        <Box fontWeight={"bold"}>{profileUser?.username}</Box>
      </HStack>
    </Flex>
  );
};

export default ProfileHeader;
