import React, { Component, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Map as GMap, GoogleApiWrapper } from 'google-maps-react'
import { addHub, deleteHub, selectHubs } from '../features/safehubsSlice'

export class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {hubs: []};
    }

    render() {
        return (
            <div>
                this is the map
                <GMap
                    google={this.props.google}
                    zoom={15}
                    initialCenter={{
                        lat: 49.2827,
                        lng: -123.1207
                    }}
                />
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyD65_WpJmvtVbVTVNSreIvx7ZMbuvmyS_4'
})(Map);