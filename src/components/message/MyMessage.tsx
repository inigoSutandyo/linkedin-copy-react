import React from 'react'

type Props = {
    message: Message
}

const MyMessage = (props: Props) => {
  return (
    <div className="mx-2 my-message">
        {props.message.content}
    </div>
  )
}

export default MyMessage