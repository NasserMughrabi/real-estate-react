import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const HomeBtn = () => {
  const navigate = useNavigate();

  return (
    <Box position={"absolute"} right={40} top={3}>
      <Button
        variant="outline"
        colorScheme="blue"
        onClick={() => navigate("/home")}
      >
        Home
      </Button>
    </Box>
  );
};

export default HomeBtn;
