import React, { useState } from 'react';
import { socket } from './socket';

const TestNotification = () => {
  const [message, setMessage] = useState('');

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    // Envia el mensaje al servidor
    console.log(message);
   
    socket.emit('mensaje',  message);
    setMessage('')
    socket.on('mensaje',message)
  };

  return (
    <div>
      <input type="text" value={message} onChange={handleMessageChange} />
      <button  onClick={handleSendMessage}>Enviar Mensaje</button>
    </div>
  );
};

export default TestNotification;
