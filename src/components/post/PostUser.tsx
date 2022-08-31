import React, { useEffect, useState } from 'react'
import "../../styles/components/post.css"
import placeholder from "../../assets/placeholders/user.png"
import { Link } from 'react-router-dom'

interface Props {
    user: User
    imageSize: string,
}

const PostUser = (props: Props) => {
  const [imageUrl, setImageUrl] = useState("")

  const fileReader = new FileReader()
  useEffect(() => {
    const user = props.user
    if (!user.imageurl || user.imageurl == "") {
        setImageUrl(placeholder)
        return
    } else {
        setImageUrl(user.imageurl)
    }   
    
  }, [])
  
  return (
    <Link to={`/profile/${props.user.ID}`} style={{
        textDecoration: "none"
    }}>
        <div className='post-user'>
            <div className='post-header'>
                <div className='post-header-image' style={{
                    backgroundImage: `url(${imageUrl})`,
                    width: `${props.imageSize}`,
                    height: `${props.imageSize}`
                }}></div> 
                <div className='post-header-name'>
                    {props.user.firstname} {props.user.lastname}
                </div>
            </div>
            <div className='post-subheader'>
                {props.user.headline}
            </div>
        </div>
    </Link>
  )
}

export default PostUser