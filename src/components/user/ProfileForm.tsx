import React from "react";
import "../../styles/forms/form.css";
type User = {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
};

interface Props {
    user: User;
}

const ProfileForm = (props: Props) => {
    // console.log(props.user);
    return (
        <form>
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
                    Last Name*
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
