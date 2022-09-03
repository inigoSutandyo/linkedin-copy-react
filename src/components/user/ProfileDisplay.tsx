import React from 'react'
import { useAppSelector } from '../../app/hooks'
import "../../styles/pages/profile.scss";
import backgroundPlaceholder from '../../assets/placeholders/banner.jpg'
type Props = {}

const ProfileDisplay = (props: Props) => {
  const user = useAppSelector((state) => state.user.user)
  
  return (
    <div className='profile-display'>
      <div
        className='user-background-display'
        style={{backgroundImage: `url(${backgroundPlaceholder})`}}
      ></div>
      <div
        className="user-img-display"
        style={{ backgroundImage: `url(${user.imageurl})` }}
      ></div>
      <p>
        {user.firstname} {user.lastname}
      </p>
      <p style={{
        fontWeight: "lighter"
      }}>
        {user.headline}
      </p>
    </div>
  )
}

export default ProfileDisplay