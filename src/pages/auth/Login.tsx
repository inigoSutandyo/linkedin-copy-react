import React, { SyntheticEvent } from 'react'
import { Link } from 'react-router-dom';
import '../../styles/auth/auth.css'
interface Props {}

const Login = (props: Props) => {

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
        <h1 className='form-title'>
          Sign In
        </h1>
        <label className='form-subtitle'>Stay updated on your professional world</label>
        <form action="POST" onSubmit={submit}>
          <div className='input-container'>
            <input type="email" name="email" id="email" placeholder='Email' className='form-input-primary'/>
          </div>

          <div className='input-container'>
            <input type="password" name="password" id="password" placeholder='Password' className='form-input-primary'/>
            <Link to={"/"} className="form-link">Forgot your password?</Link>
          </div>
          <div className='input-container'>
            <input type="submit" value="Sign In" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login