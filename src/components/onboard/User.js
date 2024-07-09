import React, { useContext } from "react";
import { Box, Avatar, HStack, Link } from "@chakra-ui/react";
import { UserContext } from "../../context/userContext";

const User = () => {
  const {user} = useContext(UserContext);

  return (
    <Box position={"absolute"} left={10} top={3}>
      <Link href={`${process.env.REACT_APP_API_URL}:3000/users/${user?.id}`}>
        <HStack py={2} alignItems={"center"}>
          <Avatar size={"sm"} name={user?.username} />
          <Box fontWeight={"bold"}>{user?.username}</Box>
        </HStack>
      </Link>
    </Box>
  );
};

export default User;
