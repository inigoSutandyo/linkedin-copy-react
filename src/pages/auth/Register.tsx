import React, { SyntheticEvent, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import "../../styles/forms/form.scss";
import Guestbar from '../../components/navbar/Guestbar';
import FormLine from '../../components/util/FormLine';
import { ApiURL } from '../../utils/Server';
import { checkAuth, useAuth } from '../../utils/Auth';
import AuthFooter from '../Footer';
import Footer from '../Footer';
import ErrorComponent from '../../components/util/ErrorComponent';
type Props = {}

const Register = (props: Props) => {
    const [error, setError] = useState("")

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


    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    };

    const submit = (e: SyntheticEvent) => {
        e.preventDefault();
        setError('')
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
        
        axios.post(ApiURL("/auth/register"), {
            email: email,
            password: password,
        
        }, axiosConfig).then((response) => {
            console.log(response.data)
            const msg = response.data.message
            if (msg === "success") {
                navigate('/auth/login')
            } else {
                setError(msg)
            }
            
        }).catch(function (error) {
            console.log(error);
            setError(error.response.data.message)
        }).then(function (response) {
            // always executed
        
        });
    }
    
    return (
        <div className="d-flex flex-column justify-between" style={{
            minHeight: "100vh"
        }}> 
            <Guestbar/> 
            <div className='center-container'>
                <h1 style={{fontWeight : "lighter" }}>
                    Make the most of your professional life.
                </h1>
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
                        {error != '' ? (
                            <ErrorComponent message={error}/>
                        ) : <></>}
                        <div className='input-container'>
                            <input type="submit" value="Agree & Join" className="btn-primary" style={{
                                width: "100%",
                                borderRadius: "32px"
                            }}/>
                        </div>
                    </form>
                    <FormLine/>
                    <div className="input-container">
                        <button className="btn-primary-outline"  style={{
                            width: "100%",
                            borderRadius: "32px"
                        }}>
                            Continue with Google
                        </button>
                    </div>
                    <div className="my-3" style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <div style={{
                            padding: "4px 8px 4px 8px;"
                        }}>
                            Already on Linked In? 
                        </div>
                        <div>
                            <Link to={"/auth/login"} className="text-link">
                                Sign in
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Register