import React, { useState, useEffect } from "react";
import { setUser } from "../../features/user/userSlice";
import ProfileForm from "../../components/user/ProfileForm";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import { ApiURL } from "../../utils/Server";
import { MdModeEditOutline } from "react-icons/md";
import { IconContext } from "react-icons";
import ModalComponent from "../../components/ModalComponent";
import placeholderBanner from "../../assets/placeholders/banner.jpg";
import ProfilePictureUpload from "../../components/user/ProfilePictureUpload";
import "../../styles/pages/profile.scss";
type Props = {};

const MyProfile = (props: Props) => {
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState("");

  const user = useAppSelector((state) => state.user.user);
  

  const closeModal = () => {
    setModal(false);
  };

  const handleOpenModal = (label: string) => {
    setModal(true);
    setTitle(label);
  };
  

  return (
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
              style={{ backgroundImage: `url(${user.imageurl})` }}
              onClick={() => handleOpenModal("Profile Picture")}
            ></div>
            <div
              className="edit-profile"
              onClick={() => handleOpenModal("Update Profile")}
            >
              <IconContext.Provider
                value={{
                  size: "24px",
                }}
              >
                <MdModeEditOutline style={{ cursor: "pointer" }} />
              </IconContext.Provider>
              {/* <button onClick={() => setModal(true)} className="btn-primary w-8">Update Profile</button> */}
            </div>
            <div className="p-4">
              <div className="user-info">
                <h1>
                  {user.firstname} {user.lastname}
                </h1>
                <h3>{user.headline}</h3>
                <p>{user.email}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="secondary-container profile-section">Hello</div>
      </div>
      <ModalComponent
        isOpen={modal}
        appElement={"#profile-page"}
        closeModal={closeModal}
        contentLabel={title}
      >
        {title == "Update Profile" ? (
          <ProfileForm />
        ) : title == "Profile Picture" ? (
          <ProfilePictureUpload />
        ) : (
          <></>
        )}
      </ModalComponent>
    </div>
  );
};
export default MyProfile;
