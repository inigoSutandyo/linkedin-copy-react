import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import MyProfile from "./MyProfile";
import OtherProfile from "./OtherProfile";
import { useUser } from "../../app/user";
import Footer from "../Footer";
interface Props {}

const Profile = (props: Props) => {
  const [myProfile, setMyProfile] = useState(false)
  const {id} = useParams()
  const user = useAppSelector((state) => state.user.user);
  
  useUser()

  useEffect(() => {
    if (id && parseInt(id) == user.ID) {
      setMyProfile(true)
    } else {
      setMyProfile(false)
    }
  }, [user])
  

  return (
    <>
      {myProfile ? (
        <MyProfile/>
      ) : id ? (
        <OtherProfile id={id} />
      ) : (
        <div>
          User Not Found 
        </div>
      )}
      <Footer/>
    </>
  );
};

export default Profile;
