import { VStack } from "@chakra-ui/react";
import ListingModal from "../components/listings/ListingModal";
import Listings from "../components/listings/Listings";

const Home = () => {
  return (
    <VStack py={4}>
      <ListingModal />
      <Listings />
    </VStack>
  );
};

export default Home;
