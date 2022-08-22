import React from 'react'
import parse from 'html-react-parser';
import "../../styles/components/post.css"
type Props = {
  post: Post
}

const PostComponent = (props: Props) => {
  // console.log(props.post)
  return (
    <>
      {props.post && props.post.content? (
        <div className='post-container'>
          <div className='post-header'>
            {props.post.user.email}
          </div>
          
          <div style={{
            width: "100%",
            color: "#B6B9BC",
          }}>
            <hr style={{backgroundColor: "#B6B9BC", width:"98%", clear:"both"}}/>
          </div>
          <div className='content-container'>
            <div className='post-content'>
              {parse(props.post.content)}
            </div>
          </div>
        </div>
      ) : <>undefined</>}
    </>
  )
}

export default PostComponent