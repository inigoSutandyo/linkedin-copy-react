import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../app/hooks'
import { connect, sendMsg } from '../../app/socket'
import { useUser } from '../../app/user'
import Chat from '../../components/message/Chat'
import Navbar from '../../components/navbar/Navbar'
import UserComponent from '../../components/user/UserComponent'
import UserSmallComponent from '../../components/user/UserSmallComponent'
import { ApiURL } from '../../utils/Server'
import Footer from '../Footer'

type Props = {}

const Message = (props: Props) => {
  // useEffect(() => {
  //   connect()
  // }, [])
  useUser()
  const user = useAppSelector((state) => state.user.user)
  const [selectedChat, setSelectedChat] = useState<Chats>()
  const [chats, setChats] = useState<Array<Chats>>()

  useEffect(() => {
    axios.get(ApiURL("/chats"), {
      withCredentials: true
    })
    .then((response) => {
      console.log(response.data.chats)
      setChats(response.data.chats)
    })
    .catch((error) => {
      console.log(error.response.data)
    })
  }, [])
  

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
  }

  return (
    <div className='main-page-layout'>
        <Navbar/>
        <div className='layout-secondary main-body'>
            <div className='layout-nav'>
              <ul>
                {chats?.map((c) => (
                  <li key={c.ID} onClick={() => changeChat(c)} className="pointer-cursor list-style-none border-bottom-light">
                    {c.users.map((u, i) => (
                      <div key={i}>
                        {u.ID != user.ID ? (
                          <div className='my-3'>
                            <UserSmallComponent user={u}/>
                          </div>
                        ) : (<></>)}
                      </div>
                    ))}
                  </li>
                ))}
              </ul>
            </div>
            <div className='layout-main my-2'>
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