import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import '../../styles/components/nav.css'
import { useIsAuth } from "../../utils/Auth";
import iconImg from "../../assets/logos/linkedin_main.png"
type Props = {};

const Guestbar = (props: Props) => {
  const auth = useIsAuth()
  const navigate = useNavigate()

  return (
    <nav className="my-2" style={{
      marginLeft: "30px"
    }}>
        <ul>
            <li>
                <Link to={"/"} className="color-blue">
                  <img className="nav-logo-huge" src={iconImg} alt="" />
                </Link>
            </li>
        </ul>
    </nav>
  );
};

export default Guestbar;
