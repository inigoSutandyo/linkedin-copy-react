import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useUser } from '../../app/user';
import Invites from '../../components/connection/Invites';
import Navbar from '../../components/navbar/Navbar';
import "../../styles/pages/connection.css"
type Props = {}

const Connection = (props: Props) => {
  useUser()
  const user = useAppSelector((state) => state.user.user);
  const [invitations, setInvitations] = useState<Array<Invitation>>()
  useEffect(() => {
    if (!user) return
    if (!user.invitations) return
    if (user.invitations.length == 0) return
    setInvitations(user.invitations)
  }, [user])
  
  const removeInvitation = (id: number) => {
    if (!user) return
    if (!user.invitations) return
    if (user.invitations.length == 0) return
    user.invitations.filter((inv) => {
      return inv.ID != id
    })
  }

  return (
    <>
      <Navbar/>
      <div className='connection-layout'>
        <ul className='navigation'>
          <li>
            Connection
          </li>
          <li>
            Contacts
          </li>
          <li>
            People | Follow
          </li>
          <li>
            Groups
          </li>
          <li>
            Events
          </li>
          <li>
            Pages
          </li>
          <li>
            Newsletter
          </li>
          <li>
            Hashtags
          </li>
        </ul>

        <div className='connection-content-container'>
          <div className='connection-content'>  
            {invitations && invitations.length > 0 ? (
              invitations.map((i) => (
                <Invites invite={i} key={i.ID} removeInvitation={removeInvitation}/>
              ))
            ) : (
              <div>
                No invitations yet..
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Connection