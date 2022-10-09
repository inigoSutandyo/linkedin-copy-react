import axios from 'axios'
import React, {useEffect} from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { useUser } from '../app/user'
import Navbar from '../components/navbar/Navbar'
import { removeNotification, setNotifications } from '../features/notification/notificationSlice'
import { ApiURL } from '../utils/Server'

import '../styles/components/user.scss'
import '../styles/pages/layout.scss'
import NotificationComponent from '../components/notification/NotificationComponent'
import Footer from './Footer'

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
  
  const handleCloseNotification = (id: number) => {
    console.log(id)
    axios.delete(ApiURL("/notifications/remove"), {
        withCredentials: true,
        params: {
            id: id
        }
    })
    .then((response) => {
      dispatch(removeNotification(id))
      console.log(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  return (
    <div className='main-page-layout'>
        <Navbar/>
        <div className='d-flex flex-row layout-page main-body'>
            <div className='layout-side'>
              Your Notifications
            </div>
            <div className='layout-main'>
              {notifications.map((n) => (
                <NotificationComponent notif={n} key={n.ID} handleCloseNotification={handleCloseNotification}/>
              ))}
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Notification