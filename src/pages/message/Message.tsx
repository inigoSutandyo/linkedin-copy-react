import axios from 'axios'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { useAppSelector } from '../../app/hooks'
import { useUser } from '../../app/user'
import Chat from '../../components/message/Chat'
import Navbar from '../../components/navbar/Navbar'
import UserSmallComponent from '../../components/user/UserSmallComponent'
import { ApiURL } from '../../utils/Server'
import Footer from '../Footer'

import '../../styles/forms/form.scss'
import '../../styles/components/search.scss'

type Props = {}

const Message = (props: Props) => {
  // useEffect(() => {
  //   connect()
  // }, [])
  useUser()
  const user = useAppSelector((state) => state.user.user)
  const [selectedChat, setSelectedChat] = useState<Chats>()
  const [chats, setChats] = useState<Array<Chats>>()
  const [fixed, setFixed] = useState<Array<Chats>>()
  const [search, setSearch] = useState("")

  useEffect(() => {
    axios.get(ApiURL("/chats"), {
      withCredentials: true
    })
    .then((response) => {
      console.log(response.data.chats)
      setChats(response.data.chats)
      setFixed(response.data.chats)
    })
    .catch((error) => {
      console.log(error.response.data)
    })
  }, [])
  
  const hasUser = (users: Array<User>, search: string) => {
    for (let i = 0; i < users.length; i++) {
      const u = users[i];
      if (u.ID == user.ID ) {
        continue;
      }
      if (u.firstname.startsWith(search)) {
        console.log(u)
        return true
      }
    }
    return false
  }

  useEffect(() => {
    if (search == "") {
      setChats(fixed)
      return
    }
    if (fixed != undefined) {
      const c = fixed.filter((chat) => {
        return hasUser(chat.users, search) == true
      })

      setChats(c)
    }
  }, [search])
  

  const create = () => {
    axios.post(ApiURL("/chats/create"), {}, {
      withCredentials: true,
      params: {
        id: 3
      }
    })
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error.response)
    })
  }
  
  const changeChat = (c: Chats) => {
    setSelectedChat(c)
    console.log(selectedChat)
  }

  return (
    <div className='main-page-layout'>
        <Navbar/>
        <div className='layout-secondary main-body'>
            <div className='layout-nav'>
              <div className='d-flex my-1 px-4'>
                {/* <span className='mx-2'>Search</span> */}
                <input type="text" className='search-field' name="search" id="search" placeholder='Search Name' onChange={(e: SyntheticEvent) => {
                  const target = e.target as HTMLInputElement
                  setSearch(target.value.trim())
                }}/>
              </div>
              <ul>
                {chats?.map((c) => (
                  <li key={c.ID} onClick={() => changeChat(c)} className="pointer-cursor list-style-none border-bottom-light">
                    {c.users.map((u, i) => (
                      <div key={i}>
                        {u.ID != user.ID ? (
                          <div className='my-1'>
                            <UserSmallComponent user={u}/>
                          </div>
                        ) : (<></>)}
                      </div>
                    ))}
                  </li>
                ))}
              </ul>
            </div>
            <div className='layout-main'>
              {/* <button onClick={create}>Create</button> */}
              {selectedChat ? (
                <Chat chat={selectedChat}/>
              ) : (
                <p>Select A chat</p>
              )}
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Message