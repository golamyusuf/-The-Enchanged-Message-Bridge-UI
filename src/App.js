import React, { useState, useEffect } from 'react';
import SockJsClient from 'react-stomp';
import './App.css';
import Input from './components/Input/Input';
import LoginForm from './components/LoginForm';
import Messages from './components/Messages/Messages';
import chatAPI from './services/chatapi';
import { randomColor } from './utils/common';

const SOCKET_URL = 'http://localhost:8080/ws-chat/';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch all messages when the component mounts
    chatAPI.getMessages()
      .then(response => {
        setMessages(response.data);
      })
      .catch(err => {
        console.log('Error fetching messages:', err);
      });
  }, []);

  let onConnected = () => {
    console.log("Connected!!");
  }

  let onMessageReceived = (msg) => {
    console.log('New Message Received!!', msg);
    setMessages(messages.concat(msg));
  }

  let onSendMessage = (msgText, file) => {
    const formData = new FormData();
    formData.append('sender', user.username);
    formData.append('content', msgText);

    if (file) {
      formData.append('file', file);
    }

    chatAPI.sendMessage(formData)
      .then(res => {
        console.log('Sent', res);
        // Optionally, you might want to refresh the message list after sending a message
        // chatAPI.getMessages().then(response => setMessages(response.data));
      })
      .catch(err => {
        console.log('Error Occurred while sending message to API', err);
      });
  }

  let handleLoginSubmit = (username) => {
    console.log(username, " Logged in..");

    setUser({
      username: username,
      color: randomColor()
    })
  }

  return (
    <div className="App">
      {!!user ?
        (
          <>
            <div className="user-info">
              <h2>Logged in as: {user.username}</h2>
            </div>
            <SockJsClient
              url={SOCKET_URL}
              topics={['/topic/group']}
              onConnect={onConnected}
              onDisconnect={console.log("Disconnected!")}
              onMessage={msg => onMessageReceived(msg)}
              debug={false}
            />
           
            <Messages
              messages={messages}
              currentUser={user}
            />
            <Input onSendMessage={onSendMessage} />
          </>
        ) :
        <LoginForm onSubmit={handleLoginSubmit} />
      }
    </div>
  );
}

export default App;
 
