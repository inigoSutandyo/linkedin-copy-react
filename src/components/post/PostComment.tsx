import axios from 'axios'
import {useState, useEffect, useRef} from 'react'
import ReactQuill ,{QuillOptions} from 'react-quill'

import { ApiURL } from '../../utils/Server'
import Comment from './Comment'

type Props = {
  postid: number
}

const PostComment = (props: Props) => {

  const [value, setValue] = useState("")
  const [button, setButton] = useState(false)
  const [error, setError] = useState("")
  const [comments, setComments] = useState<Array<PostComment>>()

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
    // console.log(props.postid)
    axios.get(ApiURL("/home/post/comment"), {
      params: {
        id: props.postid
      }
    })
    .then((response) => {
      console.log(response.data.message)
      setComments(response.data.comments)
    }) 
    .catch(function (error) {
      console.log(error.response.data);        
    })
  }, [])
  

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
    }, axiosConfig)
    .then((response) => {
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
          <div>
            {comments?.map((c, i) => (
              <Comment comment={c} key={i}/>
            ))}
          </div>
    </div>
  )
}

export default PostComment