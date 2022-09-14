import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { ApiURL } from '../../utils/Server'
import UserComponent from '../user/UserComponent'

type Props = {
    notif: Notif,
    handleCloseNotification: any
}

const NotificationComponent = (props: Props) => {
  const [comment, setComment] = useState<Comment>()
  const [post, setPost] = useState<Post>()
  const [from, setFrom] = useState<User>()
  
  useEffect(() => {
    const notif = props.notif
    if (notif.comment) {
        setComment(notif.comment)
    }

    if (notif.post) {
        setPost(notif.post)
    }

    if (notif.from) {
        setFrom(notif.from)
    }
  }, [props])
  

  

  return (
    <div className='d-flex flex-row align-center justify-between my-2 border-bottom-light'>
        <div>
            {from ? (
                <UserComponent user={from}/>
            ) : <></>}
            {props.notif.message}
        </div>
        <div>
            <button className='btn-primary-outline' style={{
                borderRadius: "12px"
            }} onClick={() => props.handleCloseNotification(props.notif.ID)}>Close</button>
        </div>
    </div>
  )
}

export default NotificationComponent