import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useUser } from '../../app/user';
import Invites from '../../components/connection/Invites';
import Navbar from '../../components/navbar/Navbar';

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
  

  return (
    <>
      <Navbar/>
      {invitations && invitations.length > 0 ? (
        invitations.map((i) => (
          <Invites invite={i} key={i.ID}/>
        ))
      ) : <></>}
    </>
  )
}

export default Connection