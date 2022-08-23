import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Modal from '../components/Modal'
import Navbar from '../components/navbar/Navbar'
import AddPost from '../components/post/AddPost'
import Profile from './user/Profile'
import '../styles/home/home.css'
import { ApiURL } from '../utils/Server'
import { setUser } from '../features/user/userSlice'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { useNavigate } from 'react-router-dom'
import PostComponent from '../components/post/PostComponent'

type Props = {}

const axiosConfig = {
  withCredentials: true,
}
const Home = (props: Props) => {

  const user = useAppSelector((state) => state.user.user)
  const dispatch = useAppDispatch() 
  const navigate = useNavigate()

  const [modal, setModal] = useState(false)
  const [posts, setPosts] = useState<Array<Post>>()
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

    const loadPosts = () => {
      axios.get(ApiURL("/home/post"), axiosConfig)
      .then(function (response) {
        console.log(response.data)
        setPosts(response.data.posts)
      })
      .catch(function (error) {
        console.log(error.response.data)        
      })
      .then(function () {
          // always executed
      });
    }
    loadUser()
    loadPosts()
    console.log(posts)
  }, [])
  
  

  return (
    <div >
      <Navbar/>
      <div className='my-3 home-layout'>
        {user ? (
          <>
            <div className='container-grow-1 home-container bg-white'>
                <Profile/>
                {/* {user.email} */}
            </div>

            <div className='container-grow-4 home-container '>  
              <div className='container-header bg-white'>
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
                {posts ? (
                  <>
                    {posts.map((p,i) => {
                      return (
                        <PostComponent post={p} key={i}/>
                      )
                    })}
                  </>
                ) : <>No Post</>}
              </div>
              <div className='overflow'>

              </div>
            </div>

            <div className='container-grow-3 home-container bg-white'>
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