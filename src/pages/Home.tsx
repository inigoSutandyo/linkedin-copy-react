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
import { RootState } from '../app/store'
import { useAppDispatch, useAppSelector } from '../app/hooks'

type Props = {}

const axiosConfig = {
  withCredentials: true,
}
const Home = (props: Props) => {

  const user = useAppSelector((state) => state.user.user)
  const dispatch = useAppDispatch() 


  const [post ,setPost] = useState()
  const [modal, setModal] = useState(false)

  const closeModal = () => {
    setModal(false)
  }

  useEffect(() => {
    const loadData = () => {
      axios.get(ApiURL("/user/profile"), axiosConfig)
      .then(function (response) {

        // dispatch(setUser(data))
        setPost(response.data.posts)
        console.log(response.data)
        dispatch(setUser(response.data.user))
        // console.log(user)
      })
      .catch(function (error) {
        console.log(error.response.data);
      })
      .then(function (response) {
        
      });
    }
    // console.log(user)
    loadData()
  }, [])
  

  useEffect(() => {
    console.log(post)
  }, [post])
  

  return (
    <div >
      <Navbar/>
      <div className='my-3 home-layout'>
        {user.email ? (
          <>
            <div className='container-grow-1 home-container'>
                {/* <Profile/> */}
                {user.email}
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
                    Post
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