import axios from 'axios';
import React, { SyntheticEvent, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addPost } from '../../features/post/postSlice';
import "../../styles/forms/form.css";
import { ApiURL } from '../../utils/Server';

type User = {
  ID: number
  firstname: string
  lastname: string
  email: string
  phone: string
}

interface Props {
  user: User ,
  closeModal: any,
}

const AddPost = (props: Props) => {
  const [value, setValue] = useState("")
  const [error, setError] = useState("")
  const posts = useAppSelector((state) => state.post)
  const dispatch = useAppDispatch() 

  function handleChange(content: any, delta: any, source: any, editor: any) {
    if (editor.getLength() > 255) {
      setError("Length of post exceeded limit of 255 characters")
    } else {
      setError("")
    }
    console.log(content)
    setValue(content);
    
  }
  const handleAddPost = (e: SyntheticEvent) => {
    e.preventDefault()
    if (error !== "") return
    if (value.replace(/<(.|\n)*?>/g, '').trim().length < 1) return 

    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    console.log(value)
    axios.post(ApiURL("/home/post/add"), {
      'content': value,
      'title': "",
      'attachment': "",
      'likes': 0
    }, axiosConfig)
    .then((response) => {
        dispatch(addPost(response.data.post))
        console.log(response.data)
        props.closeModal()
    })  
    .catch(function (error) {
        console.log(error.response.data);        
    })
    .then(function (response) {

    });
  }
  return (
    <form action="POST" onSubmit={handleAddPost}>
         <div id='editor-container' className='editor-container'>
            <ReactQuill id='quill' theme='bubble' value={value} onChange={handleChange} bounds={"#editor-container"} style = {{
              overflow: "auto",
              width: "95%",
              height: "128px",
              maxHeight: "250px"
            }} placeholder={"What are you thinking about?"}/>
         </div>
          {/* <div className="input-container">
          </div> */}
          <div className='submit-container justify-end'>
            <input type="submit" value="Post" className='btn-primary w-1' style={{
              borderRadius: "16px"
            }}/>
          </div>
          <div style={{color: "red"}}>
            {error}
          </div>
    </form>
  )
}

export default AddPost