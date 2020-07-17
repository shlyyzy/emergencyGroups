import React, { Component, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Map as GMap, GoogleApiWrapper } from 'google-maps-react'
import { addHub, deleteHub, selectHubs } from '../features/safehubsSlice'

const API_KEY = 'AIzaSyD65_WpJmvtVbVTVNSreIvx7ZMbuvmyS_4'

// export class Map extends Component {
// const Map = (props) => {
export function Map(props) {
    const hubs = useSelector(selectHubs)
    let counter = 0;
    const dispatch = useDispatch()
    const [ hubName, setHub ] = useState('Zoom University')
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (hubName === '') {
            return null;
        }
        dispatch(addHub(hubName));
        // add it to the map
    }

    const renderHubs = (list) => {
        return list.map(hub => (
            <li key={counter++}>
                {/* TODO!!!!!! add attributes to hub (address, coordinates, unique id) - make hub object */}
                <button onClick={()=>{console.log('trying to delete')}}>
                    X
                </button>
                <button onClick={() => {console.log('center at hub')}}>
                    {hub}
                </button>
            </li>
        ))
    }

    return (
        <div>
            this is the map
            <br/>
            <form onSubmit={handleSubmit}>
                <input
                    autoFocus
                    name="newhub"
                    type="text"
                    placeholder="Add a safe spot"
                    value={hubName}
                    onChange={e => setHub(e.target.value)}
                />
                <input
                    type="submit"
                    value="Submit"
                />
            </form>
            <div>
                {renderHubs(hubs)}
            </div>
            <GMap
                google={props.google}
                zoom={15}
                initialCenter={{
                    lat: 49.2827,
                    lng: -123.1207
                }}
            />
            
        </div>
    );   
}

export default GoogleApiWrapper({
    apiKey: API_KEY
})(Map);