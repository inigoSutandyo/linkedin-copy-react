import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/navbar/Navbar'
import PostComponent from '../components/post/PostComponent'
import { ApiURL } from '../utils/Server'

import "../styles/pages/search.css"
import PostUser from '../components/post/PostUser'

type Props = {}

const Search = (props: Props) => {
  const {q} = useParams()
  const [users, setUsers] = useState<Array<User>>()  
  const [posts, setPosts] = useState<Array<Post>>()  
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
  return (
    <>
      <Navbar/>
      <div style={{
        display: "flex",
        flexDirection: "column",
        margin: "36px"
      }}>
          {users && users.length !== 0 ? (
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
          {posts && posts.length !== 0 ? (
            <div style={searchContainer}>
              <h4>Posts</h4>
              <div>
                {posts.map((p, i) =>(
                  <PostComponent post={p} key={p.ID} index={i}/>
                ))}
              </div>
            </div>
          ) : <></>}
        
      </div>
    </>
  )
}

export default Search