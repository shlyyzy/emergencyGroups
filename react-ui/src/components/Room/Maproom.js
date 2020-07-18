import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Map from '../Map/Map';

function Room() {

    return (
        <div className="room">
            <Header/>
            <Map/>
            <Footer/>
        </div>
    )
}

export default Room;