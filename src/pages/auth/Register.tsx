import React, { SyntheticEvent } from 'react'
import { Link } from 'react-router-dom';

type Props = {}

const Register = (props: Props) => {
    const submit = (e: SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            email: { value: string };
            password: { value: string };
        };
        const email = target.email.value;
        const password = target.password.value; 
        console.log({
            email,
            password
        })
    }
    
    return (
    <div className='center-container'>
        <div  className='input-form'>
            <form action="POST" onSubmit={submit}>
                <div className='input-container' style={{marginTop: "16px"}}>
                    <label htmlFor="email" className='form-label-light'>Email</label>
                    <input type="email" name="email" id="email" className='form-input-secondary'/>
                </div>

                <div className='input-container'>
                    <label htmlFor="password" className='form-label-light'>Password (6 or more characters)</label>
                    <input type="password" name="password" id="password" className='form-input-secondary'/>
                </div>
                <div className='input-container'>
                    
                </div>
                <div className='input-container'>
                    <input type="submit" value="Agree & Join" />
                </div>
            </form>
        </div>
    </div>
    )
}

export default Register