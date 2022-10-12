import {useState, useEffect} from 'react'
import parse from 'html-react-parser';
import { AiFillLike, AiOutlineLike, AiOutlineMore } from 'react-icons/ai'
import { FaRegCommentDots } from 'react-icons/fa'
import { RiShareForwardLine } from 'react-icons/ri'
import { IoIosSend } from 'react-icons/io'
import { IconContext } from 'react-icons';
import 'react-quill/dist/quill.bubble.css';
import PostComment from './PostComment';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import axios from 'axios';
import { addLikedPost, removeLikedPost, setLikedPost, setUser } from '../../features/user/userSlice';
import { ApiURL } from '../../utils/Server';
import { updateSinglePost } from '../../features/post/postSlice';
import PostUser from './PostUser';
import { Link } from 'react-router-dom';
import { FiMoreVertical } from 'react-icons/fi';
import { HiTrash } from 'react-icons/hi'
import "../../styles/components/post.scss"

type Props = {
  post: Post,
  commentCount: number,
  index: number,
  handleOpenModal: any,
  setMovieId: any,
}

const PostComponent = (props: Props) => {

  const [comment, setComment] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [imageUrl, setImageUrl] = useState("")
  const [commentCount, setCommentCount] = useState(0)

  const user = useAppSelector((state) => state.user.user)
  
  const dispatch = useAppDispatch() 

  useEffect(() => {
    // console.log(props.post)
    if (props.post.fileurl != "") {
      setImageUrl(props.post.fileurl)
    }

  }, [])
  

  const handleOpenComment = () => {
    setComment(true)
  }

  const handleCloseComment = () => {
    setComment(false)
  }

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
    if (processing) return

    setProcessing(true)
    if (user.likedposts.indexOf(props.post.ID) !== -1) {
      console.log("dislike")
      dislikePost()
      .then((response: any) => {
        const num = response.data.likepost as Number
        const post = response.data.post as Post
        setIsLiked(false)
        dispatch(removeLikedPost(num))
        dispatch(updateSinglePost(post))
      })
      .catch((error: any) => {
        console.log(error)
        
      })
      .finally(() => {
        setProcessing(false)
      })
    } else {
      console.log("like")
      console.log(isLiked)
      likePost()
      .then((response: any) => {
        const num = response.data.likepost as Number
        const post = response.data.post as Post
        setIsLiked(true)
        dispatch(addLikedPost(num))
        dispatch(updateSinglePost(post))
      })
      .catch((error: any) => {
        console.log(error)
      }).finally(() => {
        setProcessing(false)
      })
    }
  }

  useEffect(() => {
    // console.log(user.likedposts)
    if (user.likedposts?.indexOf(props.post.ID) !== -1) {
      setIsLiked(true)
    } else {
      setIsLiked(false)
    }
  }, [user])

  const onClickRemove = () => {
    const post = props.post
    props.setMovieId(post.ID)
    props.handleOpenModal("Delete Post")
  }
  return (
    <>
      {props.post && props.post.content ? (
        <div className='post-container'>
          <div className='d-flex flex-row align-center justify-between w-10 border-bottom-light'>
            <PostUser user={props.post.user} imageSize="35px"/>
            {props.post.user.ID == user.ID ? (
              <div className='mx-2 pointer-cursor' onClick={onClickRemove}>
                <IconContext.Provider value={{
                  size: "20px"
                }}>
                  <HiTrash/>
                </IconContext.Provider>
              </div>
            ) : <></>}       
          </div>
          <div className='content-container'>
            <div className='post-content'>
              {parse(props.post.content)}
            </div>
          </div>
          <div style={{
            display: "flex",
            justifyContent: "flex-start",
            width: "100%",
            margin: "8px"
          }}>
            <img src={imageUrl} alt="" style={{
              width: "95%",
              maxWidth: "300px"
            }}/>
          </div>
          <div className='like-count border-bottom-light w-10'>
            <IconContext.Provider value={{
              color: "blue"
            }}>
              <AiFillLike/>
            </IconContext.Provider>
            <div className='likes'>
              {props.post.likes}
            </div>
          </div>

          <div className='content-footer'>
            <div className='post-actions' onClick={handleLikePost}>
              {isLiked ? (
                <AiFillLike/>
              ) : (
                <AiOutlineLike/>
              )}
              <p>Like</p>
            </div>
            <div className='post-actions' onClick={()=>handleOpenComment()}>
              <FaRegCommentDots/>
              <p>{props.commentCount}</p>
            </div>
            <div className='post-actions action-hide'>
              <RiShareForwardLine/>
              <p>Share</p>
            </div>
            <div className='post-actions action-hide'>
              <IoIosSend/>
              <p>Send</p>
            </div>
            <div className='post-actions action-drop'>
                <FiMoreVertical/>
            </div>
          </div>
          {comment ? (
            <div className='comment-container'>
              <PostComment postid={props.post.ID} index={props.index} setCommentCount={setCommentCount}/>
            </div>
          ) : <></>}
        </div>
      ) : <></>}
    </>
  )
}

export default PostComponent