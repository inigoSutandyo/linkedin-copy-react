import React, { SyntheticEvent } from 'react'
import { useNavigate } from 'react-router-dom';
import "../../styles/forms/form.css";
type Props = {}

const ForgetPassword = (props: Props) => {

    const navigate = useNavigate()
    function submit(e: SyntheticEvent) {
        
    }

    function handleBack() {
        navigate('/auth/login')
    }
    return (
        <div className='center-container'>
            <div className="input-form">
                <h1 className="form-title">Forgot password?</h1>
                <label className="form-subtitle">
                    Reset password in two quick steps
                </label>
                <form action="POST" onSubmit={submit}>
                    <div className="input-container">
                        <input
                        type="text"
                        name="text"
                        id="input"
                        placeholder="Email or phone"
                        className="form-input-primary"
                        autoComplete="on"
                        />
                    </div>

                    <div className="input-container">
                        <input type="submit" value="Reset Password" className='btn-primary' />
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