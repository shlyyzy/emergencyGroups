import React from "react";
import { useForm } from "react-hook-form";
import './Form.css'

function Form() {
    const { register, handleSubmit, watch, errors } = useForm();

    // For form submission, change this
    const onSubmit = (data) => {
        console.log(data);
        window.alert("Hooray! $data");
    };

    // Making sure we can watch input (debugging)
    console.log(watch("groupName")); // you can watch individual input by pass the name of the input

    return (
        <form onSubmit={handleSubmit(onSubmit)}>            
            <input
                name="groupName"
                placeholder="Group Name"
                ref={register({ required: true, minLength: 1 })}
            />
            <input 
                name="groupLocation"
                placeholder="Location"
                ref={register({ required: true, minLength: 1 })} />
            {errors.groupName && <p className="warning">Group name is required</p>}
            {errors.groupLocation && <p className="warning">Group location is required</p>}
            <input type="submit" />
        </form>
    );
}

export default Form;
