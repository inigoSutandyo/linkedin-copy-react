import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Modal from '../components/Modal'
import Navbar from '../components/navbar/Navbar'
import AddPost from '../components/post/AddPost'
import Profile from './user/Profile'
import '../styles/home/home.css'
import { ApiURL } from '../utils/Server'
import {useDispatch, useSelector} from 'react-redux'
import { setUser } from '../features/user/userSlice'

type Props = {}

const axiosConfig = {
  withCredentials: true,
}
const Home = (props: Props) => {

  const user = useSelector((state: UserState) => state.user)
  const dispatch = useDispatch() 

  const [post ,setPost] = useState(null)
  const [modal, setModal] = useState(false)

  const closeModal = () => {
    setModal(false)
  }

  const sleep = async (delay: number) => {
    await new Promise(r => setTimeout(r, delay));
  }

  useEffect(() => {
    const loadData = () => {
      axios.get(ApiURL("/user/profile"), axiosConfig)
      .then(function (response) {
        const data = response.data.user as User
        console.log(data)
        dispatch(setUser(data))
        setPost(response.data.post)
        console.log(post)
        console.log(user)
      })
      .catch(function (error) {
        console.log(error.response.data);
      })
      .then(function (response) {
        
      });
    }
    console.log(user)
    loadData()
  }, [])
  
  return (
    <div >
      <Navbar/>
      <div className='my-3 home-layout'>
        {user ? (
          <>
            <div className='container-grow-1 home-container'>
                <Profile/>
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