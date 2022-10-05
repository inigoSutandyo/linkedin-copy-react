import axios from 'axios'
import HTMLReactParser from 'html-react-parser'
import {useEffect, useState} from 'react'
import ReactQuill from 'react-quill'
import { Link } from 'react-router-dom'
import { ApiURL } from '../../utils/Server'
import CommentActions from './CommentActions'
import PostUser from './PostUser'

type Props = {
    comment: PostComment
}

type Mention = {
  id: number
  name: string
}

const Comment = (props: Props) => {
  const [replies, setReplies] = useState<Array<PostReply>>([])
  const [openReply, setOpenReply] = useState(false)
  const [mention, setMention] = useState<Mention>()
  const [value, setValue] = useState("")
  const [button, setButton] = useState(false)
  const [error, setError] = useState("")
  const [offset, setOffset] = useState(0)
  const [show, setShow] = useState(true)
  
  useEffect(() => {
    axios.get(ApiURL("/home/post/comment/reply"), {
      params: {
        id: props.comment.ID,
        offset: 0,
        limit: 1,
      }
    })
    .then((response) => {
      setReplies([...response.data.replies])
      setOffset(1)
    }) 
    .catch(function (error) {
      console.log(error.response.data);        
    })
  }, [])

  const showMoreReply = () => {
    axios.get(ApiURL("/home/post/comment/reply"), {
      params: {
        id: props.comment.ID,
        offset: offset,
        limit: 5,
      }
    })
    .then((response) => {
      setReplies([...replies ,...response.data.replies])
      setShow(response.data.hasmore)
      setOffset(offset + 5)
    }) 
    .catch(function (error) {
      console.log(error.response.data);        
    })
  }
  
  const handleOpenReply = (id: number, firstname: string, lastname: string) => {
    setOpenReply(true)
    setMention({
      id: id,
      name: firstname + " " + lastname,
    })
  }

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

  const handleAddReply = () => {
    if (error !== "") return
    if (value.replace(/<(.|\n)*?>/g, '').trim().length < 1) return 
    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      params: {
        id: props.comment.ID,
        mention: mention ? mention.id : 0
      }
    };
    axios.post(ApiURL("/home/post/comment/reply/add"), {
      "content": value,
      "commentid": props.comment.ID,
      "likes": 0,
      "isreply": true
    }, axiosConfig)
    .then((response) => {
      setReplies([...replies, response.data.reply])
      console.log(response.data.reply)
    }) 
    .catch(function (error) {
      console.log(error.response.data);        
    })
    setValue("")
  }
  return (
    <>
      <div className='comment-card'>
          <PostUser user={props.comment.user} imageSize="35px"/>
          <div>
              {HTMLReactParser(props.comment.content)}
          </div>
      </div>
      <CommentActions handleOpen={() => handleOpenReply(0, "", "")} />
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
            {button ? (
              <div>
                <button type="submit" onClick={handleAddReply}>Post</button>
              </div>
            ) : <></>}
          </div>
        ) : <></>}
        {replies && replies.length > 0 ? (
          <div>
            {replies?.map((r) => (
              <div key={r.ID}>
                <div className='reply-cards'>
                  <PostUser user={r.user} imageSize="35px"/>
                  <div className='d-flex'>
                    {r.mention ? (
                      <Link to={`/profile/${r.mention.ID}`}>
                        <div className='mr-2 color-blue'>
                          {r.mention.firstname} {r.mention.lastname}
                        </div>
                      </Link>
                    ) : <></>}
                    {HTMLReactParser(r.content)}
                  </div>
                </div>
                <CommentActions handleOpen={() => handleOpenReply(r.user.ID, r.user.firstname, r.user.lastname)} />
              </div>
            ))}
            {!show ? <></> : (
              <div className='mx-2 pointer-cursor color-blue' onClick={showMoreReply}>
                Show More Reply
              </div>
            )}
          </div>
        ) : <></>}
      </div>
    </>
  )
}

export default Comment