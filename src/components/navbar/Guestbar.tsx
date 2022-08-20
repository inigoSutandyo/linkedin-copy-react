import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import '../../styles/components/nav.css'
import { useIsAuth } from "../../utils/Auth";
type Props = {};

const Guestbar = (props: Props) => {
  const auth = useIsAuth()
  const navigate = useNavigate()

  return (
    <nav className="bg-light">
        <ul>
            <li>
                <Link to={"/"} className="color-blue">
                    LinkedIn
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
