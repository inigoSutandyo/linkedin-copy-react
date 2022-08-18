import React from "react";
import { Link } from "react-router-dom";
import '../styles/nav.css'
import { useIsAuth } from "../utils/Auth";
type Props = {};

const Navbar = (props: Props) => {
  const auth = useIsAuth()
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
            <Link to={"/auth/login"}>
              Logout
            </Link>
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
