import axios from "axios";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/forms/form.scss";
import Guestbar from "../../components/navbar/Guestbar";
import FormLine from "../../components/util/FormLine";
import { ApiURL } from "../../utils/Server";
import { checkAuth, useAuth } from "../../utils/Auth";
import ErrorComponent from "../../components/util/ErrorComponent";
import { useGoogleLogin, GoogleLogin, CredentialResponse  } from "@react-oauth/google";
import { decodeToken } from "react-jwt";
import Footer from "../Footer";

interface Props {}

interface Google {
  email: string
  given_name: string
  family_name: string
  picture: string
}

const Login = (props: Props) => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const auth = useAuth()

  useEffect(() => {
    console.log(auth)
    if (auth == undefined) return

    if (auth == true) {
      navigate('/')
      return
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
        ApiURL("/auth/login"),
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
          // window.location.reload()
        } else {
          setError(msg);
        }
      })
      .catch(function (error) {
        setError(error.response.data.message);
      })
  };

  const loginGoogle = (credentialResponse: CredentialResponse) => {
    console.log(credentialResponse);
    if (credentialResponse.credential) {

      const user = decodeToken(credentialResponse.credential) as Google
      if (!user) return
      const axiosConfig = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      axios.post(ApiURL("/auth/google/login"),  {
        email: user.email,
        given_name: user.given_name,
        family_name: user.family_name,
        picture: user.picture
      }, axiosConfig)
      .then((response) => {
        console.log(response.data)
        navigate('/')
      })
      .catch((error) => {
        console.log(error.response.data)
      })
    }
  }
  

  return (
    <div className="d-flex flex-column justify-between" style={{
      minHeight: "100vh"
    }}>
      <div style={{
        alignSelf: "flex-start"
      }}>
        <Guestbar/>
      </div>
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
            </div>
            <Link to={"/auth/forget"} className="text-link">
              Forgot password?
            </Link>
            {error !== "" ? <ErrorComponent message={error}/> : <></>}
            <div className="input-container">
              <input type="submit" value="Sign In" className="btn-primary" style={{
                width: "100%",
                borderRadius: "32px"
              }}/>
            </div>
            <FormLine/>
            <div className="input-container">
              
              <GoogleLogin
                onSuccess={loginGoogle}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
            </div>
          </form>
        </div>
        <div className="my-3">
            New to Linked In? <Link to={"/auth/register"} className="text-link">
              Join now
            </Link>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Login;
