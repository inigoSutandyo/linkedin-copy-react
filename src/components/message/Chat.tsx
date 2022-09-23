import axios from 'axios'
import { error } from 'console'
import React, { useState, useEffect, useRef } from 'react'
import { IconContext } from 'react-icons'
import { FiSend } from 'react-icons/fi'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { ApiURL } from '../../utils/Server'
import MyMessage from './MyMessage'
import OtherMessage from './OtherMessage'

import '../../styles/components/chat.scss'
import { connect, sendMsg, useSocket } from '../../app/socket'
import { appendMessage, setMessages } from '../../features/message/messageSlice'

type Props = {
    chat: Chats
}

const Chat = (props: Props) => {
  const user = useAppSelector((state) => state.user.user)
  const messages = useAppSelector((state) => state.message)
  const dispatch = useAppDispatch() 
  const messagesEndRef = useRef<null | HTMLDivElement>(null)
  const [other, setOther] = useState<User>()
  
  const socket = useSocket(props.chat.ID, user.ID)

  useEffect(() => {
    props.chat.users.forEach(u => {
        if (u.ID != user.ID) {
            setOther(u)
        }
    });
  }, [props])
  

  const handleSocket = () => {
    if (!socket) return
    socket.onmessage = (message) => {
        dispatch(appendMessage(JSON.parse(message.data)))
    }
  }

  useEffect(() => {
    axios.get(ApiURL("/message"), {
        params: {
            id: props.chat.ID
        }
    })
    .then((response) => {
        // console.log(response.data.messages)
        dispatch(setMessages(response.data.messages))
    })
    .catch((error) => {
        console.log(error.response)
    })
  }, [props.chat])

  useEffect(() => {
    if (socket) {
        // connect(socket)
        handleSocket()
    }

  }, [socket])
  
  

  const send = () => {
    const target = (document.getElementById("chat") as HTMLInputElement)

    if (!target.value || target.value.trim() == "") {
        return
    }
    console.log(target.value)
    if (socket) {
        sendMsg(target.value, socket)
        
    }

    target.value = ""
  }
  const scrollToBottom = () => {
    if (!messagesEndRef.current) return
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    // console.log(messages)
    scrollToBottom()
  }, [messages])
  

  return (
    <>  
        <h3>{other?.firstname}</h3>
        <div style={{
            height: "480px",
            overflow: "auto"
        }} className="bg-primary py-2">
            {messages ? (
                <div className="d-flex flex-column">
                    {messages.map((m, i) => (
                        m.user.ID == user.ID ? (
                            <MyMessage message={m} key={i}/>
                        ) : (
                            <OtherMessage message={m} key={i}/>
                        )
                    ))}
                    <div ref={messagesEndRef}></div>
                </div>
            ) : <></>}
        </div>
        <div className='w-10 d-flex'>
            <input type="text" name="chat" id="chat" className='form-input-secondary w-10' placeholder='Input message...'/>
            <button className='btn-primary-outline' onClick={send}>
                <IconContext.Provider value={{
                    size: "25px"
                }}>
                    <FiSend/>
                </IconContext.Provider>
            </button>
        </div>
    </>
  )
}

export default Chat