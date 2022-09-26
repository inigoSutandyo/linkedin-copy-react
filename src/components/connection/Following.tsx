import axios from 'axios';
import React, {useState} from 'react'
import { useAppSelector } from '../../app/hooks';
import { ApiURL } from '../../utils/Server';
import UserComponent from '../user/UserComponent';

type Props = {}

const Following = (props: Props) => {
  const user = useAppSelector((state) => state.user.user);
  const [followed, setFollowed] = useState(true)

  const unfollow = (u: User) => {
    console.log("unfollow")
    axios.delete(ApiURL("/user/unfollow"), {
      withCredentials: true,
      params: {
        follow: u.ID
      }
    })
    .then((response) => {
      console.log(response.data)
      setFollowed(false)
    })
    .catch((error) => {
      console.log(error.response.data)
    })
  }

  const follow = (u: User) => {
    
    axios.post(ApiURL("/user/follow"),{}, {
      withCredentials: true,
      params: {
        follow: u.ID
      }
    })
    .then((response) => {
      console.log(response.data)
      setFollowed(true)
    })
    .catch((error) => {
      console.log(error.response.data)
    })
  }


  return (
    <>
        {user?.followings?.map((r) => (
            <div className='d-flex flex-column justify-center my-3 w-9' key={r.ID} style={{
                border: "solid 1px rgb(221, 221, 221)",
                padding: "12px"
            }}>
                <div className='d-flex flex-row justify-between align-center'>
                    <UserComponent user={r}/> 
                    <div>
                        {followed ? (
                            <button className='btn-primary-outline mx-1' style={{
                                borderRadius: "32px"
                            }} onClick={() => {unfollow(r)}}>Unfollow</button>
                        ) : (
                            <button className='btn-primary mx-1' style={{
                                borderRadius: "32px"
                            }} onClick={() => {follow(r)}}>Follow</button>
                        )}
                    </div>
                </div>
            </div>
        ))}
    </>
  )
}

export default Following