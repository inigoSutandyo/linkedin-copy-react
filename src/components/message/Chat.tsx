import React, { useState, useEffect } from 'react'
import { IconContext } from 'react-icons'
import { FiSend } from 'react-icons/fi'
import { useAppSelector } from '../../app/hooks'

type Props = {
    chat: Chats
}

const Chat = (props: Props) => {
  const user = useAppSelector((state) => state.user.user)

  const [other, setOther] = useState<User>()
  
  useEffect(() => {
    props.chat.users.forEach(u => {
        if (u.ID != user.ID) {
            setOther(u)
        }
    });
  }, [props])
  

  return (
    <>  
        <h3>{other?.firstname}</h3>
        <div style={{
            minHeight:"378px"
        }} className="bg-primary d-flex flex-column">
            <div style={{
                alignSelf: "flex-end"
            }} className="mx-2">
                Test message
            </div>
        </div>
        <div className='w-10 d-flex'>
            <input type="text" name="chat" id="chat" className='form-input-secondary w-10' placeholder='Input message...'/>
            <button className='btn-primary-outline'>
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