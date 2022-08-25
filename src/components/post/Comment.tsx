import axios from 'axios'
import HTMLReactParser from 'html-react-parser'
import {useEffect, useState} from 'react'
import { ApiURL } from '../../utils/Server'

type Props = {
    comment: PostComment
}

const Comment = (props: Props) => {
  const [replies, setReplies] = useState<Array<PostReply>>()

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
        <div>
          Like
        </div>
        <div>
          Replies
        </div>
      </div>
      {replies && replies.length > 0 ? (
        <div className='reply-items'>
          {replies?.map((r) => (
            <div key={r.ID}>
              {HTMLReactParser(r.content)}
            </div>
          ))}
        </div>
      ) : <></>}
    </>
  )
}

export default Comment