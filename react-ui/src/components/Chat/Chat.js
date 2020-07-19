import React, { Component, useState, useEffect } from 'react'; // using hooks 
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import io from 'socket.io-client';
import './Chat.css';
import MsgBox from '../MsgBox/MsgBox';
import Messages from '../Messages/Messages';

let socket;
const Chat = ({ location, name}) => {
    //const [name, setName] = useState(''); //setter function & useState('defaultvalue')
    name = name ? name : '';
    const [room, setRoom] = useState(''); // unique hash?
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = '127.0.0.1:5000/';
    
    const time = new Date().toLocaleTimeString('en-US', { hour12: false, 
        hour: "numeric", 
        minute: "numeric"}); // get current time
        
    useEffect(() => {
        const { room } = queryString.parse(location.search);
        socket = io(ENDPOINT);
        setRoom(room);
        
        socket.emit('join', { name, room }, (error) => {
            if (error) {
                alert(error);
            }
        });

        
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
        <div className="component-layout">
            <div className="component-content">
                <h4 className="currentTime">{time}</h4>
                <p className="chatHeaderMessage">Messages to group members will appear here</p>
                        <Messages messages={messages} name={name}/>
                        <MsgBox message={message} 
                                setMessage={setMessage}
                                sendMessage={sendMessage}
                        />
               
            </div>    
        </div>      
    )

}

export default Chat;