import axios from 'axios'
import HTMLReactParser from 'html-react-parser'
import {useEffect, useState} from 'react'
import ReactQuill from 'react-quill'
import { ApiURL } from '../../utils/Server'

type Props = {
    comment: PostComment
}

const Comment = (props: Props) => {
  const [replies, setReplies] = useState<Array<PostReply>>()
  const [openReply, setOpenReply] = useState(false)
  
  const [value, setValue] = useState("")
  const [button, setButton] = useState(false)
  const [error, setError] = useState("")

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
    axios.get(ApiURL("/home/post/comment/reply"), {
      params: {
        id: props.comment.ID
      }
    })
    .then((response) => {
      console.log(response.data)
      setReplies(response.data.replies)
    }) 
    .catch(function (error) {
      console.log(error.response.data);        
    })
  }, [])

  const handleOpenReply = () => {
    setOpenReply(true)
  }

  return (
    <>
      <div className='comment-card'>
          {props.comment.user.email}
          <p>
              {props.comment.user.headline}
          </p>
          <div>
              {HTMLReactParser(props.comment.content)}
          </div>
      </div>
      <div className='comment-card-actions'>
        <div className='card-action'>
          Like
        </div>
        <div className='card-action' onClick={handleOpenReply}>
          Reply
        </div>
      </div>
      <div className='reply-items'> 
        {openReply ? (
          <div>
            <div id='editor-container' className='input-container'>
            <ReactQuill id='quill' theme='bubble' value={value} onChange={handleChange} bounds={"#editor-container"} style = {{
              border: "1px solid rgba(0,0,0,.15)",
              overflow: "auto",
              minHeight: "28px",
              maxHeight: "250px",
              borderRadius: "32px"
            }} placeholder={"Reply here"}/>
         </div>
          </div>
        ) : <></>}
        {replies && replies.length > 0 ? (
          <div className='reply-cards'>
            {replies?.map((r) => (
              <div key={r.ID}>
                {HTMLReactParser(r.content)}
              </div>
            ))}
          </div>
        ) : <></>}
      </div>
    </>
  )
}

export default Comment