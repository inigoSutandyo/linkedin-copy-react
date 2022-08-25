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
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import axios from 'axios';
import { setLikedPost } from '../../features/user/userSlice';
import { ApiURL } from '../../utils/Server';

type Props = {
  post: Post
}

const PostComponent = (props: Props) => {

  ReactModal.setAppElement("#home-page")
  const [comment, setComment] = useState(false)

  const handleOpenComment = () => {
    setComment(true)
  }

  const handleCloseComment = () => {
    setComment(false)
  }
  const user = useAppSelector((state) => state.user.user)
  

  const dispatch = useAppDispatch() 
  console.log(user.likedposts)
  const likePost = () => {
    const axiosConfig = {
      withCredentials: true,
      params: {
        id: props.post.ID
      }
    }

    if (user.likedposts.indexOf(props.post.ID) !== -1) {
      axios.post(ApiURL("/home/post/dislike"), {}, axiosConfig)
      .then((response) => {
        const likedPosts = user.likedposts
        for (let i = 0; i < likedPosts.length; i++) {
          const like = likedPosts[i];
          if (like === response.data.postId) {
            likedPosts.splice(i, 1)
            break
          }
          
        }
        dispatch(setLikedPost(likedPosts))
      }).catch((error) => {
        console.log(error.response)
      }).then((response) => {
        
      }) 
    } else {
      console.log(props.post.ID)
      axios.post(ApiURL("/home/post/like"), {}, axiosConfig)
      .then((response) => {
        console.log(response.data)
        const likedPosts = user.likedposts
        likedPosts.push(response.data.likepost)
        dispatch(setLikedPost(likedPosts))
      }).catch((error) => {
        console.log(error.response)
      }).then((response) => {
        
      }) 
    }
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
            <div className='post-actions' onClick={likePost}>
              {user.likedposts?.indexOf(props.post.ID) !== -1 ? (
                <AiFillLike/>
              ) : (
                <AiOutlineLike/>
              )}
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
            </div>
          ) : <></>}
        </div>
      ) : <>undefined</>}
    </>
  )
}

export default PostComponent