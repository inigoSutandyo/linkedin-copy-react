
type Props = {
    invite: Invitation
}

const Invites = (props: Props) => {
  return (
    <div>
        <p>
            {props.invite.source.firstname} {props.invite.source.lastname}
        </p>
    </div>
  )
}

export default Invites