import axios from 'axios'
import {useState, useEffect, useRef} from 'react'
import ReactQuill ,{QuillOptions} from 'react-quill'
import { useAppDispatch, useAppSelector } from '../../app/hooks'

import { ApiURL } from '../../utils/Server'
import Loading from '../Loading'
import Comment from './Comment'

type Props = {
  postid: number,
  index: number,
}

const PostComment = (props: Props) => {
  const limit = 5;
  
  const [show, setShow] = useState(true)
  const [value, setValue] = useState("")
  const [button, setButton] = useState(false)
  const [error, setError] = useState("")
  const [comments, setComments] = useState<Array<PostComment>>([])
  const [loading, setLoading] = useState(false)
  const [offset, setOffset] = useState(0)

  function handleChange(content: any, delta: any, source: any, editor: any) {
    
    if (content.replace(/<(.|\n)*?>/g, '').trim().length > 1) setButton(true)
    else setButton(false)

    if (editor.getLength() > 255) {
        setError("Length of comment exceeded limit of 255 characters")
    } else {
        setError("")
    }
    setValue(content)
  }


  useEffect(() => {
    axios.get(ApiURL("/home/post/comment"), {
      params: {
        id: props.postid,
        offset: 0,
        limit: 2,
      }
    })
    .then((response) => {
      console.log(response.data)
      setComments([...response.data.comments])
      setOffset(2)
    }) 
    .catch(function (error) {
      console.log(error.response.data);        
    })
  }, [])
  
  const showMoreComment = () => {
    setLoading(true)
    setTimeout(() => {
      axios.get(ApiURL("/home/post/comment"), {
        params: {
          id: props.postid,
          offset: offset,
          limit: limit,
        }
      })
      .then((response) => {
        console.log(response.data)
        setComments([...comments, ...response.data.comments])
        setOffset(offset + limit)
        setShow(response.data.hasmore)
      }) 
      .catch(function (error) {
        console.log(error.response.data);        
      })
      .then(()=>{
        setLoading(false)
      })
    }, 250)
  }

  const addComment = () => {

    if (error !== "") return
    if (value.replace(/<(.|\n)*?>/g, '').trim().length < 1) return 

    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    axios.post(ApiURL("/home/post/comment/add"), {
      "content": value,
      "likes": 0,
      "postid": props.postid,
      "isreply": false,
    }, axiosConfig)
    .then((response) => {
      setComments([...comments, response.data.comment])
      console.log(response.data)

    }) 
    .catch(function (error) {
      console.log(error.response.data);        
    })
    setValue("")
  }

  return (
    <div style={{
      width: "100%"
    }}>
        <div className='comment-header'>
         <div id='editor-container' className='input-container'>
            <ReactQuill id='quill' theme='bubble' value={value} onChange={handleChange} bounds={"#editor-container"} style = {{
              border: "1px solid rgba(0,0,0,.15)",
              overflow: "auto",
              minHeight: "28px",
              maxHeight: "250px",
              borderRadius: "32px"
            }} placeholder={"What are you thinking about?"}/>
         </div>
          {button ? (
            <div>
              <button type="submit" onClick={addComment}>Post</button>
            </div>
          ) : <></>}
          <div style={{color: "red"}}>
            {error}
          </div>
        </div>
        <div>
          {comments?.map((c, i) => (
            <div className='comment-item' key={c.ID}>
              <Comment comment={c}/>
            </div>
          ))}
          {!show || comments.length === 0 ? <></> : (
            <div className='mx-2 pointer-cursor color-blue' onClick={showMoreComment}>
              Show More Comments
            </div>
          )}
          {loading ? (
            <div className='d-flex justify-center'>
              <Loading/>
            </div>
          ) : <></>}
        </div>
    </div>
  )
}

export default PostComment