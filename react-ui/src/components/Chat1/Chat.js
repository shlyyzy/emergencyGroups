import React, { Component, useState, useEffect } from 'react'; // using hooks 
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import io from 'socket.io-client';
import './Chat.css';
import InputBox from '../InputBox/InputBox';
import Messages from '../Messages/Messages';

let socket;
const Chat = ({ location }) => {
    const [name, setName] = useState(''); //setter function & useState('defaultvalue')
    const [room, setRoom] = useState(''); // unique hash?
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = '127.0.0.1:5000/';
    const time = new Date().toLocaleTimeString('en-US', { hour12: false, 
        hour: "numeric", 
        minute: "numeric"}); // get current time
        
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
        <div className="chatroom">
            <div className="chatHeader">
                <h4 className="currentTime">{time}</h4>
                <p className="chatHeaderMessage"> Messages to group members will appear here</p>
            </div>
            <div className='outerContainer'>
                <div className='container'>
                    <Messages messages={messages} name={name}/>
                    <InputBox message={message} 
                            setMessage={setMessage}
                            sendMessage={sendMessage}
                    />
                        
                </div>
            </div>
        </div>
    )

}

export default Chat;