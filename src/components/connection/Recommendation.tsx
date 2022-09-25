import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../app/hooks'
import { ApiURL } from '../../utils/Server'
import UserComponent from '../user/UserComponent'

type Props = {}

const Recommendation = (props: Props) => { 

  const user = useAppSelector((state) => state.user.user);
  const [recommendation, setRecommendation] = useState<Array<User>>()
  useEffect(() => {
    axios.get(ApiURL('/recommendation'), {
        withCredentials: true
    })
    .then((response) => {
        console.log(response.data)
        setRecommendation(response.data.recommendations)
    })
    .catch((error) => {
        console.log(error.response.data)
    })
  }, [])
  
  const addConnection = (id: number) => {
    axios.post(ApiURL("/user/invite"), {}, {
        params: {
            source: user.ID,
            destination: id
        }
    })
    .then((response) => {
        console.log(response.data)
    })
    .catch((error) => {
        console.log(error.response.data)
    })
  }

  return (
    <>
        {recommendation?.map((r) => (
            <div className='d-flex flex-column justify-center my-3 w-9' key={r.ID} style={{
                border: "solid 1px rgb(221, 221, 221)",
                padding: "12px"
            }}>
                <div className='d-flex flex-row justify-between align-center'>
                    <UserComponent user={r}/> 
                    <div>
                        <button className='btn-primary-outline mx-1' style={{
                            borderRadius: "32px"
                        }} onClick={() => {addConnection(r.ID)}}>Connect</button>
                    </div>
                </div>
            </div>
        ))}
    </>
  )
}

export default Recommendation