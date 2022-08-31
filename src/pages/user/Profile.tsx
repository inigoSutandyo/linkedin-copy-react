import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setUser } from "../../features/user/userSlice";
import { ApiURL } from "../../utils/Server";
import MyProfile from "./MyProfile";
import OtherProfile from "./OtherProfile";
import placeholderProfile from "../../assets/placeholders/user.png";
interface Props {}

const Profile = (props: Props) => {
  const [myProfile, setMyProfile] = useState(false)
  const {id} = useParams()
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  
  const loadUser = () => {
    const axiosConfig = {
      withCredentials: true,
    };

    axios.get(ApiURL("/user/profile"), axiosConfig)
    .then(function (response) {
      const user = response.data.user as User;
      if (user.imageurl == "" || !user.imageurl) {
        user.imageurl = placeholderProfile;
      }
      dispatch(setUser(user));
    })
    .catch(function (error) {
      console.log(error.response);
    })
  };
  
  useEffect(() => {
    loadUser();
  }, [])

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
    </>
  );
};

export default Profile;
