import axios from 'axios';
import React, { SyntheticEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Guestbar from '../../components/navbar/Guestbar';
import "../../styles/forms/form.scss";
import { ApiURL } from '../../utils/Server';
import Footer from '../Footer';
type Props = {}

const ForgetPassword = (props: Props) => {
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    function handleBack() {
        navigate('/auth/login')
    }

    const checkEmail = () => {
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
            const target = document.getElementById('input') as HTMLInputElement
            target.value = ""
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
                                    // console.log(email)
                                }}
                            />
                        </div>

                        <div className="input-container">
                            <button className='btn-primary' onClick={checkEmail}>Reset Password</button>
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
                    </form>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default ForgetPassword