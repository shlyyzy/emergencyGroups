import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import mapboxgl from 'mapbox-gl'
import axios from 'axios'

import './Map.css'
import blue_pin from './bluePin.png'
import { addHub, deleteHub, selectHubs } from '../../features/safehubsSlice'

mapboxgl.accessToken = 'pk.eyJ1IjoibWFnZ2llZWUiLCJhIjoiY2tjcXl4N242MGZobTJ5cGR1dWY2dWcxNiJ9.f3sQpEFz1p3zXTQex41bhw';
const INIT_MAP_SETTINGS = {
    zoom: 15,
    lng: -123.1207,
    lat: 49.2827
}
let map;
let hubData = [
    {
        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': [-123.1207, 49.2827] //long,lat
        }
        // 'properties': {
        //     "address": "1471 P St NW",
        //     "city": "Washington DC",
        //     "country": "United States"
        // }
    },
    {
        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': [20, 0]
        }
    }
]

const bluePin = new Image();
bluePin.src = blue_pin;

// export class Map extends Component {
// const Map = (props) => {
export default function Map(props) {
    const hubs = useSelector(selectHubs)
    let counter = 0
    const dispatch = useDispatch()
    const [ hubName, setHub ] = useState('Zoom University')

    let mapContainer = useRef(null)
    
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

    useEffect(() => {
        map = new mapboxgl.Map({
            container: mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [INIT_MAP_SETTINGS.lng, INIT_MAP_SETTINGS.lat], //lng, lat
            zoom: INIT_MAP_SETTINGS.zoom,
            attributionControl: false
        });
        
        map.addControl(new mapboxgl.AttributionControl(), 'top-left');
        
        /*
        map.on('load', (e) => {
            if (!map.hasImage('bluePin')) {
                map.addImage('bluePin', bluePin);
            }

            // idk why this doesnt work :[
            // map.addSource('points', {
            //     'type': 'geojson',
            //     'data': hubData
            // });

            map.addSource('points', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': [
                        {
                            'type': 'Feature',
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [-123.1207, 49.2827]
                            }
                        },
                        {
                            'type': 'Feature',
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [20, 0]
                            }
                        }
                    ]
                }
            });
            map.addLayer({
                'id': 'safehubs',
                'type': 'symbol',
                'source': 'points',
                'layout': {
                    'icon-image': 'bluePin'
                }
            });
        });
        */
    })

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
                    id="pac-input"
                    value={hubName}
                    onChange={e => setHub(e.target.value)}
                />
                <input
                    type="submit"
                    value="Submit"
                />
            </form>
            <div className="input-bar">
                {renderHubs(hubs)}
            </div>
            <div id="map" className="mapContainer-2">
                <div ref={el => mapContainer = el} className="mapContainer"/>
            </div>
            {/* <GMap
                google={props.google}
                zoom={15}
                initialCenter={{
                    lat: 49.2827,
                    lng: -123.1207
                }}
            /> */}
            
        </div>
    );   
}

// export default GoogleApiWrapper({
//     apiKey: API_KEY
// })(Map);


/*
map.loadImage('./bluepin.png',
                (err, img) => {
                    if (err) throw err;
                    map.addImage('pin', img);
                    map.addSource('points', {
                        'type': 'geojson',
                        'data': hubData
                    });
                    map.addLayer({
                        'id': 'safehubs',
                        'type': 'symbol',
                        'source': 'points',
                        'layout': {
                            'icon-image': 'pin'
                        }
                    })
                }
            );
*/