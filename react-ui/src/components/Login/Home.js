import React from 'react';
import Form from './Form';
import './Home.css';

function Home() {
    const [groupName, setGroupName] = React.useState("");
    const [groupLocation, getGroupLocation] = React.useState("");

    const updateInfo = (data) => {
        setGroupName(data.groupName);
        getGroupLocation(data.groupLocation);
    }

    return (
        <div className="home">
            <div className="vertical">
                <h1>Hi, welcome to emergencyGroups</h1>
                <p>Create a group to start</p>
                <div className="spacer-1"></div>
                <Form onFormSubmit={(data) => updateInfo(data)}/>                    
            </div>
        </div>
    )
}

export default Home;