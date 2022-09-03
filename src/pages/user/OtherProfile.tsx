import { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar';
import placeholderProfile from "../../assets/placeholders/user.png";
import placeholderBanner from "../../assets/placeholders/banner.jpg";
import "../../styles/pages/profile.scss";
import axios from 'axios';
import { ApiURL } from '../../utils/Server';
import ErrorPage from '../ErrorPage';
import { useAppSelector } from '../../app/hooks';

interface Props {
    id: string
}

const OtherProfile = (props: Props) => {
    const currentUser = useAppSelector((state) => state.user.user);
    const [user, setUser] = useState<User>()
    const [imageUrl, setImageUrl] = useState(placeholderProfile)
    const [connected, setConnected] = useState(false)
    const [invited, setInvited] = useState(false)

    useEffect(() => {
      axios.get(ApiURL("/user/otherprofile"), {
        params: {
            id: props.id
        }
      })
      .then((response) => {
        setUser(response.data.user)
      })
      .catch((error) => {
        console.log(error)
      })
    }, [])
    

    const checkConnected = () => {
      setConnected(false)
      if (!currentUser.connections) {
        return
      }
      currentUser.connections.forEach((u: User) => {
        if (u.ID == user?.ID) {
          setConnected(true)
        }
      })
    }

    const checkInvited = () => {
      setInvited(false)
      if (!user) return 
      axios.get(ApiURL("/user/invitations"))
      .then((response) => {
        const data = response.data.invitations as Array<Invitation>
        if (data && data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            const element = data[i];
            if (element.destinationid == user.ID) {
              setInvited(true)
            }
            
          }
        }
      })
      .catch((error) => {
        console.log(error.response.data)
      })
    }

    useEffect(() => {
      if (!user)return

      if ( user.imageurl == "" || !user.imageurl || user.imageid == "") {
          user.imageurl = placeholderProfile;
          setImageUrl(placeholderProfile)
      } else {
          setImageUrl(user.imageurl)
      }
      checkConnected()
      checkInvited()

    }, [user, currentUser])
    
    const inviteConnect = () => {
      if (!user) return
      if (!currentUser) return
      if (user.ID < 1) return

      axios.post(ApiURL("/user/invite"), {}, {
        params: {
          source: currentUser.ID,
          destination: user.ID
        }
      })
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error.response.data)
      })

      checkInvited()
    }

    return (
        <>
          {user?.ID == 0 ? (
            <ErrorPage/>
          ) : (
            <div id="profile-page">
              <Navbar />
              <div className="profile-layout">
                <div className="main-container">
                  <div className="main-content">
                    <div
                      className="user-banner"
                      style={{ backgroundImage: `url(${placeholderBanner})` }}
                    ></div>

                    <div
                      className="user-img"
                      style={{ backgroundImage: `url(${imageUrl})` }}
                    ></div>
                    {!connected && !invited ? (
                      <div
                        className="edit-profile"
                      >
                        <button className='btn-primary' style={{
                          borderRadius : "16px"
                        }} onClick={inviteConnect}>Connect</button>
                      </div>
                    ) : invited ? (
                      <div
                        className="edit-profile"
                      >
                        <div className='btn-primary-outline' style={{
                          borderRadius : "16px",
                          cursor: "default"
                        }}>Pending</div>
                      </div>
                    ) : <></>}
                    
                    <div className="p-4">
                      <div className="user-info">
                        <h1>
                          {user?.firstname} {user?.lastname}
                        </h1>
                        <h3>{user?.headline}</h3>
                        <p>{user?.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="secondary-container profile-section">Hello</div>
              </div>
            </div>
          )}
        </>
      );
}

export default OtherProfile