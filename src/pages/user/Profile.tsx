import React from 'react'

type User = {
  firstname: string
  lastname: string
  email: string
  phone: string
}

interface Props {
  user: User
}

const Profile = (props: Props) => {
  console.log(props.user)
  return (
    <>
      {props.user ? (
        <div>
          <p>Email : {props.user.email}</p>
          <p>First Name : {props.user.firstname}</p>
          <p>Last Name : {props.user.lastname}</p>
        </div>
      ) : <p>No user</p>}
    </>
  )
}

export default Profile