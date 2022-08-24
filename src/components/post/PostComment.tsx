import {useState} from 'react'
import ReactQuill from 'react-quill'
import Modal from '../ModalComponent'

type Props = {}

const PostComment = (props: Props) => {
  const [value, setValue] = useState("")
  const [error, setError] = useState("")
  function handleChange(content: any, delta: any, source: any, editor: any) {
    if (editor.getLength() > 255) {
        setError("Length of comment exceeded limit of 255 characters")
    } else {
        setError("")
    }
    console.log(content)
    setValue(content)
  }

  const addComment = () => {

  }

  return (
    <form action="POST" onSubmit={addComment}>
         <p style={{fontWeight: "bold"}}>Add New Post</p>
         <div id='editor-container' className='input-container'>
            <ReactQuill id='quill' theme='bubble' value={value} onChange={handleChange} bounds={"#editor-container"} style = {{
              border: "1px solid",
              overflow: "auto",
              height: "128px",
              maxHeight: "250px"
            }} placeholder={"What are you thinking about?"}/>
         </div>

          <div className='input-container'>
            <input type="submit" value="Submit" className='btn-primary w-5' style={{
              borderRadius: "16px"
            }}/>
          </div>
          <div style={{color: "red"}}>
            {error}
          </div>
    </form>
  )
}

export default PostComment