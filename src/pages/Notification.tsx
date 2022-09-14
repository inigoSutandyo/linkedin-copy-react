import axios from 'axios'
import React, {useEffect} from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { useUser } from '../app/user'
import Navbar from '../components/navbar/Navbar'
import { setNotifications } from '../features/notification/notificationSlice'
import { ApiURL } from '../utils/Server'

type Props = {}

const Notification = (props: Props) => {
  useUser()
  const user = useAppSelector((state) => state.user.user)
  const notifications = useAppSelector((state) => state.notficiation)
  const dispatch = useAppDispatch() 

  useEffect(() => {
    axios.get(ApiURL("/notifications"), {
      withCredentials: true
    })
    .then((response) => {
      dispatch(setNotifications(response.data.notifications))
      console.log(notifications)
    })
    .catch((error) => {
      console.log(error.response.data)
    })
  }, [])
  
  useEffect(() => {
    console.log(notifications)

  }, [notifications])
  

  return (
    <>
        <Navbar/>
        <div className='d-flex flex-row'>
            <div className='notif-side'>

            </div>
            <div className='notif-main'>

            </div>
        </div>
    </>
  )
}

export default Notification