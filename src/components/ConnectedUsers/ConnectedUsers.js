import React, { useState } from 'react';
import SockJsClient from 'react-stomp';

const SOCKET_URL = 'http://localhost:8080/ws-chat';

const ConnectedUsers = ({ username }) => {
    const [users, setUsers] = useState([]);
        console.log(" USER NAME "+username)
    const onMessageReceived = (msg) => {
        setUsers(msg);
    };

    return (
        <div>
            <h3>Connected Users:</h3>
            {users.length === 0 ? (
                <p>No users are connected.</p>
            ) : (
                <ul>
                    {users.map((user, index) => (
                        <li key={index}>{user}</li>
                    ))}
                </ul>
            )}
            <SockJsClient
                url={SOCKET_URL}
                topics={['/topic/users']}
                onMessage={onMessageReceived}
                headers={{ 'X-User-Name': username }}  
                debug={false}
            />
        </div>
    );
};

export default ConnectedUsers;
