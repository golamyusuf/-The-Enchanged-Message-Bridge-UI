import React, { useState, useEffect } from 'react';
import SockJsClient from 'react-stomp';
import './App.css';
import Input from './components/Input/Input';
import LoginForm from './components/LoginForm';
import Messages from './components/Messages/Messages';
import chatAPI from './services/chatapi';
import { randomColor } from './utils/common';
import ConnectedUsers from './components/ConnectedUsers/ConnectedUsers';

const SOCKET_URL = 'http://localhost:8080/ws-chat/';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    chatAPI.getMessages()
      .then(response => {
        setMessages(response.data);
      })
      .catch(err => {
        console.log('Error fetching messages:', err);
      });
  }, []);

  const onConnected = () => {
    console.log("Connected!!");
  };

  const onMessageReceived = (msg) => {
    console.log('New Message Received!!', msg);
    setMessages(prevMessages => [...prevMessages, msg]);
  };

  const onSendMessage = (msgText, file) => {
    const formData = new FormData();
    formData.append('sender', user.username);
    formData.append('content', msgText);

    if (file) {
      formData.append('file', file);
    }

    chatAPI.sendMessage(formData)
      .then(res => {
        console.log('Sent', res);
      })
      .catch(err => {
        console.log('Error occurred while sending message to API', err);
      });
  };

  const handleLoginSubmit = (username) => {
    console.log(username, " Logged in..");
    setUser({
      username: username,
      color: randomColor()
    });
  };

  return (
    <div className="App">
      {!!user ?
        (
          <div className="app-container">
            <aside className="sidebar">
              <ConnectedUsers username={user.username}/>
            </aside>
            <main className="main-content">
              <div className="banner-info">
              <h3>Welcome to the Enchanted Message Bridge</h3>
                <h4>Logged in as: {user.username}</h4>
              </div>
             
              <SockJsClient
                url={SOCKET_URL}
                topics={['/topic/group']}
                onConnect={onConnected}
                onDisconnect={() => console.log("Disconnected!")}
                onMessage={msg => onMessageReceived(msg)}
                debug={false}
              />
              <Messages
                messages={messages}
                currentUser={user}
              />
              <Input onSendMessage={onSendMessage} />
            </main>
          </div>
        ) :
        <LoginForm onSubmit={handleLoginSubmit} />
      }
    </div>
  );
}

export default App;
