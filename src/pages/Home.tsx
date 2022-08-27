import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Modal from '../components/ModalComponent'
import Navbar from '../components/navbar/Navbar'
import AddPost from '../components/post/AddPost'
import '../styles/pages/home.css'
import { ApiURL } from '../utils/Server'
import { setLikedPost, setUser } from '../features/user/userSlice'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { useNavigate } from 'react-router-dom'
import PostComponent from '../components/post/PostComponent'
import ProfileDisplay from '../components/user/ProfileDisplay'
import ModalComponent from '../components/ModalComponent'
import { setPosts } from '../features/post/postSlice'
import { checkAuth } from '../utils/Auth'
import { Cookies } from 'react-cookie'

type Props = {}

const axiosConfig = {
  withCredentials: true,
}
const Home = (props: Props) => {

  const navigate = useNavigate()
  const user = useAppSelector((state) => state.user.user)
  const posts = useAppSelector((state) => state.post)
  const dispatch = useAppDispatch() 
 
  const [modal, setModal] = useState(false)
  const closeModal = () => {
    setModal(false)
  }

  useEffect(() => {
    const cookie = new Cookies()

    if (!cookie.get("auth")) {
      navigate("/auth/login")
    }
    const loadUser = () => {
      const axiosConfig = {
        withCredentials: true,
      }

      axios.get(ApiURL("/user/profile"), axiosConfig)
      .then(function (response) {
          console.log(response.data)
          dispatch(setUser(response.data.user))
          const posts = response.data.likedposts as Array<Number>

          console.log(posts)
          dispatch(setLikedPost(posts))
      })
      .catch(function (error) {
        navigate('/auth/login')
        console.log(error)        
      }).then(() => {})
    }

    const loadPosts = () => {
      axios.get(ApiURL("/home/post"), axiosConfig)
      .then(function (response) {
        console.log(response.data)
        dispatch(setPosts(response.data.posts))
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
    <div id='home-page'>
      <Navbar/>
      <div className='my-3 home-layout'>
        {user ? (
          <>
            <div className='container-grow-1 home-container bg-white' style={{
              maxHeight: "256px",
              position: "sticky"
            }}>
                <ProfileDisplay/>
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
              <div className='home-main-content'>
                {posts ? (
                  <>
                    {posts.map((p,i) => {
                      return (
                        <PostComponent post={p} key={i} index={i}/>
                      )
                    })}
                  </>
                ) : <>No Post</>}
              </div>
            </div>

            <div className='container-grow-3 home-container bg-white'>
              <p>Hei</p>
            </div>
            
            <ModalComponent isOpen={modal} closeModal={closeModal} contentLabel={"Add Post"} appElement={"#home-page"}>
              <AddPost user={user}/>
            </ModalComponent>
          </>
        ) : (
          <p>Empty</p>
        )}
      </div>
    </div>
  )
}

export default Home