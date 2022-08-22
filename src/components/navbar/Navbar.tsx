import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../../styles/components/nav.css'
import '../../styles/forms/form.css'
import iconImg from "../../assets/logos/linkedin_secondary.png"
import { ApiURL } from "../../utils/Server";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logoutUser } from "../../features/user/userSlice"
import { FaHome } from "react-icons/fa";
type Props = {};

const Navbar = (props: Props) => {

  const navigate = useNavigate()
  const auth = useAppSelector((state) => state.user.isSignedIn)
  const dispatch = useAppDispatch() 

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
      dispatch(logoutUser())
      navigate("/auth/login")
    })
    .catch(function (error) {
      console.log(error.response.data);
      
    })
    .then(function (response) {

    });
  }

  return (
    <nav className="py-3 bg-white">
      <div className="nav-main">
        <div>
          <ul className="mx-4">
            <li className="mx-2 color-black">
              <Link to={"/"}>
                <img className="nav-logo-small" src={iconImg} alt="" />
              </Link>
            </li>
            <li className="list-hover mx-2 color-black">
              <input type="text" name="" id="" placeholder="Search" className="search-nav"/>
            </li>
          </ul>
        </div>
        <div>
          <ul className="mx-4">
            <li className="list-hover mx-2 color-black">
              <Link to={"/"}>
                <FaHome/>
              </Link>
            </li>
            <li className="list-hover mx-2 color-black">
              <Link to={"/"}>
                Profile
              </Link>
            </li>
            {auth ? (
              <li className="list-hover mx-2 color-black">
                <a href="" onClick={logout}>
                  Logout
                </a>
              </li>
            ) : (
              <>
                <li className="list-hover mx-2 color-black">
                  <Link to={"/auth/login"}>
                    Login
                  </Link>
                </li>
                <li className="list-hover mx-2 color-black">
                  <Link to={"/auth/register"}>
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
