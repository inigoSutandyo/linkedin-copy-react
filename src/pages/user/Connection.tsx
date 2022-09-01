import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useUser } from '../../app/user';
import Invites from '../../components/connection/Invites';
import Navbar from '../../components/navbar/Navbar';
import UserComponent from '../../components/user/UserComponent';
import "../../styles/pages/connection.css"
type Props = {}

const Connection = (props: Props) => {
  useUser()
  const user = useAppSelector((state) => state.user.user);
  const [invitations, setInvitations] = useState<Array<Invitation>>()
  const [connections, setConnections] = useState<Array<User>>()
  const [display, setDisplay] = useState("")
  useEffect(() => {
    if (!user) return

    if (user.invitations && user.invitations.length > 0) {
      setInvitations(user.invitations)
    }

    if (user.connections && user.connections.length > 0) {
      setConnections(user.connections)
    }
    
  
    
  }, [user])
  
  const removeInvitation = (id: number) => {
    if (!user) return
    if (!user.invitations) return
    if (user.invitations.length == 0) return
    const res = user.invitations.filter((inv) => {
      return inv.ID != id
    })
    setInvitations(res)
  }

  return (
    <>
      <Navbar/>
      <div className='connection-layout'>
        <ul className='navigation'>
          <li onClick={() => setDisplay("Connection")}>
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
            {display == "Connection" ? (
              <div>
                {connections && connections.length > 0 ? (
                  connections.map((c) => (
                    <div className='d-flex flex-column justify-center my-3 w-8' key={c.ID} style={{
                      border: "solid 1px rgb(221, 221, 221)",
                      padding: "12px"
                    }}>
                      <div className='d-flex flex-row justify-between align-center'>
                        <UserComponent user={c}/> 
                        <div>
                          <button className='btn-primary-outline mx-1' style={{
                              borderRadius: "32px"
                          }}>Remove</button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>
                    No connections yet..
                  </div>
                )}
              </div>
            ) : (
              <>
                {invitations && invitations.length > 0 ? (
                  invitations.map((i) => (
                    <Invites invite={i} key={i.ID} removeInvitation={removeInvitation}/>
                  ))
                ) : (
                  <div>
                    No invitations yet..
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Connection