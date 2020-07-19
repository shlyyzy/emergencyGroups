import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Map from '../Map/Map';

import './Maproom.css';

function Room() {

    //height: '537px'
    return (
        <div className="room">
            <Header/>
            <Map/>
            <div id="filler">
                <Footer/>
            </div>
        </div>
    )
}

/* 
    top: 65vh;
    position: relative;
    adding this helps position it on the map pg
    but moves it too much on chat >:(
*/


export default Room;