import React, { useState } from 'react'
import Modal from '../../components/Modal'


import ProfileForm from '../../components/user/ProfileForm'
type User = {
  firstname: string
  lastname: string
  email: string
  phone: string
}

interface Props {
  user: User
}

const Profile = (props: Props) => {
  const [modal, setModal] = useState(false)
  const closeModal = () => {
    setModal(false)
  }
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  }

  return (
    <div id='profile-page'>
      <button onClick={() => setModal(true)}>Update Profile</button>
      <Modal open={modal} title={"Update Profile"} closeModal={closeModal} child ={
        <ProfileForm user={props.user}/>
      }/>
    </div>
  ) 
}

export default Profile