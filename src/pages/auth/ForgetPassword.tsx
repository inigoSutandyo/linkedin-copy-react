import axios from 'axios';
import React, { SyntheticEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "../../styles/forms/form.scss";
import { ApiURL } from '../../utils/Server';
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

        axios.get(ApiURL("/user/email"), {
            params: {
                email: email
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
        <div className='center-container'>
            <div className="input-form">
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
                                console.log(email)
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
    )
}

export default ForgetPassword