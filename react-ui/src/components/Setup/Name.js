import React, { useState, useEffect } from 'react';
import RegisterName from './RegisterName';

function Name({location}) {
    const [displayName, setDisplayName] = useState("");
    const updateInfo = (data) => {
        setDisplayName(data.displayName);
    }
    var groupChatName = "Group 1";

    // For debugging purposes!
    useEffect(() => {
        console.log(displayName);
    }, [displayName]);

    return (
        <div className="register">
            <div className="register-vertical">
                <h1>Entering <span className="groupName">{groupChatName}</span></h1>
                <div className="spacer-1" />
                <RegisterName onFormSubmit={(data) => updateInfo(data)} room={location.state.room}/>
            </div>
        </div>
    )
}

export default Name;