import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Modal from '../components/Modal'
import Navbar from '../components/navbar/Navbar'
import AddPost from '../components/post/AddPost'
import Profile from './user/Profile'
import '../styles/home/home.css'
import { ApiURL } from '../utils/Server'

type Props = {}

const axiosConfig = {
  withCredentials: true,
}
const Home = (props: Props) => {
  const [user, setUser] = useState(null)
  const [post ,setPost] = useState(null)
  const [modal, setModal] = useState(false)

  const closeModal = () => {
    setModal(false)
  }

  useEffect(() => {
    const loadData = async () => {
      axios.get(ApiURL("/user/profile"), axiosConfig)
      .then(function (response) {
        setUser(response.data.user)
        setPost(response.data.post)
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
    
    loadData()
  }, [])
  
  return (
    <div >
      <Navbar/>
      <div className='my-3 home-layout'>
        {user ? (
          <>
            <div className='container-grow-1 home-container'>
                <Profile user={user} setUser={setUser}/>
            </div>

            <div className='container-grow-4 home-container'>  
              <div className='container-header'>
                <button className='btn-primary-outline' style={{
                  marginTop: "10px",
                  borderRadius: "8px"
                }} onClick = {() => {
                  setModal(true)
                }}>
                  Add Post
                </button>
              </div>

              <div className='main-content'>
                {post ? (
                  <>
                    
                  </>
                ) : <>No Post</>}
              </div>
            </div>

            <div className='container-grow-3 home-container'>
              <p>Hei</p>
            </div>

            <Modal child={<AddPost user={user}/>} open={modal} closeModal={closeModal} title={"Add Post"} />
          </>
        ) : (
          <p>Empty</p>
        )}
      </div>
    </div>
  )
}

export default Home