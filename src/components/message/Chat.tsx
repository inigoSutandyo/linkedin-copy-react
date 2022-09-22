import axios from 'axios'
import { error } from 'console'
import React, { useState, useEffect, SyntheticEvent } from 'react'
import { IconContext } from 'react-icons'
import { FiSend } from 'react-icons/fi'
import { useAppSelector } from '../../app/hooks'
import { ApiURL } from '../../utils/Server'
import MyMessage from './MyMessage'
import OtherMessage from './OtherMessage'

import '../../styles/components/chat.scss'
import { connect, sendMsg, useSocket } from '../../app/socket'

type Props = {
    chat: Chats
}

const Chat = (props: Props) => {
  const user = useAppSelector((state) => state.user.user)
  const [messages, setMessages] = useState<Array<Message>>()
  const [other, setOther] = useState<User>()
  
  const socket = useSocket(props.chat.ID)

  useEffect(() => {
    props.chat.users.forEach(u => {
        if (u.ID != user.ID) {
            setOther(u)
        }
    });
  }, [props])
  

  useEffect(() => {
    axios.get(ApiURL("/message"), {
        params: {
            id: props.chat.ID
        }
    })
    .then((response) => {
        console.log(response.data.messages)
        setMessages(response.data.messages)
    })
    .catch((error) => {
        console.log(error.response)
    })
  }, [props.chat])

  useEffect(() => {
    if (socket) {
        connect(socket)
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
    axios.post(ApiURL("/message/add"), {
        content: target.value,
        chatid: props.chat.ID,
    }, {
        withCredentials: true
    })
    .then((response) => {
        console.log(response.data)
    })
    .catch((error) => {
        console.log(error.response)
    })

    target.value = ""
  }

  return (
    <>  
        <h3>{other?.firstname}</h3>
        <div style={{
            minHeight:"378px"
        }} className="bg-primary">
            {messages ? (
                <>
                    {messages.map((m) => (
                        <div key={m.ID} className="d-flex flex-column">
                            {m.user.ID == user.ID ? (
                                <MyMessage message={m}/>
                            ) : (
                                <OtherMessage message={m}/>
                            )}
                        </div>
                    ))}
                </>
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