import React from 'react'

type Props = {
    handleOpen: any
}

const CommentActions = (props: Props) => {
  return (
    <div className='comment-card-actions'>
        <div className='card-action'>
            Like
        </div>
        <div className='card-action' onClick={props.handleOpen}>
            Reply
        </div>
    </div>
  )
}

export default CommentActions