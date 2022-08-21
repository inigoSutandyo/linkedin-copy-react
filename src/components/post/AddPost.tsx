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
    if (editor.getLength() > 100) {
      setError("Length of post exceeded limit of 100 characters")
    } else {
      setError("")
    }
    console.log(content)
    setValue(content);
    
  }
  const addPost = (e: SyntheticEvent) => {
    e.preventDefault()
    if (error !== "") return


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
        const msg = response.data.message;
        console.log(response.data)
    })  
    .catch(function (error) {
        console.log(error.response.data);        
    })
    .then(function (response) {

    });
  }
  return (
    <form action="POST" onSubmit={addPost}>
         <p style={{fontWeight: "bold"}}>Add New Post</p>
          <ReactQuill id='quill' theme='bubble' value={value} onChange={handleChange} style = {{
            border: "1px solid",
            overflow: "auto",
            height: "250px",
            maxHeight: "250px"
          }} placeholder={"What are you thinking about?"}/>
          {/* <div className="input-container">
          </div> */}
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