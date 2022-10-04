import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import '../../styles/components/nav.scss'

import iconImg from "../../assets/logos/linkedin_main.png"
type Props = {};

const Guestbar = (props: Props) => {
  return (
    <nav className="my-2" style={{
      marginLeft: "30px"
    }}>
        <ul className="navbar-ul">
            <li className="nav-link">
                <Link to={"/"} className="color-blue">
                  <img className="nav-logo-l" src={iconImg} alt="" />
                </Link>
            </li>
        </ul>
    </nav>
  );
};

export default Guestbar;
