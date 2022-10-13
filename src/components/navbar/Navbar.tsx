import axios from "axios";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../../styles/components/nav.scss'
import '../../styles/forms/form.scss'
import iconImg from "../../assets/logos/linkedin_secondary.png"
import { ApiURL } from "../../utils/Server";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logoutUser } from "../../features/user/userSlice"
import { FaBell, FaBriefcase, FaHome, FaRegCommentDots, FaUserFriends } from "react-icons/fa";
import { FiMenu } from 'react-icons/fi'
import { IconContext } from "react-icons";
import { googleLogout } from "@react-oauth/google";
import { Cookies } from 'react-cookie'
import { BsMoon, BsSun } from "react-icons/bs";
import { setTheme } from "../../features/theme/themeSlice";

type Props = {};

const Navbar = (props: Props) => {
  const cookie = new Cookies()
  const navigate = useNavigate()

  const [queryParam, setQueryParam] = useState("")  

  const auth = useAppSelector((state) => state.user.isSignedIn)
  const user = useAppSelector((state) => state.user.user);
  const theme = useAppSelector((state) => state.theme);

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
      cookie.remove('auth')
      if (response.data.isgoogle) {
        googleLogout()
      }
      dispatch(logoutUser())
      navigate("/auth/login")
    })
    .catch(function (error) {
      console.log(error.response.data);
      
    })
    .then(function (response) {
    });
  }

  const onChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement
    setQueryParam(target.value)
  }

  function search(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key != "Enter") return 
    if (queryParam == "") return
    navigate(`/search/${queryParam}`)
    window.location.reload()
  }

  const changeTheme = (e: SyntheticEvent) => {
    const target = document.getElementById("theme") as HTMLInputElement
    if (target.checked == true) {
      dispatch(setTheme("dark"))
    } else {
      dispatch(setTheme("light"))
    }
  }


  return (
    <nav className="py-3 bg-white navbar">
      <div className="nav-main">
        <div>
          <ul className="navbar-ul">
            <li className="mx-2 color-black">
              <Link to={"/"}>
                <img className="nav-logo-small" src={iconImg} alt="" />
              </Link>
            </li>
            <li className="list-hover mx-2 color-black">
              <input type="text" name="" id="" placeholder="Search" className="search-nav" onKeyDown={search} onChange={onChange}/>
            </li>
            <li className="list-hover mx-2 pointer-cursor">
              <label htmlFor="theme" onClick={changeTheme}>
                <IconContext.Provider value={{
                  size: "25px"
                }} >
                  {theme == "light" ? (
                    <BsSun/>
                  ) : (
                    <BsMoon/>
                  )}
                </IconContext.Provider>
              </label>
              <input type="checkbox" name="theme" id="theme"  style={{
                display: "none"
              }}/>
            </li>
          </ul>
        </div>
        <label htmlFor="check" className="toggle">
          <IconContext.Provider value={{
            size: "25px"
          }}>
            < FiMenu/>
          </IconContext.Provider>
        </label>
        
      </div>
      <input type="checkbox" id="check" />
      <div className="nav-drop" id="nav-drop">
        <ul className="navbar-ul drop-ul">
          <li className="list-hover mx-2 color-black nav-link">
            <Link to={"/"}>
              <IconContext.Provider value={{
                size: "22px"
              }}>
                <FaHome/>
              </IconContext.Provider>
              Home
            </Link>
          </li>
          <li className="list-hover mx-2 color-black nav-link">
            <Link to={"/connection"}>
              <IconContext.Provider value={{
                size: "22px"
              }}>
                <FaUserFriends/>
              </IconContext.Provider>
              Connections
            </Link>
          </li>
          <li className="list-hover mx-2 color-black nav-link">
            <Link to={"/jobs"}>
              <IconContext.Provider value={{
                size: "22px"
              }}>
                <FaBriefcase/>
              </IconContext.Provider>
              Jobs
            </Link>
          </li>
          <li className="list-hover mx-2 color-black nav-link">
            <Link to={"/message"}>
            <IconContext.Provider value={{
                size: "22px"
              }}>
                <FaRegCommentDots/>
              </IconContext.Provider>
              Messages
            </Link>
          </li>
          <li className="list-hover mx-2 color-black nav-link">
            <Link to={"/notifications"}>
              <IconContext.Provider value={{
                  size: "22px"
                }}>
                <FaBell/>
              </IconContext.Provider>
              Notifications
            </Link>
          </li>
          <li className="list-hover mx-2 color-black nav-link">
            <Link to={`/profile/${user.ID}`}>
              <div className='user-nav-image' style={{
                  backgroundImage: `url(${user.imageurl})`,
              }}></div>
              Me
            </Link>
          </li>
          {auth ? (
            <li className="list-hover mx-2 color-black nav-link">
              <a href="" onClick={logout}>
                Logout
              </a>
            </li>
          ) : (
            <>
              <li className="list-hover mx-2 color-black nav-link">
                <Link to={"/auth/login"}>
                  Login
                </Link>
              </li>
              <li className="list-hover mx-2 color-black nav-link">
                <Link to={"/auth/register"}>
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>

      </div>
    </nav>
  );
};

export default Navbar;
