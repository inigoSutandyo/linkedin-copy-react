import axios from "axios"
import { useAppSelector } from "../../app/hooks"
import { ApiURL } from "../../utils/Server"
import UserComponent from "../user/UserComponent"

type Props = {
    invite: Invitation
    removeInvitation: any
}

const Invites = (props: Props) => {
  const user = useAppSelector((state) => state.user.user);
  const acceptInvitation = () => {
    const source = props.invite.source
    axios.post(ApiURL('/user/invite/accept'), {}, {
      withCredentials: true,
      params: {
        source: source.ID,
        destination: user.ID,
      }
    })
    .then((response) => {
      console.log(response.data)
      props.removeInvitation(props.invite.ID)
    })
    .catch((error) => {
      console.log(error.response.data)
    })
  }

  const ignoreInvitation = () => {
    const source = props.invite.source
    axios.post(ApiURL('/user/invite/ignore'), {}, {
      withCredentials: true,
      params: {
        source: source.ID,
        destination: user.ID,
      }
    })
    .then((response) => {
      console.log(response.data)
      props.removeInvitation(props.invite.ID)
    })
    .catch((error) => {
      console.log(error.response.data)
    })
  }
  return (
    <div className="d-flex flex-row align-center justify-between">
        <UserComponent user={props.invite.source}/>
        <div>
            <button className='btn-primary mx-1' style={{
                borderRadius: "32px"
            }} onClick={acceptInvitation}>Accept</button>
            <button className='btn-primary-outline mx-1' style={{
                borderRadius: "32px"
            }} onClick={ignoreInvitation}>Ignore</button>
        </div>
    </div>
  )
}

export default Invites