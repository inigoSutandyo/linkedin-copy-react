import React, { useState } from 'react'
import Modal from '../../components/Modal'
import { useSelector, useDispatch } from 'react-redux' 
import { setUser } from '../../features/user/userSlice'
import ProfileForm from '../../components/user/ProfileForm'

interface Props {
}

const Profile = (props: Props) => {
  const [modal, setModal] = useState(false)

  const isSignedIn = useSelector((state: UserState) => state.isSignedIn)
  const user = useSelector((state: UserState) => state.user)

  const dispatch = useDispatch() 

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
      <button onClick={() => setModal(true)} className="btn-primary w-8">Update Profile</button>
      <Modal open={modal} title={"Update Profile"} closeModal={closeModal} child ={
        <ProfileForm/>
      }/>
      <p>
        {user.ID}
      </p>
      <p>
        {user.firstname}
      </p>
      <p>
        {user.lastname}
      </p>
      <p>
        {user.phone}
      </p>
    </div>
  ) 
}

export default Profile