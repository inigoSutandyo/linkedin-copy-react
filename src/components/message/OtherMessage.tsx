import React from 'react'
import SharedPost from '../post/SharedPost'

type Props = {
    message: Message
}

const OtherMessage = (props: Props) => {
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
        ) : (
          <>
            {props.message.content}
          </>
        )}
    </div>
  )
}

export default OtherMessage