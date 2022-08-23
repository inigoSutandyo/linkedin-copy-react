import React, { useState } from 'react'
import Modal from '../../components/Modal'
import { useSelector, useDispatch } from 'react-redux' 
import { setUser } from '../../features/user/userSlice'
import ProfileForm from '../../components/user/ProfileForm'
import { useAppSelector } from '../../app/hooks'

interface Props {
}

const Profile = (props: Props) => {
  const [modal, setModal] = useState(false)

  const user = useAppSelector((state) => state.user.user)


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
    <div id='profile-layout'>
      <button onClick={() => setModal(true)} className="btn-primary w-8">Update Profile</button>
      <Modal open={modal} title={"Update Profile"} closeModal={closeModal} child ={
        <ProfileForm/>
      }/>
      <p>
        {user.email}
      </p>
      <p>
        {user.firstname} {user.lastname}
      </p>
      <p style={{
        fontWeight: "lighter"
      }}>
        {user.headline}
      </p>
    </div>
  ) 
}

export default Profile