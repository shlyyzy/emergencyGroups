import React from 'react';

import './Message.css';


import ReactEmoji from 'react-emoji';

const Message = ({ message: { text, user }, name }) => {
  let isSentByCurrentUser = name === user ? true : false;
  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          <div className="messageBox backgroundBlue">
            <p className="messageText">{ReactEmoji.emojify(text)}</p>
          </div>
          <p className="sentText pr-10">{name}</p>
        </div>
        )
        : (
          <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
              <p className="messageText">{ReactEmoji.emojify(text)}</p>
            </div>
            <p className="sentText pl-10">{user.name}</p>
          </div>
        )
  );
}

export default Message;