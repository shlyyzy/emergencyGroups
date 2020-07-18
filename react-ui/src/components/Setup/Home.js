import React, { useState, useEffect } from 'react';
import Register from './Register';

function Home() {
    const [groupName, setGroupName] = useState("");
    const [groupLocation, getGroupLocation] = useState("");

    const updateInfo = (data) => {
        setGroupName(data.groupName);
        getGroupLocation(data.groupLocation);
    }

    // For debugging purposes!
    useEffect(() => {
        console.log(groupName);
        console.log(groupLocation);
    }, [groupLocation]);

    return (
        <div className="register">
            <div className="register-vertical">
                <h1>Hi, welcome to emergencyGroups</h1>
                <p>Create a group to start</p>
                <div className="spacer-1" />
                <Register onFormSubmit={(data) => updateInfo(data)}/>
            </div>
        </div>
    )
}

export default Home;