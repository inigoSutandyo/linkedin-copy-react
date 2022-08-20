import React, { SyntheticEvent, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
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
  const [error, setError] = useState("")
  function handleChange(content: any, delta: any, source: any, editor: any) {
    if (editor.getLength() > 10) {
      setError("Length of post exceeded limit (255)")
    } else {
      setError("")
    }
    setValue(editor.getContents());
    
  }
  const addPost = (e: SyntheticEvent) => {
    e.preventDefault()
    if (error !== "") return
    const conv = JSON.stringify(value)
    const obj = JSON.parse(conv)
    console.log(conv)
    console.log(obj)

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