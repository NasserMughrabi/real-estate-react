import { VStack } from "@chakra-ui/react";
import ListingModal from "../components/listings/ListingModal";
import Listings from "../components/listings/Listings";
import EC2 from "../components/common/EC2";

const Home = () => {
  
  return (
    <VStack py={4}>
      {/* <EC2 /> */}
      <ListingModal />
      <Listings />
    </VStack>
  );
};

export default Home;
