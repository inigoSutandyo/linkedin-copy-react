import React, { useEffect, useState } from 'react'
import { IconContext } from 'react-icons';
import { MdModeEditOutline } from 'react-icons/md';
import Navbar from '../../components/navbar/Navbar';
import placeholderProfile from "../../assets/placeholders/user.png";
import placeholderBanner from "../../assets/placeholders/banner.jpg";
import "../../styles/pages/profile.css";
import axios from 'axios';
import { ApiURL } from '../../utils/Server';
import { useNavigate } from 'react-router-dom';
import ProfileNotFound from './ProfileNotFound';

interface Props {
    id: string
}

const OtherProfile = (props: Props) => {
    const [user, setUser] = useState<User>()
    const [imageUrl, setImageUrl] = useState(placeholderProfile)
    useEffect(() => {
      axios.get(ApiURL("/user/otherprofile"), {
        params: {
            id: props.id
        }
      })
      .then((response) => {
        setUser(response.data.user)
        console.log(response.data.user)
      })
      .catch((error) => {
        console.log(error)
      })
    }, [])
    
    useEffect(() => {
        if (!user)return
        if ( user.imageurl == "" || !user.imageurl || user.imageid == "") {
            user.imageurl = placeholderProfile;
            setImageUrl(placeholderProfile)
        } else {
            setImageUrl(user.imageurl)
        }
    }, [user])
    
    
    return (
        <>
          {user?.ID == 0 ? (
            <ProfileNotFound/>
          ) : (
            <div id="profile-page">
              <Navbar />
              <div className="profile-layout">
                <div className="main-container">
                  <div className="main-content">
                    <div
                      className="user-banner"
                      style={{ backgroundImage: `url(${placeholderBanner})` }}
                    ></div>
                    <div
                      className="user-img"
                      style={{ backgroundImage: `url(${imageUrl})` }}
                    ></div>
                    <div className="p-4">
                      <div className="user-info">
                        <h1>
                          {user?.firstname} {user?.lastname}
                        </h1>
                        <h3>{user?.headline}</h3>
                        <p>{user?.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="secondary-container profile-section">Hello</div>
              </div>
            </div>
          )}
        </>
      );
}

export default OtherProfile