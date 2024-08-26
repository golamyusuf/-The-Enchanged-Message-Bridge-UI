import React from 'react';

const Messages = ({ messages, currentUser }) => {

    let renderMessage = (message) => {
        const { sender, content, color, fileData, originalFileName, contentType } = message;
        const messageFromMe = currentUser.username === sender;
        const className = messageFromMe ? "Messages-message currentUser" : "Messages-message";

        return (
            <li className={className} key={message.id}>
                <span
                    className="avatar"
                    style={{ backgroundColor: color }}
                />
                <div className="Message-content">
                    <div className="username">
                        {sender}
                    </div>
                    <div className="text">{content}</div>
                    {fileData && renderFile(fileData, originalFileName, contentType)}
                </div>
            </li>
        );
    };

    let renderFile = (fileData, fileName, fileType) => {
        const fileURL = `data:${fileType};base64,${fileData}`;

        // Handle image files
        if (fileType.startsWith('image/')) {
            return (
                <div className="message-file">
                    <img src={fileURL} alt={fileName} style={{ maxWidth: '20%', height: '50%' }} />
                </div>
            );
        }

        // Handle PDF files
        if (fileType === 'application/pdf') {
            return (
                <div className="message-file">
                    <a href={fileURL} target="_blank" rel="noopener noreferrer">
                        View PDF: {fileName}
                    </a>
                </div>
            );
        }

        // Handle DOC/DOCX files
        if (fileType === 'application/msword' || fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            return (
                <div className="message-file">
                    <a href={fileURL} download={fileName} target="_blank" rel="noopener noreferrer">
                        Download DOC: {fileName}
                    </a>
                </div>
            );
        }

        // Handle other file types
        return (
            <div className="message-file">
                <a href={fileURL} download={fileName} target="_blank" rel="noopener noreferrer">
                    Download {fileName}
                </a>
            </div>
        );
    };
     
    return (
        <ul className="messages-list">
            {messages.map(msg => renderMessage(msg))}
        </ul>
    );
}

export default Messages; 