import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import '../../styles/components/nav.css'
import { useIsAuth } from "../../utils/Auth";
import iconImg from "../../assets/logos/linkedin_main.png"
import { ApiURL } from "../../utils/Server";
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
      ApiURL("/auth/logout"), {},
      axiosConfig
    )
    .then((response) => {
      console.log(response.data)
      navigate("/auth/login")
    })
    .catch(function (error) {
      console.log(error.response.data);
      
    })
    .then(function (response) {

    });
  }

  return (
    <nav className="bg-blue py-3">
      <ul className="mx-4">
        <li className="list-hover mx-2">
          <Link to={"/"}>
            <img className="nav-logo" src={iconImg} alt="" />
          </Link>
        </li>
        <li className="list-hover mx-2">
          <Link to={"/"}>
            Profile
          </Link>
        </li>
      </ul>
      <ul className="mx-4">
        {auth ? (
          <li className="list-hover mx-2">
            <a href="" onClick={logout}>
              Logout
            </a>
          </li>
        ) : (
          <>
            <li className="list-hover mx-2">
              <Link to={"/auth/login"}>
                Login
              </Link>
            </li>
            <li className="list-hover mx-2">
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
