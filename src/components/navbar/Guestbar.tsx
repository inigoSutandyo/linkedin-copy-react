import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import '../../styles/components/nav.css'
import { useIsAuth } from "../../utils/Auth";
import iconSvg from "../../assets/logos/linkedin_main.png"
type Props = {};

const Guestbar = (props: Props) => {
  const auth = useIsAuth()
  const navigate = useNavigate()

  return (
    <nav>
        <ul>
            <li>
                <Link to={"/"} className="color-blue">
                  <img className="nav-logo" src={iconSvg} alt="" />
                </Link>
            </li>
        </ul>

      <ul>
        <li>
            <Link to={"/auth/login"} className="color-blue">
                Signin
            </Link>
        </li>
        <li>
            <Link to={"/auth/register"} className="color-blue">
                Register
            </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Guestbar;
