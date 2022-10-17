import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ApiURL } from '../../utils/Server'
import SharedPost from '../post/SharedPost'
import UserComponent from '../user/UserComponent'

type Props = {
    message: Message
}

const OtherMessage = (props: Props) => {
  const [user, setUser] = useState<User>()
  useEffect(() => {
    if (props.message.profileid < 1 ) return

    axios.get(ApiURL("/user/otherprofile"), {
      params: {
          id: props.message.profileid
      }
    })
    .then((response) => {
      setUser(response.data.user)
    })
    .catch((error) => {
      console.log(error)
    })
  }, [props])
  return (
    <div className="mx-2 other-message">
        {props.message.post  ? (
          <>
            <SharedPost post_id={props.message.postid}/>
          </>
        ) : props.message.fileurl != '' ? (
          <>
            <div className='w-8'>
              <img src={props.message.fileurl} alt="" style={{
                maxWidth: "240px"
              }}/>
            </div>
          </>
        ) : props.message.profileid >= 1 && user ? (
          <>
            <UserComponent user={user}/>
          </>
        ) : (
          <>
            {props.message.content}
          </>
        )}
    </div>
  )
}

export default OtherMessage