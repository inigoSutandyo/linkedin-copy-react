import React, { useEffect } from 'react'
import PostComponent from '../post/PostComponent'
import SharedPost from '../post/SharedPost'

type Props = {
    message: Message
}

const MyMessage = (props: Props) => {

  return (
    <div className="mx-2 my-message">
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
        ) : (
          <>
            {props.message.content}
          </>
        )}
    </div>
  )
}

export default MyMessage