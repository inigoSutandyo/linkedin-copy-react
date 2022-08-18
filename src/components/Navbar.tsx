import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styles/nav.css'
import { useIsAuth } from "../utils/Auth";
type Props = {};

const Navbar = (props: Props) => {
  const auth = useIsAuth()
  const navigate = useNavigate()
  function logout() {
    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    
    axios.post(
      "http://localhost:8080/api/auth/logout", {},
      axiosConfig
    )
    .then((response) => {
      console.log(response.data)
      navigate("/")
    })
    .catch(function (error) {
      console.log(error.response.data);
      
    })
    .then(function (response) {

    });
  }

  return (
    <nav>
      <ul>
        <li>
          <Link to={"/"}>
            Home
          </Link>
        </li>
        <li>
          <Link to={"/"}>
            Profile
          </Link>
        </li>
      </ul>
      <ul>
        {auth ? (
          <li>
            <a href="" onClick={logout}>
              Logout
            </a>
          </li>
        ) : (
          <>
            <li>
              <Link to={"/auth/login"}>
                Login
              </Link>
            </li>
            <li>
              <Link to={"/auth/register"}>
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
