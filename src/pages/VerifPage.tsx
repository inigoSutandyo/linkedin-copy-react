import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Guestbar from '../components/navbar/Guestbar'
import { ApiURL } from '../utils/Server'
import Footer from './Footer'

type Props = {}

const VerifPage = (props: Props) => { 
  const [flag, setFlag] = useState(false) 
  const {token} = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    axios.post(ApiURL("/auth/verify"), {}, {
        params: {
            token: token
        }
    })
    .then((response) => {
        console.log(response.data)
        navigate('/auth/login')
    })
    .catch((error) => {
        console.log(error.response.data)
        setFlag(false)
    })

  }, [])
  

  return (
    <div className='main-page-layout'>
        <Guestbar/>
        <div className='main-body d-flex justify-center'>
            <h3>Verifying your email.....</h3>
        </div>
        <Footer/>
    </div>
  )
}

export default VerifPage