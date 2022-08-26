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
import { addLikedPost, removeLikedPost, setLikedPost } from '../../features/user/userSlice';
import { ApiURL } from '../../utils/Server';
import { resolve } from 'path';
import { setPosts, updateSinglePost } from '../../features/post/postSlice';

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

  const axiosConfig = {
    withCredentials: true,
    params: {
      id: props.post.ID
    }
  }
  
  const dislikePost = () => new Promise((resolve: any, reject: any)=> {
    axios.post(ApiURL("/home/post/dislike"), {}, axiosConfig)
      .then((response) => {
        resolve(response)
        
      }).catch((error) => {
        reject(error)
      
      })
  })

  const likePost = () => new Promise((resolve: any, reject: any) => {
    axios.post(ApiURL("/home/post/like"), {}, axiosConfig)
    .then((response) => {
      resolve(response)
    }).catch((error) => {
      reject(error)
    })
  })

  const handleLikePost = () => {
    if (user.likedposts.indexOf(props.post.ID) !== -1) {
      dislikePost()
      .then((response: any) => {
        const num = response.data.likepost as Number
        const post = response.data.post as Post
        console.log(num)
        dispatch(removeLikedPost(num))
        dispatch(updateSinglePost(post))
      })
      .catch((error: any) => {
        console.log(error)
      })
    } else {
      likePost()
      .then((response: any) => {
        const num = response.data.likepost as Number
        const post = response.data.post as Post
        dispatch(addLikedPost(num))
        dispatch(updateSinglePost(post))
      })
      .catch((error: any) => {
        console.log(error)
      })
    }
  }

  useEffect(() => {
    // console.log(user.likedposts)
  }, [user.likedposts])
  

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
            <div className='post-actions' onClick={handleLikePost}>
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