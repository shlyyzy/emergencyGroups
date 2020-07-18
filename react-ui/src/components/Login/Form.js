import React from "react";
import { useForm } from "react-hook-form";
import './Form.css'

function Form({ onFormSubmit }) {
    const { register, handleSubmit, watch, errors } = useForm();

    // For form submission, update the parent widget using callback
    function onSubmit(data) {
        onFormSubmit(data);        
    };    

    // Making sure we can watch input (debugging)
    console.log(watch("groupName"));
    console.log(watch("groupLocation"));

    return (
        <form onSubmit={handleSubmit(onSubmit)}>            
            <input
                name="groupName"
                placeholder="Group Name"
                ref={register({ required: true, minLength: 1 })}
            />
            <input 
                name="groupLocation"
                placeholder="Meetup location"
                ref={register({ required: true, minLength: 1 })} />

            {/* If the errors ever show up */}
            {errors.groupName && <p className="warning">⚠ Group name is required</p>}
            {errors.groupLocation && <p className="warning">⚠ Group location is required</p>}

            <button type="submit">Submit</button>
        </form>
    );
}

export default Form;
