import React from 'react'
import { Link } from 'react-router-dom'
import iconImg from "../assets/logos/linkedin_main.png"
type Props = {}

const Footer = (props: Props) => {
  return (
    <div className="footer d-flex justify-center">
        <ul className="footer-list">
          <li>
            <img style={{
              maxWidth: "34px"
            }} src={iconImg} alt="" />
          </li>
          <li>
            <Link to={"/"} className="footer-link">
              Home
            </Link>
          </li>
          <li>
            <a href="https://www.linkedin.com/legal/user-agreement?trk=d_checkpoint_lg_consumerLogin_ft_user_agreement" className="footer-link">
              User Agreement
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/legal/privacy-policy?trk=d_checkpoint_lg_consumerLogin_ft_privacy_policy" className="footer-link">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/help/linkedin/answer/a403269?lang=en&trk=d_checkpoint_lg_consumerLogin_ft_community_guidelines" className="footer-link">
              Community Guidelines
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/legal/cookie-policy?trk=d_checkpoint_lg_consumerLogin_ft_cookie_policy" className="footer-link">
              Cookie Policy
            </a>
          </li>
        </ul>
      </div>
  )
}

export default Footer