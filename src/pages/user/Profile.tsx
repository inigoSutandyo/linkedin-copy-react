import React, { useState, useEffect } from 'react'
import Modal from '../../components/ModalComponent'
import { setUser } from '../../features/user/userSlice'
import ProfileForm from '../../components/user/ProfileForm'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import Navbar from '../../components/navbar/Navbar'
import axios from 'axios'
import { ApiURL } from '../../utils/Server'
import '../../styles/pages/profile.css'
import { MdModeEditOutline } from 'react-icons/md'
import { IconContext } from 'react-icons'

interface Props {
}

const Profile = (props: Props) => {
  const [modal, setModal] = useState(false)

  const user = useAppSelector((state) => state.user.user)
  const dispatch = useAppDispatch() 

  const closeModal = () => {
    setModal(false)
  }

  useEffect(() => {
    const loadUser = () => {
      const axiosConfig = {
          withCredentials: true,
      }

      axios.get(ApiURL("/user/profile"), axiosConfig)
      .then(function (response) {
          console.log(response.data.user)
          dispatch(setUser(response.data.user))
      })
      .catch(function (error) {
        console.log(error.response.data)        
      })
      .then(function () {
          // always executed
      });
    }

    loadUser()

  }, [])

  return (
    <>
      <Navbar/>
      <div className='profile-layout'>
        <div className='main-container'>
          <div className='main-content'>
            <div className='edit-profile'>
              <IconContext.Provider value={{
                size: "24px"
              }}>
                <MdModeEditOutline style={{cursor: "pointer"}}/>
              </IconContext.Provider>
              {/* <button onClick={() => setModal(true)} className="btn-primary w-8">Update Profile</button> */}
            </div>
    
            {/* <Modal open={modal} title={"Update Profile"} closeModal={closeModal} child ={
              <ProfileForm/>
            }/> */}
            <div className='user-info'>
              <h1>{user.firstname} {user.lastname}</h1>
              <h3>{user.headline}</h3>
              <p>{user.email}</p>
            </div>
          </div>
        </div>
        <div className='secondary-container profile-section'>
          Hello
        </div>
      </div>
    </>
  ) 
}

export default Profile