import axios from 'axios'
import React, {useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Guestbar from '../../components/navbar/Guestbar'
import { ApiURL } from '../../utils/Server'
import Footer from '../Footer'

type Props = {}

const ResetPassword = (props: Props) => {
  const {token} = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    console.log(token)
  }, [])
  

  const resetPassword = () => {
    const password = (document.getElementById('password') as HTMLInputElement).value.trim()
    const confirm = (document.getElementById('confirm') as HTMLInputElement).value.trim()

    if (!password || !confirm) {
        return
    }

    if (password != confirm) {
        return
    }

    axios.post(ApiURL("/auth/reset"), {
        token: token,
        password: password,
    })
    .then((response) => {
        console.log(response.data)
        navigate('/auth/login')
    })
    .catch((error) => {
        console.log(error.response.data)
    })
  }
  return (
    <div className="d-flex flex-column justify-between" style={{
        minHeight: "100vh"
    }}>
        <Guestbar/>
        <div className='center-container'>
            <div className="input-form">
                <h1 className="form-title">Forgot password?</h1>
                <label className="form-subtitle">
                    Reset password in two quick steps
                </label>
                <div className="input-container">
                    <input
                        type="password"
                        name="text"
                        id="password"
                        placeholder="New Password"
                        className="form-input-primary"
                    />
                </div>
                <div className="input-container">
                    <input
                        type="password"
                        name="text"
                        id="confirm"
                        placeholder="Confirm Password"
                        className="form-input-primary"
                    />
                </div>

                <div className="input-container">
                    <button className='btn-primary' onClick={resetPassword}>Reset Password</button>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default ResetPassword