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
        </form>
    );
};

export default ProfileForm;
