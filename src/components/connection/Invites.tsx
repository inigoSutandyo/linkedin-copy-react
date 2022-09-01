import PostUser from "../post/PostUser"
import UserComponent from "../user/UserComponent"

type Props = {
    invite: Invitation
}

const Invites = (props: Props) => {
  return (
    <div>
        <UserComponent user={props.invite.source}/>
    </div>
  )
}

export default Invites