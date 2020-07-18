import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Map from '../Map/Map';
import Chat from '../Chat/Chat';

function Room() {

    return (
        <div className="room">
            <Header/>
            <Chat/>
            <Footer/>
        </div>
    )
}

export default Room;