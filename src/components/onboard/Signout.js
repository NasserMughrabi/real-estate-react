import React, { useContext } from "react";
import { Button, Box } from "@chakra-ui/react";
import { UserContext } from "../../context/userContext";

const Signout = () => {
  const [user, setUser] = useContext(UserContext);

  const handleSignout = () => {
    setUser("");
    localStorage.removeItem("userToken");
  };

  return (
    <Box position={"absolute"} right={10} top={3}>
      <Button variant="outline" colorScheme="blue" onClick={handleSignout}>
        Sign out
      </Button>
    </Box>
  );
};

export default Signout;
