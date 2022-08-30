import axios from "axios";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { generatePath, Link, useNavigate } from "react-router-dom";
import '../../styles/components/nav.css'
import '../../styles/forms/form.css'
import iconImg from "../../assets/logos/linkedin_secondary.png"
import { ApiURL } from "../../utils/Server";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logoutUser } from "../../features/user/userSlice"
import { FaBell, FaBriefcase, FaHome, FaRegCommentDots, FaUserFriends } from "react-icons/fa";
type Props = {};



const Navbar = (props: Props) => {

  const navigate = useNavigate()

  const [queryParam, setQueryParam] = useState("")

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
      navigate("/")
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
              <input type="text" name="" id="" placeholder="Search" className="search-nav" onKeyDown={search} onChange={onChange}/>
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
                <FaUserFriends/>
              </Link>
            </li>
            <li className="list-hover mx-2 color-black">
              <Link to={"/"}>
                <FaBriefcase/>
              </Link>
            </li>
            <li className="list-hover mx-2 color-black">
              <Link to={"/"}>
                <FaRegCommentDots/>
              </Link>
            </li>
            <li className="list-hover mx-2 color-black">
              <Link to={"/"}>
                <FaBell/>
              </Link>
            </li>
            <li className="list-hover mx-2 color-black">
              <Link to={"/profile"}>
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
