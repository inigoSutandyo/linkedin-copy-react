import axios from 'axios'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/navbar/Navbar'
import PostComponent from '../components/post/PostComponent'
import { ApiURL } from '../utils/Server'

import "../styles/pages/search.scss"
import PostUser from '../components/post/PostUser'

type Props = {}

const Search = (props: Props) => {
  const {q} = useParams()
  const [users, setUsers] = useState<Array<User>>()  
  const [posts, setPosts] = useState<Array<Post>>()  

  const [showUser, setShowUser] = useState(true)
  const [showPost, setShowPost] = useState(true)

  useEffect(() => {
    axios.get(ApiURL("/search"), {
        params: {
            search: q
        }
    })
    .then((response) => {
        console.log(response.data)
        if (response.data.users) {
          setUsers([...response.data.users])
        }

        if (response.data.posts) {
          setPosts([...response.data.posts])
        }
    })
    .catch((error) => {
        console.log(error.response)
    })
  }, [])
  
  const searchContainer = {
    display: "flex",
    flexDirection: "column",
    margin: "5px",
  } as React.CSSProperties
  

  const filterSearch = () => {
    const filterUser = (document.getElementById("user") as HTMLInputElement).checked 
    const filterPost = (document.getElementById("post") as HTMLInputElement).checked 
    
    setShowUser(filterUser)
    setShowPost(filterPost)
  }

  return (
    <>
      <Navbar/>
      <div style={{
        display: "flex",
        flexDirection: "column",
        margin: "36px"
      }}>
          <div className='d-flex'>
            <div className='mx-3'>
              <input type="checkbox" name="filter" id="user"/>
              <label htmlFor="user">User</label>
            </div>
            <div className='mx-2'>
              <input type="checkbox" name="filter" id="post"/>
              <label htmlFor="post">Post</label>
            </div>
          </div>
          <div className='mx-2 my-1'>
            <input type="button" value="Filter" className='btn-primary' onClick={filterSearch}/>
          </div>
          {users && users.length !== 0 && showUser ? (
            <div style={searchContainer}>
              <h4>Users</h4>
              {users.map((u) => (
                  <div key={u.ID} style={{
                    backgroundColor: "white",
                    padding: "20px"
                  }}>
                    <PostUser user={u} imageSize="55px"/>
                  </div>
              ))}
            </div>
          ) : <></>}
          {posts && posts.length !== 0 && showPost ? (
            <div style={searchContainer}>
              <h4>Posts</h4>
              <div>
                {posts.map((p, i) =>(
                  <PostComponent post={p} key={p.ID} index={i} handleOpenModal={undefined} setMovieId={undefined}/>
                ))}
              </div>
            </div>
          ) : <></>}
        
      </div>
    </>
  )
}

export default Search