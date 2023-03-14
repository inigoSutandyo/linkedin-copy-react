import axios from 'axios';
import React, { SyntheticEvent, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import ErrorComponent from '../../components/util/ErrorComponent';
import Guestbar from '../../components/navbar/Guestbar';
import "../../styles/forms/form.scss";
import { useAuth } from '../../utils/Auth';
import { ApiURL } from '../../utils/Server';
import Footer from '../Footer';
type Props = {}

const ForgetPassword = (props: Props) => {
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const [sent, setSent] = useState(false)
    const navigate = useNavigate()
    const auth = useAuth()

    useEffect(() => {
        console.log(auth)
        if (auth == undefined) return

        if (auth == true) {
        navigate('/')
        return
        }
    }, [auth])
    
    function handleBack() {
        navigate('/auth/login')
    }

    const checkEmail = () => {
        setError('')
        if (!email.trim()) {
            setError("Email cannot be empty!")
            return
        } 

        axios.post(ApiURL("/auth/forget"), {}, {
            params: {
                email: email
            }
        })
        .then((response) => {
            console.log(response.data)
            setSent(true)
        })
        .catch((error) => {
            console.log(error.response.data)
            setError(error.response.data.message)
        })
    }

    return (
        <div className="d-flex flex-column justify-between" style={{
            minHeight: "100vh"
        }}>
            <Guestbar/>
            <div className='center-container'>
                <div className="input-form align-center">
                    <h1 className="form-title">Forgot password?</h1>
                    <label className="form-subtitle">
                        Reset password in two quick steps
                    </label>
                    <form action="POST" onSubmit={(e: SyntheticEvent) => {
                        e.preventDefault()
                    }}>
                        <div className="input-container">
                            <input
                                type="text"
                                name="text"
                                id="input"
                                placeholder="Email or phone"
                                className="form-input-primary"
                                autoComplete="on"
                                onChange={(e: SyntheticEvent) => {
                                    const target = e.target as HTMLInputElement
                                    setEmail(target.value)
                                    if (sent) {
                                        setSent(false)
                                    }
                                    // console.log(email)
                                }}
                            />
                        </div>
                        {error != "" ? (
                            <ErrorComponent message={error}/>
                        ) : <></>}
                        <div className="input-container">
                            <button className='btn-primary' onClick={checkEmail}>
                                {sent == true ? (
                                    <>
                                        Resend Link
                                    </>
                                ) : 
                                    <>
                                        Reset Password
                                    </>
                                }
                            </button>
                        </div>
                        <div className="input-container">
                            <div style={{
                                display : "flex",
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <label style={{cursor: 'pointer'}} onClick = {handleBack}>Back</label>
                            </div>
                        </div>
                        {sent ? (
                            <div className='d-flex justify-center' style={{
                                textAlign: "center",
                            }}>
                                Reset password link has been sent to your inbox.
                            </div>
                        ) : <></>}
                    </form>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default ForgetPassword