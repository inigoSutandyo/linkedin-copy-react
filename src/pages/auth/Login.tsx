import React, { SyntheticEvent } from 'react'
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
          Login
        </h1>
        <form action="POST" onSubmit={submit}>
          <div className='input-container'>
            <label htmlFor='email'>
              Email
            </label>
            <input type="email" name="email" id="email" />
          </div>

          <div className='input-container'>
            <label htmlFor='password'>
              Password
            </label>
            <input type="password" name="password" id="password" />
          </div>
          <div className='input-container'>
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login