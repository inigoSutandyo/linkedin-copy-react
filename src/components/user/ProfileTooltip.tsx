import React, { useState, useEffect } from 'react'
import "../../styles/components/user.scss"
import placheholderProfile from '../../assets/placeholders/user.png'
import { Link } from 'react-router-dom'
import ExperienceComponent from './experience/ExperienceComponent';
import axios from 'axios';
import { ApiURL } from '../../utils/Server';

type Props = {
  user: User;
};

const ProfileTooltip = (props: Props) => {
  const [imageUrl, setImageUrl] = useState("");
  const [experiences, setExperiences] = useState<Array<Experience>>()

  useEffect(() => {
    const user = props.user;
    if (!user.imageurl || user.imageurl == "") {
      setImageUrl(placheholderProfile);
    } else {
      setImageUrl(user.imageurl);
    }
    // console.log(user.experiences)
    
    fetchExperience()
  }, [props.user]);

  const fetchExperience = () => {
    axios.get(ApiURL('/user/experiences'), {
        params: {
            id: props.user.ID
        }
    })
    .then((response) => {
        setExperiences(response.data.experiences)
    })
    .catch((error) => {
        console.log(error.response.data)
    })
  }

  return (
    <div className='d-flex flex-column'>
        <div className='d-flex flex-row align-center'>
            <div className='user-component-image' style={{
                backgroundImage: `url(${imageUrl})`,
            }}>
            </div>
            <div className='user-component-text'>
                <div className='user-component-header'>
                    {props.user.firstname} {props.user.lastname}
                </div>
                <div className='user-component-subheader'>
                    {props.user.email}
                </div>
                <div className='user-component-subheader'>
                    {props.user.headline}
                </div>
            </div>
        </div>
        <div className='d-flex flex-column'>
            <div className='user-component-header'>
                Experiences
            </div>
            <div>
                {experiences ? (
                    experiences.map((e) => (
                    <div key={e.ID}>
                        <ExperienceComponent experience={e}/>
                    </div>
                    ))
                ) : <></>}
            </div>
        </div>
    </div>
    // <Link to={`/profile/${props.user.ID}`}>
    // </Link>
  )
};

export default ProfileTooltip;
