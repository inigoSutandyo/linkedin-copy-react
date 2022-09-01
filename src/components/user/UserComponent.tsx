import React, { useState, useEffect } from 'react'
import "../../styles/components/user.css"
import placheholderProfile from '../../assets/placeholders/user.png'
type Props = {
    user: User
}

const UserComponent = (props: Props) => {
  const [imageUrl, setImageUrl] = useState("")
  useEffect(() => {
    const user = props.user
    if (!user.imageurl || user.imageurl == "" ) {
        setImageUrl(placheholderProfile)
    } else {
        setImageUrl(user.imageurl)
    }
  }, [props.user])
  
  return (
    <div className='d-flex flex-row align-center'>
        <div className='user-component-image' style={{
            backgroundImage: `url(${imageUrl})`,
        }}>
        </div>
        <div className='user-component-text'>
            <div className='user-component-header'>
                {props.user.firstname} {props.user.lastname}
            </div>
            <div className='user-component-subheader'>
                {props.user.headline}
            </div>
        </div>
    </div>
  )
}

export default UserComponent