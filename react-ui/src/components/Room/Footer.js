import React from 'react';
import { useHistory } from 'react-router-dom';
import './Footer.css';

function Footer() {
    const history = useHistory();

    function toMap() {
        history.push("/maproom");        
    };

    function toChat() {
        history.push("/chatroom");        
    }; 

    return (
        
        <div className="footer-layout">
            <button type="SUBMIT" onClick={toMap}>Map</button>
            <button type="SUBMIT">HALP</button>
            <button type="SUBMIT" onClick={toChat}>Chat</button>
        </div>
    )
}

export default Footer;