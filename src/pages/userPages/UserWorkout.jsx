import React from "react";
import UserNavbar from "../../components/userComponents/userCommon/UserNavbar";
import UserFooter from "../../components/userComponents/userCommon/UserFooter";
import UserSideWorkout from "../../components/userComponents/userWorkout/UserSideWorkout";

function UserWorkout() {
  return (
    <>
      <UserNavbar />
      <UserSideWorkout />
      {/* <UserFooter/> */}
    </>
  );
}

export default UserWorkout;
