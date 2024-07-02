import React, { useEffect, useState } from "react";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileListings from "../components/profile/ProfileListings";
import { useParams } from "react-router-dom";
import { getUserById } from "../api/users";
import { Box } from "@chakra-ui/react";
import HomeBtn from "../components/common/HomeBtn";

const Profile = () => {
  const { id } = useParams();
  const [profileUser, setProfileUser] = useState();

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await getUserById(id);
        setProfileUser(user);
      } catch (error) {
        console.log("error getting user by id: ", id);
      }
    };
    getUser();
  }, []);

  return (
    <Box>
      <HomeBtn />
      <ProfileHeader profileUser={profileUser} />
      <ProfileListings profileUser={profileUser} />
    </Box>
  );
};

export default Profile;
