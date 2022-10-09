import axios from 'axios'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/navbar/Navbar'
import PostComponent from '../components/post/PostComponent'
import { ApiURL } from '../utils/Server'

import "../styles/pages/search.scss"
import PostUser from '../components/post/PostUser'
import UserComponent from '../components/user/UserComponent'
import { useAppSelector } from '../app/hooks'
import InfiniteScroll from 'react-infinite-scroll-component'
import Footer from './Footer'

type Props = {}

const Search = (props: Props) => {
  const {q} = useParams()
  const user = useAppSelector((state) => state.user.user);
  const [users, setUsers] = useState<Array<User>>()  
  const [posts, setPosts] = useState<Array<Post>>()  
  const [userOffset, setUserOffset] = useState(0)
  const [postOffset, setPostOffset] = useState(0)
  const [showUser, setShowUser] = useState(true)
  const [showPost, setShowPost] = useState(true)

  const [hasMorePost, setHasMorePost] = useState(false)

  useEffect(() => {
    axios.get(ApiURL("/search/post"), {
        params: {
            search: q,
            offset: postOffset
        }
    })
    .then((response) => {
        console.log(response.data)

        if (response.data.posts) {
          setPosts([...response.data.posts])
        }
    })
    .catch((error) => {
        console.log(error.response)
    })

    axios.get(ApiURL("/search/user"), {
        params: {
            search: q,
            offset: userOffset,
        }
    })
    .then((response) => {
        console.log(response.data)
        if (response.data.users) {
          setUsers([...response.data.users])
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
    overflow: "auto",
    maxHeight:"640px",
  } as React.CSSProperties
  

  const filterSearch = () => {
    const filterUser = (document.getElementById("user") as HTMLInputElement).checked 
    const filterPost = (document.getElementById("post") as HTMLInputElement).checked 
    if (!filterUser && !filterPost) {
      setShowUser(true)
      setShowPost(true)
      return
    }
    setShowUser(filterUser)
    setShowPost(filterPost)


  }

  const addConnection = (id: number) => {
    axios.post(ApiURL("/user/invite"), {}, {
        params: {
            source: user.ID,
            destination: id
        }
    })
    .then((response) => {
        console.log(response.data)
    })
    .catch((error) => {
        console.log(error.response.data)
    })
  }

  const fetchMoreUser = () => {
    setUserOffset(userOffset + 5)
    axios.get(ApiURL("/search/user"), {
      params: {
        search: q,
        offset: userOffset
      }
    })
    .then((response) => {
        console.log(response.data)
        if (response.data.users) {
          users?.push(response.data.users)
        }
    })
    .catch((error) => {
        console.log(error.response)
    })
  }

  const fetchMorePost = () => {
    console.log("fetch post")
    axios.get(ApiURL("/search/post"), {
      params: {
        search: q,
        offset: postOffset+5
      }
    })
    .then((response) => {
        console.log(response.data)
        const length = response.data.posts.length
        if (response.data.posts && posts) {
          setPosts([...posts, ...response.data.posts])
        }
        setHasMorePost(response.data.hasmore)
        setPostOffset(postOffset + length)
    })
    .catch((error) => {
      console.log(error.response)
    })
  }

  return (
    <div className='main-page-layout'>
      <Navbar/>
      <div className='main-body' style={{
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
            <div style={searchContainer} id="userDiv">
              <h4>Users</h4>
              <InfiniteScroll
                dataLength={users.length}
                next={fetchMoreUser}
                hasMore={hasMorePost}
                loader={<h4>Loading...</h4>}
                scrollableTarget="userDiv"
              >
                {users.map((u) => (
                    <div key={u.ID} style={{
                      backgroundColor: "white",
                      padding: "5px",
                      width: "95%",
                      borderRadius: "12px",

                    }} className='d-flex flex-row justify-between my-3'>
                      <div style={{
                        padding: "20px"
                      }}>
                        <UserComponent user={u}/>
                      </div>
                      <button className='btn-primary-outline mx-1' style={{
                        borderRadius: "32px"
                      }} onClick={() => {addConnection(u.ID)}}>Connect</button>
                    </div>
                ))}
              </InfiniteScroll>
            </div>
          ) : <></>}
          {posts && posts.length !== 0 && showPost ? (
            <>
              <h4>Posts</h4>
              <div style={searchContainer} id="postDiv">
                <InfiniteScroll
                  dataLength={posts.length}
                  next={fetchMorePost}
                  hasMore={true}
                  loader={<h4>Loading...</h4>}
                  scrollableTarget="postDiv"
                >
                  {posts.map((p, i) =>(
                    <PostComponent post={p} key={p.ID} index={i} handleOpenModal={undefined} setMovieId={undefined}/>
                  ))}
                </InfiniteScroll>
              </div>
            </>
          ) : <></>}
        
      </div>
      <Footer/>
    </div>
  )
}

export default Search