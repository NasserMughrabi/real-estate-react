import React, { useContext } from "react";
import { Box } from "@chakra-ui/react";
import { UserContext } from "../../context/userContext";
import Signout from "./Signout";
import User from "./User";

const UserStatus = () => {
  const [user] = useContext(UserContext);

  return (
    <>
      {user && (
        <Box>
          <User />
          <Signout />
        </Box>
      )}
    </>
  );
};

export default UserStatus;
