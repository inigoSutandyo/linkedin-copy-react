import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'

type Props = {}

const ProfileNotFound = (props: Props) => {
  const navigate = useNavigate()
  return (
    <>
        <Navbar/>
        <div style={{
            display: "flex",
            alignItems: "center",
            margin: "32px",
            flexDirection: "column"
        }}>
            <h3>User Not Found</h3>
            <button className='btn-primary' style={{
                marginTop: "25px"
            }} onClick={() => {
                navigate("/")
            }}>Back</button>
        </div>
    </>
  )
}

export default ProfileNotFound