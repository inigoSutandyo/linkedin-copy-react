import axios from 'axios';
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useUser } from '../../app/user';
import Following from '../../components/connection/Following';
import Invites from '../../components/connection/Invites';
import Recommendation from '../../components/connection/Recommendation';
import Navbar from '../../components/navbar/Navbar';
import UserComponent from '../../components/user/UserComponent';
import "../../styles/pages/connection.scss"
import { ApiURL } from '../../utils/Server';
import Footer from '../Footer';
type Props = {}

const Connection = (props: Props) => {
  useUser()
  const user = useAppSelector((state) => state.user.user);
  const [invitations, setInvitations] = useState<Array<Invitation>>()
  const [connections, setConnections] = useState<Array<User>>()
  const [fixedConnections, setFixedConnections] = useState<Array<User>>()
  const [display, setDisplay] = useState("Invitations")
  const [search, setSearch] = useState("")

  useEffect(() => {
    if (!user) return

    if (user.invitations && user.invitations.length > 0) {
      setInvitations(user.invitations)
    }

    if (user.connections && user.connections.length > 0) {
      setConnections(user.connections)
      setFixedConnections(user.connections)
    }
    
  }, [user])
  
  useEffect(() => {
    if (search == "") {
      setConnections(fixedConnections)
    }

    const f = fixedConnections?.filter((u) => {
      return u.firstname.startsWith(search)
    })

    setConnections(f)
  }, [search])
  

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
    <div className='main-page-layout'>
      <Navbar/>
      <div className='connection-layout main-body'>
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
          <li onClick={() => setDisplay("Following")}>
            Following
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
                  <>
                    <div>
                      <input type="search" name="search" id="search" onChange={(e: SyntheticEvent) => {
                        const input = e.target as HTMLInputElement
                        setSearch(input.value.trim())
                      }} />
                    </div>
                    {connections.map((c) => (
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
                    ))}
                  </>
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
            ) : display == "Following" ? (
              <>
                <Following/>
              </>
            ) : <></>}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Connection