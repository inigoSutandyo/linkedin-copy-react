import React from "react";
import { Link } from "react-router-dom";
import '../styles/nav.css'
type Props = {};

const Navbar = (props: Props) => {
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
      </ul>
    </nav>
  );
};

export default Navbar;
