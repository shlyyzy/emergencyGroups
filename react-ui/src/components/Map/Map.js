import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import mapboxgl from 'mapbox-gl';
// import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl'
import axios from 'axios';

import { addHub, deleteHub, selectHubs } from '../../features/safehubsSlice';

import "mapbox-gl/dist/mapbox-gl.css";
import './Map.css';
import blue_pin from './bluePin.png';

const MAPBOX_KEY = 'pk.eyJ1IjoibWFnZ2llZWUiLCJhIjoiY2tjcXl4N242MGZobTJ5cGR1dWY2dWcxNiJ9.f3sQpEFz1p3zXTQex41bhw';
const RADAR_IO_KEY = 'prj_live_sk_b7701a09fafc7cddd512eb58187a56d3b8cd7f77';

const INIT_MAP_SETTINGS = {
    zoom: 15,
    lng: -123.1207,
    lat: 49.2827
}

// https://sparkgeo.com/blog/build-a-react-mapboxgl-component-with-hooks/

let hubData = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [-123.1207, 49.2827] // longitude, latitude
        },
        "properties": {
          "name": "Vancouver City Hall"
        }
      }
    ]
  }

const bluePin = new Image();
bluePin.src = blue_pin;

const TEMP_HUBS = [
    {
        name: 'Vancouver City Hall, BC',
        address: '',
        lng: -123.1207,
        lat: 49.2827
    },
    {
        name: 'UBC',
        address: '',
        lng: -123.2525,
        lat: 49.2663
    }
];

// export class Map extends Component {
// const Map = (props) => {
export default function Map(props) {
    const hubs = useSelector(selectHubs);
    // let counter = 0;
    let homeMarker = null;
    const dispatch = useDispatch();
    const [ hubName, setHub ] = useState('');
    const [ hubsList, setHubsList ] = useState(TEMP_HUBS);
    const [ map, setMap ] = useState(null);
    const mapContainer = useRef(null);
    let markers = [];

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("submitting");

        if (hubName === '') {
            return null;
        }
        setHub(hubName);
        const addressQueryStr = hubName.trim().replace(/, | |,/gi, "+");
        console.log(addressQueryStr);
        // console.log(hubsList);
        axios.get(`https://api.radar.io/v1/geocode/forward?query=${addressQueryStr}`,
        {
            headers: {
                'Authorization': RADAR_IO_KEY
            }
        }).then(res => {
            console.log(res.data);
            if (res.data.addresses.length > 0) {
                const coords = [res.data.addresses[0].longitude, res.data.addresses[0].latitude]
                const newHub = {
                    name: hubName,
                    address: '',
                    lng: coords[0],
                    lat: coords[1]
                }
                dispatch(addHub(newHub));
                
                // addMarker(newHub, map);

                map.flyTo({
                    center: coords
                });
                
                setHubsList([...hubsList, newHub]);
                console.log(hubsList);
            }
        }).catch(err => console.log(err));
    }

    const addMarker = (hub, theMap) => {
        const marker = new mapboxgl.Marker({
            color: '#3754B9'
        })
            .setLngLat([hub.lng, hub.lat])
            .setPopup(new mapboxgl.Popup({
                offset: 25,
                closeButton: false
                })
                    .setText(hub.name))
            .addTo(theMap);
        // console.log("yoooooo: " + marker.getLngLat().lat);
        markers.push(marker);
    }

    const generateSuggestions = (radius) => {

    }

    const centerCurrentLoc = () => {
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const coords = [pos.coords.longitude, pos.coords.latitude];
                    // console.log(coords);
                    
                    map.flyTo({
                        center: coords
                    });

                    if (homeMarker !== null) {
                        // map.removeLayer(homeMarker); <- doesnt work?
                        homeMarker.remove();
                    } 
                    
                    // if  (homeMarker.getLngLat().lng !== coords[0]
                    //     && homeMarker.getLngLat().lat !== coords[1])
                        // const toDelete = homeMarker;

                    homeMarker = new mapboxgl.Marker({
                        color: '#9CB0E5'
                    })
                        .setLngLat(coords)
                        .setPopup(new mapboxgl.Popup({
                            offset: 25,
                            closeButton: false
                            })
                                .setText('Current Location'))
                        .addTo(map);

                    return coords;
                },
                (err) => {console.log(err)},
                options
            );
        } else {
            console.log("This browser does not support geolocation :(");
        }
    }

    useEffect(() => {
        mapboxgl.accessToken = MAPBOX_KEY;
        // console.log(typeof(getCurrentLoc()));

        generateSuggestions();

        const initMap = ({ setMap, mapContainer }) => {
            const map = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [INIT_MAP_SETTINGS.lng, INIT_MAP_SETTINGS.lat], //lng, lat
                zoom: INIT_MAP_SETTINGS.zoom,
            });
            
            map.on("load", () => {
                setMap(map);
                map.resize();
            });
            
            hubsList.forEach(hub => {
                addMarker(hub, map);
            });        
        };

        if (!map) initMap({ setMap, mapContainer });
        
    }, [map, hubsList])

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    autoFocus
                    name="newhub"
                    type="text"
                    placeholder="Search"
                    id="pac-input"
                    value={hubName}
                    onChange={e => setHub(e.target.value)}
                />
                <input
                    type="submit"
                    value="Submit"
                    style={{visibility: "hidden"}}
                />
            </form>
            <button onClick={() => centerCurrentLoc()}>Current Location</button>
            <div className="mapContainer">
                <div ref={el => mapContainer.current = el} className="map"/>
            </div>
            
            
        </div>
    );   
}