import React from 'react'
import { useAppSelector } from '../../app/hooks'

type Props = {}

const ProfileDisplay = (props: Props) => {
  const user = useAppSelector((state) => state.user.user)
  
  return (
    <div>
      <p>
        {user.email}
      </p>
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