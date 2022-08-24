import {useState, useEffect} from 'react'
import parse from 'html-react-parser';
import "../../styles/components/post.css"
import { AiFillLike, AiOutlineLike } from 'react-icons/ai'
import { FaRegCommentDots } from 'react-icons/fa'
import { RiShareForwardLine } from 'react-icons/ri'
import { IoIosSend } from 'react-icons/io'
import { IconContext } from 'react-icons';
import ReactModal from 'react-modal';
import 'react-quill/dist/quill.bubble.css';
import PostComment from './PostComment';
import Comment from './Comment';
import axios from 'axios';
import { ApiURL } from '../../utils/Server';

type Props = {
  post: Post
}

const PostComponent = (props: Props) => {
  // console.log(props.post)
  ReactModal.setAppElement("#home-page")
  const [comment, setComment] = useState(false)

  // useEffect(() => {
  //   axios.get(ApiURL("/"))
  // }, [])
  

  const handleOpenComment = () => {
    setComment(true)
  }

  const handleCloseComment = () => {
    setComment(false)
  }

  return (
    <>
      {props.post && props.post.content? (
        <div className='post-container'>
          <div className='post-header'>
            {props.post.user.email}
          </div>
          
          <div className='line-container'>
            <hr className='line'/>
          </div>

          <div className='content-container'>
            <div className='post-content'>
              {parse(props.post.content)}
            </div>
          </div>
          
          <div className='like-count'>
            <IconContext.Provider value={{
              color: "blue"
            }}>
              <AiFillLike/>
            </IconContext.Provider>
            <div className='likes'>
              : {props.post.likes}
            </div>
          </div>
          <div className='line-container'>
            <hr className='line'/>
          </div>
          <div className='content-footer'>
            <div className='post-actions'>
              <AiOutlineLike/>
              <p>Like</p>
            </div>
            <div className='post-actions' onClick={()=>handleOpenComment()}>
              <FaRegCommentDots/>
              <p>Comment</p>
            </div>
            <div className='post-actions'>
              <RiShareForwardLine/>
              <p>Share</p>
            </div>
            <div className='post-actions'>
              <IoIosSend/>
              <p>Send</p>
            </div>
          </div>
          {comment ? (
            <div className='comment-container'>
              <PostComment postid={props.post.ID}/>
              {/* <Comment comment={}/> */}
            </div>
          ) : <></>}
        </div>
      ) : <>undefined</>}
    </>
  )
}

export default PostComponent