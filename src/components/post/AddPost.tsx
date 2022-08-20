import axios from 'axios';
import React, { SyntheticEvent, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
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
  user: User  
}

const AddPost = (props: Props) => {
  const [value, setValue] = useState("")
  const [error, setError] = useState("")
  function handleChange(content: any, delta: any, source: any, editor: any) {
    if (editor.getLength() > 255) {
      setError("Length of post exceeded limit (255)")
    } else {
      setError("")
    }
    setValue(editor.getContents());
    
  }
  const addPost = (e: SyntheticEvent) => {
    e.preventDefault()
  
    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };


    if (error !== "") return
    const json = JSON.stringify(value)
    const content = JSON.parse(json)
    console.log(content)
    axios.post(ApiURL("/home/post/add"), {
      'content': content,
      'title': "",
      'attachment': "",
      'likes': 0
    }, axiosConfig)
    .then((response) => {
        const msg = response.data.message;
        console.log(response.data)
    })  
    .catch(function (error) {
        console.log(error.response.data.message);        
    })
    .then(function (response) {

    });
  }
  return (
    <form action="POST" onSubmit={addPost}>
         <p style={{fontWeight: "bold"}}>Add New Post</p>
          <div className="input-container">
              <ReactQuill  theme='bubble' value={value} onChange={handleChange} style = {{
                border: "1px solid",
                overflow: "auto",
                height: "250px",
                maxHeight: "250px"
              }} placeholder={"What are you thinking about?"}/>
          </div>
          <div className='input-container'>
            <input type="submit" value="Submit" className='btn-primary w-10' />
          </div>
          <div style={{color: "red"}}>
            {error}
          </div>
    </form>
  )
}

export default AddPost