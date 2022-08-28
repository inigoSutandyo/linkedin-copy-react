import React, { useEffect, useState } from 'react'
import "../../styles/components/post.css"
import placeholder from "../../assets/placeholders/user.png"
interface Props {
    user: User
}

const PostUser = (props: Props) => {
  const [imageUrl, setImageUrl] = useState("")

  const getMimetype = (signature: string) => {
    switch (signature) {
        case '89504E47':
            return 'image/png'
        case '47494638':
            return 'image/gif'
        case '25504446':
            return 'application/pdf'
        case 'FFD8FFDB':
        case 'FFD8FFE0':
            return 'image/jpeg'
        case '504B0304':
            return 'application/zip'
        default:
            return 'Unknown filetype'
    }
  }
  const fileReader = new FileReader()
  useEffect(() => {
    const user = props.user
    if (!user.image) {
        setImageUrl(placeholder)
        return
    } else {
        setImageUrl(`data:${user.imagemime};base64,` + user.image)
    }   
    
  }, [])
  
  return (
    <div className='post-user'>
        <div className='post-header'>
            <div className='post-header-image' style={{
                backgroundImage: `url(${imageUrl})`
            }}></div> 
            <div className='post-header-name'>
                {props.user.firstname} {props.user.lastname}
            </div>
        </div>
        <div className='post-subheader'>
            {props.user.headline}
        </div>
    </div>
  )
}

export default PostUser