import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import mapboxgl from 'mapbox-gl';
// import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl'
import axios from 'axios';

import { addHub, selectHubs } from '../../features/safehubsSlice';
import "mapbox-gl/dist/mapbox-gl.css";
import './Map.css';
import PinImg from './pin.png';

const MAPBOX_KEY = 'pk.eyJ1IjoibWFnZ2llZWUiLCJhIjoiY2tjcXl4N242MGZobTJ5cGR1dWY2dWcxNiJ9.f3sQpEFz1p3zXTQex41bhw';
const RADAR_IO_KEY = 'prj_live_sk_b7701a09fafc7cddd512eb58187a56d3b8cd7f77';

const INIT_MAP_SETTINGS = {
    zoom: 15,
    lng: -123.1207,
    lat: 49.2827
}

// https://sparkgeo.com/blog/build-a-react-mapboxgl-component-with-hooks/




// export class Map extends Component {
// const Map = (props) => {
export default function Map(props) {
    const hubs = useSelector(selectHubs);
    // let counter = 0;
    // let homeMarker = null;
    const dispatch = useDispatch();
    const [ hubName, setHub ] = useState('');
    const [ hubsList, setHubsList ] = useState(hubs);
    const [ map, setMap ] = useState(null);
    const mapContainer = useRef(null);
    let markers = [];

    const handleSearch = (ads) => {
        axios.get(`https://api.radar.io/v1/geocode/forward?query=${ads}`,
        {
            headers: {
                'Authorization': RADAR_IO_KEY
            }
        }).then(res => {
            // console.log(res.data);
            if (res.data.addresses.length > 0) {
                const coords = [res.data.addresses[0].longitude, res.data.addresses[0].latitude]
                const newHub = {
                    name: hubName,
                    address: '',
                    lng: coords[0],
                    lat: coords[1]
                }
                // dispatch(addHub(newHub));
                
                // addMarker(newHub, map); <-dispatch + array spread incl. in addmarker

                map.flyTo({
                    center: coords
                });
                
                // setHubsList([...hubsList, newHub]);
                // console.log(hubsList);
            }
        }).catch(err => console.log(err));
    }

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
        
        handleSearch(addressQueryStr);
    }

    const addMarker = (hub, theMap, theColor) => {
        const marker = new mapboxgl.Marker({
            color: theColor
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
        dispatch(addHub(hub));
        setHubsList([...hubsList, hub]);
        console.log(hubsList);
    }

    const generateSuggestions = (radius, centerCoords) => {
        // centerCoords = [ lng, lat ]
        // radius = 
    }

    // const centerCurrentLoc = () => {
    //     const options = {
    //         enableHighAccuracy: true,
    //         timeout: 5000,
    //         maximumAge: 0
    //     };

    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(
    //             (pos) => {
    //                 const coords = [pos.coords.longitude, pos.coords.latitude];
    //                 // console.log(coords);
                    
    //                 map.flyTo({
    //                     center: coords
    //                 });

    //                 if (homeMarker !== null) {
    //                     // map.removeLayer(homeMarker); <- doesnt work?
    //                     homeMarker.remove();
    //                 } 
                    
    //                 // if  (homeMarker.getLngLat().lng !== coords[0]
    //                 //     && homeMarker.getLngLat().lat !== coords[1])
    //                     // const toDelete = homeMarker;

    //                 homeMarker = new mapboxgl.Marker({
    //                     color: '#9CB0E5'
    //                 })
    //                     .setLngLat(coords)
    //                     .setPopup(new mapboxgl.Popup({
    //                         offset: 25,
    //                         closeButton: false
    //                         })
    //                             .setText('Current Location'))
    //                     .addTo(map);

    //                 return coords;
    //             },
    //             (err) => {console.log(err)},
    //             options
    //         );
    //     } else {
    //         console.log("This browser does not support geolocation :(");
    //     }
    // }

    const addPinAtCenter = () => {
        if (map) {
            const coords = map.getCenter();
            
            const hub = {
                name: ':D',
                address: '',
                lng: coords.lng,
                lat: coords.lat
            }
            addMarker(hub, map, '#3754B9');
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
                map.addControl(
                    new mapboxgl.GeolocateControl({
                        positionOptions: {
                            enableHighAccuracy: true
                        },
                        trackUserLocation: true
                    }, 'bottom-right')
                );
                map.addControl(new mapboxgl.NavigationControl()); // <- do we want this?
                hubsList.forEach(hub => {
                    addMarker(hub, map, '#3754B9');
                });

                // STATIC DATA
                TEMP_SUGGEST.forEach(hub => {
                    addMarker(hub, map, '#78B937')
                });

                map.addSource('suggested', TEMP_DATA);
                map.addLayer({
                    'id': 'safehubs',
                    'type': 'symbol',
                    'source':'suggested',
                    'layout': {
                        'icon-image': '{marker-symbol}-11',
                        'icon-allow-overlap': true
                    }
                });
            });     
        };

        if (!map) initMap({ setMap, mapContainer });
        
    }, [map, hubsList])

    return (
        <div>
            
            <form onSubmit={handleSubmit} id="form-container">
                <input
                    autoFocus
                    name="newhub"
                    type="text"
                    placeholder="Search"
                    className="searchbar"
                    value={hubName}
                    onChange={e => setHub(e.target.value)}
                />
                <input
                    type="submit"
                    value="Submit"
                    id="searchSubmit"
                />
                <div id="parent">
                <img src={PinImg} className="pin" alt="map-pin" onClick={addPinAtCenter}/>
                {/* <button id="temp1" onClick={(e)=>{
                    e.preventDefault();
                    console.log('wowie');
                    }}></button> */}
                </div>
            </form>
            {/* <button onClick={() => centerCurrentLoc()}>Current Location</button> */}
            {/* <div></div> */}
            
            <div className="mapContainer">
                <div ref={el => mapContainer.current = el} className="map"/>
            </div>
            {/* <button id="addPinBtn">+</button> */}
            
            
        </div>
    );   
}

const TEMP_SUGGEST = [
    {
        name: 'Vancouver City Hall',
        address: '',
        lng: -123.113899,
        lat: 49.261073
    },
    {
        name: 'A&W Canada Robson',
        address: '',
        lng: -123.117506,
        lat: 49.279636
    },
    {
        name: 'Canada Place',
        address: '',
        lng: -123.111077,
        lat: 49.288861
    },
    {
        name: 'Subway Robson',
        address: '',
        lng: -123.115740,
        lat: 49.278504
    },
    {
        name: 'Shoppers on Thurlow',
        address: '',
        lng: -123.131483,
        lat: 49.281028,
    },
    {
        name: 'Shoppers on Robson',
        address: '',
        lng: -123.122070,
        lat: 49.283505
    },
    {
        name: 'Vancouver Public Library',
        address: '',
        lng: -123.115716,
        lat: 49.279345
    },
    {
        name: 'Vancouver Art Gallery',
        address: '',
        lng: -123.120476,
        lat: 49.282962
    },
    {
        name: 'IGA on Burrard',
        address: '',
        lng: -123.124960,
        lat: 49.282228
    },
    {
        name: 'Vancouver City Centre',
        address: '',
        lng: -123.118613,
        lat: 49.282467,
    }
]

const TEMP_DATA = {
    "type": "geojson",
    "data": {
        "type": "FeatureCollection",
        "features": [
            {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': [-123.1207, 49.2827] //long,lat
                }
            },
            {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': [-123.2, 49.7]
                }
            },
            {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': [-124, 49.7]
                }
            },
            {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': [-124, 50]
                }
            }
        ]
    }
}