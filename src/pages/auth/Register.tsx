import React, { SyntheticEvent, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useIsAuth } from '../../utils/Auth';

type Props = {}

const Register = (props: Props) => {
    const [error, setError] = useState("")

    const navigate = useNavigate()
    const auth = useIsAuth()

    useEffect(() => {
        if (auth === null) return
        if (auth == true) {
            navigate('/')
        }
    }, [auth])

    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    };

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
        
        axios.post('http://localhost:8080/api/auth/register', {
            email: email,
            password: password,
        
        }, axiosConfig).then((response) => {
            const msg = response.data.message
            if (msg === "success") {
                navigate('/auth/login')
            } else {
                setError(msg)
            }
            
        }).catch(function (error) {
            console.log(error);
            setError(error)
        }).then(function (response) {
            // always executed
        
        });
    }
    
    return (
        <div className='center-container'>
            <div  className='input-form'>
                <form action="POST" onSubmit={submit}>
                    <div className='input-container' style={{marginTop: "16px"}}>
                        <label htmlFor="email" className='form-label-light'>Email</label>
                        <input type="email" name="email" id="email" className='form-input-secondary' autoComplete="on"/>
                    </div>

                    <div className='input-container'>
                        <label htmlFor="password" className='form-label-light'>Password (6 or more characters)</label>
                        <input type="password" name="password" id="password" className='form-input-secondary' autoComplete="on"/>
                    </div>
                    <div className='input-container'>
                        
                    </div>
                    <div className='input-container'>
                        <input type="submit" value="Agree & Join" className="btn-primary"/>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register