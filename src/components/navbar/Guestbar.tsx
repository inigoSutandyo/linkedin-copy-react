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
    <nav>
        <ul>
            <li>
                <Link to={"/"}>
                    LinkedIn
                </Link>
            </li>
        </ul>

      <ul>
        <li>
            <Link to={"/auth/login"}>
                Signin
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

export default Guestbar;
