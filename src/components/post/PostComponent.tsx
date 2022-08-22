import React from 'react'
import parse from 'html-react-parser';

type Props = {
  post: Post
}

const PostComponent = (props: Props) => {
  console.log(props.post)
  return (
    <>
      {props.post && props.post.content? (
        <div className='post-component'>
          <div>
            {parse(props.post.content)}
          </div>
        </div>
      ) : <>undefined</>}
    </>
  )
}

export default PostComponent