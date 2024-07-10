import React, { useState, useContext } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Flex,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { createUser, getAllUsers } from "../../api/users";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

const Signin = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const { setUser } = useContext(UserContext);

  const handleSignin = async () => {
    if (username === "") {
      toast({
        title: "Attention",
        description: "Username cannot be empty!",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    if (username.includes(" ")) {
      toast({
        title: "Attention",
        description: "No space allowed in usernames",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    const userData = {
      username: username,
    };

    // if user exists, log them in, otherwise create new user
    try {
      const fetchedUsers = await getAllUsers();

      const userExists = fetchedUsers.find(
        (user) => user.username === username
      );
      if (userExists) {
        localStorage.setItem(
          "userToken",
          `${userExists.username} ${userExists.id}`
        );
        setUser(userExists);
        navigate("/home");
      } else {
        // create new user
        try {
          const newUser = await createUser(userData);
          localStorage.setItem(
            "userToken",
            newUser?.username + " " + newUser?.id
          );
          setUser(newUser);
          navigate("/home");
        } catch (error) {
          toast({
            title: "Attention",
            description: `${error}`,
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
          return;
        }
      }
    } catch (error) {
      toast({
        title: "Attention",
        description: `${error}`,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }
  };

  return (
    <Flex justifyContent="center" alignItems="center" height="100%">
      <Container
        justifyContent="center"
        alignItems="center"
        fontFamily={"Spline Sans Variable,-apple-system,system-ui,sans-serif"}
        maxW="lg"
        py={{ base: "12", md: "2" }}
        px={{ base: "0", sm: "8" }}
      >
        <Stack spacing="8">
          <Stack spacing="6">
            <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
              <Heading fontSize={{ base: "2xl", md: "3xl" }}>
                Enter username to add listing
              </Heading>
            </Stack>
          </Stack>
          <Box
            py={{ base: "0", sm: "12" }}
            px={{ base: "4", sm: "10" }}
            bg={{ base: "transparent", sm: "bg.surface" }}
            boxShadow={{ base: "none", sm: "md" }}
            borderRadius={{ base: "none", sm: "xl" }}
          >
            <Stack spacing="6">
              <Stack spacing="5">
                <FormControl>
                  <FormLabel htmlFor="email">Username</FormLabel>
                  <Input
                    id="email"
                    type="email"
                    _focus={{
                      border: "1px solid #319795",
                      zIndex: "1",
                      boxShadow: "rgb(49, 151, 149) 0px 0px 0px 1px",
                    }}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </FormControl>
              </Stack>
              {/* <HStack justify='space-between'>
                <Checkbox defaultChecked colorScheme='teal'>
                  Remember me
                </Checkbox>
                <Button paddingRight={0} color='teal' variant='text' size='sm' onClick={() => router.push("/forgotPassword")}>
                  Forgot password?
                </Button>
              </HStack> */}
              <Stack spacing="6">
                <Button colorScheme="blue" onClick={handleSignin}>
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Flex>
  );
};

export default Signin;
