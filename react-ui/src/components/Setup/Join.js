import React from 'react';
import QRCode from 'qrcode.react';
import { useHistory } from 'react-router-dom';
import ReadOnlyText from '../Textbox/ReadOnlyText';

function Join() {
    const history = useHistory();

    // For form submission, update the parent widget using callback
    function onSubmit() {
        history.push("/name");        
    };  

    return (
        <div className="register">
            <div className="register-vertical">
                <h1>Share link or scan QR code</h1>
                <div className="spacer-1" />
                <ReadOnlyText value={"https://fierce-journey-22444.herokuapp.com/"} />
                <div className="spacer-1" />
                <QRCode value={"https://fierce-journey-22444.herokuapp.com/"} />
                <button type="submit" onClick={onSubmit}>Next >></button>
            </div>
        </div>
    )
}

export default Join;