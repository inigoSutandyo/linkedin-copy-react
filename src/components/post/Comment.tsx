import HTMLReactParser from 'html-react-parser'
import React from 'react'

type Props = {
    comment: PostComment
}

const Comment = (props: Props) => {
  console.log(props.comment)
  return (
    <div className='comment-card'>
        {props.comment.user.email}
        <p>
            {props.comment.user.headline}
        </p>
        <div>
            {HTMLReactParser(props.comment.content)}
        </div>
    </div>
  )
}

export default Comment