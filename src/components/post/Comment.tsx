import HTMLReactParser from 'html-react-parser'
import React from 'react'

type Props = {
    comment: PostComment
}

const Comment = (props: Props) => {
  return (
    <div>
        <div>
            {HTMLReactParser(props.comment.content)}
        </div>
    </div>
  )
}

export default Comment