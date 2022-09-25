import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useUser } from '../../app/user';
import Invites from '../../components/connection/Invites';
import Recommendation from '../../components/connection/Recommendation';
import Navbar from '../../components/navbar/Navbar';
import UserComponent from '../../components/user/UserComponent';
import "../../styles/pages/connection.scss"
import { ApiURL } from '../../utils/Server';
type Props = {}

const Connection = (props: Props) => {
  useUser()
  const user = useAppSelector((state) => state.user.user);
  const [invitations, setInvitations] = useState<Array<Invitation>>()
  const [connections, setConnections] = useState<Array<User>>()
  const [display, setDisplay] = useState("Invitations")
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

  const removeConnection = (id: number) => {
    if (!user) return
    if (!connections || connections.length < 1) return
    axios.delete(ApiURL("/user/connection/remove"), {
      params: {
        user: user.ID,
        connect: id,
      }
    })
    .then((response) => {
      console.log(response.data)
      
      const res = connections.filter((c) => {
        return c.ID != id
      })

      setConnections(res)
    })
  }

  return (
    <>
      <Navbar/>
      <div className='connection-layout'>
        <ul className='navigation'>
          <li onClick={() => setDisplay("Connection")}>
            Connection
          </li>
          <li onClick={() => setDisplay("Recommendation")}>
            Recommendation
          </li>
          <li onClick={() => setDisplay("Invitations")}>
            Invites
          </li>
          {/* <li>
            People | Follow
          </li>
          <li>
            Groups
          </li> */}
          {/* <li>
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
          </li> */}
        </ul>

        <div className='connection-content-container'>
          <div className='connection-content'>  
            <div className='d-flex justify-center mb-3 p-3' style={{
              borderBottom: "solid 1px rgb(221, 221, 221)",
            }}>
              <h2>{display}</h2>
            </div>
            {display == "Connection" ? (
              <div>
                {connections && connections.length > 0 ? (
                  connections.map((c) => (
                    <div className='d-flex flex-column justify-center my-3 w-9' key={c.ID} style={{
                      border: "solid 1px rgb(221, 221, 221)",
                      padding: "12px"
                    }}>
                      <div className='d-flex flex-row justify-between align-center'>
                        <UserComponent user={c}/> 
                        <div>
                          <button className='btn-primary-outline mx-1' style={{
                              borderRadius: "32px"
                          }} onClick={() => {removeConnection(c.ID)}}>Remove</button>
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
            ) : display == "Invitations"  ? (
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
            ) : display == "Recommendation" ? (
              <>
                <Recommendation/>
              </>
            ) : <></>}
          </div>
        </div>
      </div>
    </>
  )
}

export default Connection