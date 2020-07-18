import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';

function RegisterName({ onFormSubmit }) {
    const { register, handleSubmit, watch, errors } = useForm();
    const history = useHistory();

    // For form submission, update the parent widget using callback
    function onSubmit(data) {
        onFormSubmit(data);
        history.push("/chatroom");
    };    

    // // Making sure we can watch input (debugging)
    // console.log(watch("displayName"));

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                name="displayName"
                placeholder="Enter your display name"
                maxLength="25"
                ref={register({ required: true, minLength: 1 })}
            />
            
            {/* If the errors ever show up */}
            {errors.displayName && <p className="warning">⚠ Display name is required</p>}

            <button type="submit">Join Group</button>
        </form>
    );
}

export default RegisterName;
