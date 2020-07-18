import React, { Component, useState, useEffect } from 'react'; // using hooks 
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import io from 'socket.io-client';

import './Chat.css';

let socket;

const Chat = ({ location }) => {
    //const [name, setName] = useState(''); // setter function & useState('defaultvalue')
    const [name, setName] = useState('');
    const [room, setRoom] = useState(''); // unique hash?
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = '127.0.0.1:5000/'; 
    useEffect(() => {
        const { name } = queryString.parse(location.search);
        const room = "uniquehash";
        socket = io(ENDPOINT);
        setName(name);
        setRoom(room);        
        
        socket.emit('join', { name, room }, (error) => {
            if (error) {
                alert(error);
            }
        });

        return () => {
            socket.emit('disconnect');
            socket.off(); // off for specific user
        }
    }, [ENDPOINT, location.search]);

    useEffect(() => { // listen for messages on client side
        socket.on('message', (message) => {
            setMessages(messages => [...messages, message]); // add new msg to existing messages
        });
    },[]);

    const sendMessage = (event) => {
        event.preventDefault();
        if (message) {
            console.log(message, messages);
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    return (
        <div className='component-layout'>
            <div className="chatHeader">
                <div className="roomInfo">
                    <h4 className="currentTime">3:04 PM</h4>
                    <p classNam="chatHeaderMessage"> Messages to group members will appear here</p>
                </div>
            </div>

            <div className='component-content'>
                <input value={message} 
                onChange={(event) => setMessage(event.target.value)} 
                onKeyPress={(event) => event.key === 'Enter' ? sendMessage(event) : null }>
                    
                </input>
            </div>

        </div>
    )

}

export default Chat;