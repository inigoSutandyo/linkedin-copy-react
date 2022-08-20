import React, { SyntheticEvent, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "../../styles/forms/form.css";

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
  
  const addPost = (e: SyntheticEvent) => {
    e.preventDefault()
    console.log(value)
  }
  return (
    <form action="POST" onSubmit={addPost}>
         <p style={{fontWeight: "bold"}}>Add New Post</p>
          <div className="input-container">
              <ReactQuill theme='snow' value={value} onChange={setValue}/>
          </div>
          <div className='input-container'>
            <input type="submit" value="Submit" className='btn-primary w-10' />
          </div>
    </form>
  )
}

export default AddPost