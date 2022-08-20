import axios from "axios";
import React, { SyntheticEvent, useState } from "react";
import "../../styles/forms/form.css";
type User = {
    ID: number
    firstname: string
    lastname: string
    email: string
    phone: string
}

interface Props {
    user: User;
    setUser: any
}

const ProfileForm = (props: Props) => {

    const [fetching, setFetching] = useState(false)

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

        axios.post("http://localhost:8080/api/user/profile/update",{
            firstname: target.firstname.value,
            lastname: target.lastname.value,
            phone: target.phone.value,
            id: props.user.ID
        }, axiosConfig)
        .then((response) => {
            console.log(response)
            props.user = response.data.user
            props.setUser(response.data.user)
        })
        .catch(function (error) {
            console.log(error.response)
        }).then(() => {
            setFetching(false)
        }) 
        
    }
    return (
        <form onSubmit={update} action="POST">
            <p style={{fontWeight: "bold"}}>{props.user.email}</p>
            <div className="input-container">
                <label htmlFor="firstname" className="form-label-light">
                    First Name*
                </label>
                <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    required={true}
                    defaultValue={props.user.firstname}
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
                    defaultValue={props.user.lastname}
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
                    defaultValue={props.user.phone}
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
