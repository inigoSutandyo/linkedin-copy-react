import axios from "axios";
import React, { SyntheticEvent, useState } from "react";
import "../../styles/forms/form.css";
import { ApiURL } from "../../utils/Server";
import { useSelector, useDispatch } from 'react-redux' 
import { setUser } from '../../features/user/userSlice'
import { useAppDispatch, useAppSelector } from "../../app/hooks";

interface Props {
}

const ProfileForm = (props: Props) => {

    const [fetching, setFetching] = useState(false)

    const user = useAppSelector((state) => state.user.user)
    const dispatch = useAppDispatch() 

    const update = (e: SyntheticEvent) => {
        e.preventDefault()
        if (fetching) return

        setFetching(true)
        
        const target = e.target as typeof e.target & {
            firstname: {value: string};
            lastname: {value: string};
            phone: {value: string};
        };

        const axiosConfig = {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        };

        axios.post(ApiURL("/user/profile/update"),{
            firstname: target.firstname.value,
            lastname: target.lastname.value,
            phone: target.phone.value,
            id: user.ID
        }, axiosConfig)
        .then((response) => {
            console.log(response)
            dispatch(setUser(response.data.user))
        })
        .catch(function (error) {
            console.log(error.response)
        }).then(() => {
            setFetching(false)
        }) 
        
    }
    return (
        <form onSubmit={update} action="POST">
            <p style={{fontWeight: "bold"}}>{user.email}</p>
            <div className="input-container">
                <label htmlFor="firstname" className="form-label-light">
                    First Name*
                </label>
                <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    required={true}
                    defaultValue={user.firstname}
                    className="form-input-secondary"
                />
            </div>
            <div className="input-container">
                <label htmlFor="lastname" className="form-label-light">
                    Last Name*
                </label>
                <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    required={true}
                    defaultValue={user.lastname}
                    className="form-input-secondary"
                />
            </div>
            <div className="input-container">
                <label htmlFor="phone" className="form-label-light">
                    Phone
                </label>
                <input
                    type="text"
                    name="phone"
                    id="phone"
                    required={true}
                    defaultValue={user.phone}
                    className="form-input-secondary"
                />
            </div>
            <div style={{
                display: "flex",
                justifyContent: "flex-end"
            }}>
                <input type="submit" value="Save" className="btn-primary" style={{
                    width: "96px",
                    borderRadius: "28px"
                }}/>
            </div>
        </form>
    );
};

export default ProfileForm;
