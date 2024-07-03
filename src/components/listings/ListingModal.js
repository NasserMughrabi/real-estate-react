import React, { useContext } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  FormControl,
  ModalBody,
  FormLabel,
  ModalFooter,
  Input,
  Flex,
  Textarea,
  Box,
  IconButton,
  Tooltip,
  VStack,
  Image,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { FaPlusSquare } from "react-icons/fa";
import { createListingForUser } from "../../api/users";
import { ListingContext } from "../../context/listingContext";
import { getAllListings } from "../../api/listings";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

const ListingModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [allListings, setAllListings] = useContext(ListingContext);
  const [user] = useContext(UserContext);
  const navigate = useNavigate();

  //   const initialRef = useRef(null);
  //   const finalRef = useRef(null);

  const [selectedFiles, setSelectedFiles] = useState([]);
  // const { user, setUser } = useContext(UserContext);
  const [listingData, setListingData] = useState({});
  // const [posts, setPosts] = useContext(PostsContext);

  const handleFileChange = (event) => {
    const files = event.target.files;
    // setListingData({...listingData, demo_image: files[0], pictureURL: files[0].filename});
    setListingData({ ...listingData, demo_image: files });
    setSelectedFiles([...selectedFiles, ...files]);
    const urls = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = (event) => {
        urls.push(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveFile = (fileIndex) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(fileIndex, 1);
    setSelectedFiles(updatedFiles);
  };

  const handlePostClick = async () => {
    if (listingData == null) {
      return;
    }

    try {
      await createListingForUser(user.id, listingData);
      const updatedListings = await getAllListings();
      setAllListings(updatedListings);
      onClose();
      setListingData({});
      setSelectedFiles([]);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  const handleAddListingBtn = () => {
    if (user?.id) {
      onOpen();
    } else {
      navigate("/login");
    }
  };

  return (
    <Flex>
      <Box>
        <Button
          onClick={handleAddListingBtn}
          leftIcon={<FaPlusSquare />}
          colorScheme="blue"
        >
          Add Listing
        </Button>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} size={"2xl"}>
        <ModalOverlay
          bg="none"
          backdropFilter="auto"
          backdropInvert="20%"
          backdropBlur="1px"
        />
        <ModalContent>
          <ModalHeader alignSelf={"center"}>Create Listing</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={2}>
            <ListingForm
              listingData={listingData}
              setListingData={setListingData}
            />
          </ModalBody>

          <ModalFooter>
            <VStack align={"flex-end"}>
              <Flex align={"center"}>
                <Tooltip label="Upload image(s)" placement="top">
                  <Box mr={2}>
                    <label htmlFor="upload-photo">
                      <Image
                        src="https://static.xx.fbcdn.net/rsrc.php/v3/y7/r/Ivw7nhRtXyo.png"
                        alt="Upload Image"
                        cursor="pointer"
                        boxSize={6}
                      />
                    </label>
                    <Box display="none">
                      <Input
                        type="file"
                        accept="image/*"
                        id="upload-photo"
                        multiple
                        onChange={handleFileChange} // Handle file input change
                      />
                    </Box>
                  </Box>
                </Tooltip>
                <Button colorScheme={"blue"} onClick={handlePostClick}>
                  Post
                </Button>
              </Flex>

              <Flex flexWrap={"wrap"}>
                {selectedFiles.map((file, index) => (
                  <Flex key={index} alignItems="center">
                    <Box>{file.name}</Box>
                    <IconButton
                      bg={"white"}
                      ml={2}
                      aria-label="Remove file"
                      icon={<IoTrashOutline color={"red"} />}
                      onClick={() => handleRemoveFile(index)}
                    />
                  </Flex>
                ))}
              </Flex>
            </VStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

const ListingForm = ({ listingData, setListingData }) => {
  return (
    <Box mt={3}>
      <Flex mt={3}>
        <FormControl>
          <FormLabel>Price</FormLabel>
          <Flex verticalAlign={"center"}>
            <Input
              placeholder="$"
              value={listingData?.price}
              onChange={(e) =>
                setListingData({
                  ...listingData,
                  price: e.target.value,
                })
              }
            />
          </Flex>
        </FormControl>
      </Flex>

      <Flex mt={2}>
        <FormControl mr={2}>
          <FormLabel>Address</FormLabel>
          <Input
            placeholder="Title"
            value={listingData?.address}
            onChange={(e) =>
              setListingData({ ...listingData, address: e.target.value })
            }
          />
        </FormControl>
      </Flex>

      <Flex mt={2}>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea
            placeholder="Description"
            size="md"
            resize={"none"}
            minHeight={"110px"}
            value={listingData?.description}
            onChange={(e) =>
              setListingData({ ...listingData, description: e.target.value })
            }
          />
        </FormControl>
      </Flex>
    </Box>
  );
};

export default ListingModal;
