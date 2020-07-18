import React from 'react';
import QRCode from 'qrcode.react';
import './Header.css';

function Header() {
    var groupChatName = "Group 1";

    return (
        
        <div className="header">

            <div className="header-left">
                <h1>{groupChatName}</h1>
                <p>See group members (1)</p>
            </div>
            <div className="header-right">
                <QRCode size={50} value={"https://fierce-journey-22444.herokuapp.com/"} />
            </div>
        </div>
    )
}

export default Header;