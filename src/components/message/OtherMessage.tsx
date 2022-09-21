import React from 'react'

type Props = {
    message: Message
}

const OtherMessage = (props: Props) => {
  return (
    <div className="mx-2 other-message">
        {props.message.content}
    </div>
  )
}

export default OtherMessage