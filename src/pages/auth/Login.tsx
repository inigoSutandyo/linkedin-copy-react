import axios from "axios";
import React, { SyntheticEvent, useEffect, useState } from "react";
import Cookies from 'universal-cookie'
import { Link, useNavigate } from "react-router-dom";
import Error from "../../components/Error";
import "../../styles/forms/form.css";
import { useIsAuth } from "../../utils/Auth";
interface Props {}

const Login = (props: Props) => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const auth = useIsAuth()

  useEffect(() => {
    if (auth === null) return

    if (auth == true) {
      navigate('/')
    }
  }, [auth])
  

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
      password,
    });

    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    
    axios
      .post(
        "http://localhost:8080/api/auth/login",
        {
          email: email,
          password: password,
        },
        axiosConfig
      )
      .then((response) => {
        const msg = response.data.message;
        const isError = response.data.isError;
        if (!isError) {
          navigate("/");
        } else {
          setError(msg);
        }
      })
      .catch(function (error) {
        setError(error.response.data.message);
        
      })
      .then(function (response) {

      });
  };

  return (
    <div className="center-container">
      <div className="input-form">
        <h1 className="form-title">Sign In</h1>
        <label className="form-subtitle">
          Stay updated on your professional world
        </label>
        <form action="POST" onSubmit={submit}>
          <div className="input-container">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className="form-input-primary"
              autoComplete="on"
            />
          </div>

          <div className="input-container">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="form-input-primary"
              autoComplete="on"
            />
            <Link to={"/auth/forget"} className="form-link">
              Forgot your password?
            </Link>
          </div>
          {error !== "" ? <Error message={error}/> : <></>}
          <div className="input-container">
            <input type="submit" value="Sign In" className="btn-primary" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
