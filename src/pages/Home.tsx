import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Modal from '../components/Modal'
import Navbar from '../components/navbar/Navbar'
import AddPost from '../components/post/AddPost'

import Profile from './user/Profile'

type Props = {}

const axiosConfig = {
  withCredentials: true,
}
const Home = (props: Props) => {
  const [user, setUser] = useState(null)
  const [modal, setModal] = useState(false)

  const closeModal = () => {
    setModal(false)
  }

  useEffect(() => {

    const loadUser = async () => {
      axios.get('http://localhost:8080/api/user/profile', axiosConfig)
      .then(function (response) {
        setUser(response.data.user)
        console.log(response.data)
      })
      .catch(function (error) {
        // handle error
        console.log(error.response.data);
      })
      .then(function () {
        // always executed
      });
    }
    loadUser()
    // checkAuth()
  }, [])
  
  return (
    <>
      <Navbar/>
      <div className='m-3'>
        {user ? (
          <div>
            <Profile user={user} setUser={setUser}/>
            <button className='btn-primary-outline' style={{
              marginTop: "10px",
              borderRadius: "8px"
            }} onClick = {() => {
              setModal(true)
            }}>Add Post</button>

            <Modal child={<AddPost user={user}/>} open={modal} closeModal={closeModal} title={"Add Post"} />
          
          </div>
        ) : (
          <p>Empty</p>
        )}
      </div>
    </>
  )
}

export default Home