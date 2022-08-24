import React from 'react'

type Props = {
    comment: PostComment
}

const Comment = (props: Props) => {
  return (
    <div>
        <p>
            {props.comment.content}
        </p>
    </div>
  )
}

export default Comment