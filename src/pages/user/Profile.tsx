import React, { useState } from 'react'
import Modal from '../../components/Modal'


import ProfileForm from '../../components/user/ProfileForm'
type User = {
  ID: number
  firstname: string
  lastname: string
  email: string
  phone: string
}

interface Props {
  user: User
  setUser: any
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
      <button onClick={() => setModal(true)} className="btn-primary w-32-px">Update Profile</button>
      <Modal open={modal} title={"Update Profile"} closeModal={closeModal} child ={
        <ProfileForm user={props.user} setUser={props.setUser}/>
      }/>
      <p>
        {props.user.ID}
      </p>
      <p>
        {props.user.firstname}
      </p>
      <p>
        {props.user.lastname}
      </p>
      <p>
        {props.user.phone}
      </p>
    </div>
  ) 
}

export default Profile