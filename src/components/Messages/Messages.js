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

        // If the file is an image, display it directly
        if (fileType.startsWith('image/')) {
            return (
                <div className="message-file">
                    <img src={fileURL} alt={fileName} style={{ maxWidth: '100%', height: 'auto' }} />
                </div>
            );
        }
        
        // For other file types, display a link to download or view
        return (
            <div className="message-file">
                <a href={fileURL} download={fileName} target="_blank" rel="noopener noreferrer">
                    {fileName}
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

///////////////////////////////////////////////////
// import React from 'react';

// const Messages = ({ messages, currentUser }) => {

//     let renderMessage = (message) => {
//         const { sender, content, color, file } = message;
//         const messageFromMe = currentUser.username === sender;
//         const className = messageFromMe ? "Messages-message currentUser" : "Messages-message";
//         alert(" 9 MessageFile Found "+file);
//         return (
//             <li className={className} key={message.id}>
//                 <span
//                     className="avatar"
//                     style={{ backgroundColor: color }}
//                 />
//                 <div className="Message-content">
//                     <div className="username">
//                         {sender}
//                     </div>
//                     <div className="text">{content}</div>
//                     {file && renderFile(file)}
//                 </div>
//             </li>
//         );
//     };

//     let renderFile = (file) => {
//         // Assuming `file` is an object with properties like `url`, `name`, and `type`
//         const { url, name, type } = file;
//         console.log("  30 Message "+file)
//         // If the file is an image, display it directly
//         if (type.startsWith('image/')) {
//             return (
//                 <div className="message-file">
//                     <img src={url} alt={name} style={{ maxWidth: '100%', height: 'auto' }} />
//                 </div>
//             );
//         }
        
//         // For other file types, display a link to download or view
//         return (
//             <div className="message-file">
//                 <a href={url} download={name} target="_blank" rel="noopener noreferrer">
//                     {name}
//                 </a>
//             </div>
//         );
//     };
     
//     return (
//         <ul className="messages-list">
//             {messages.map(msg => renderMessage(msg))}
//         </ul>
//     );
// }

// export default Messages;

//////////////////////////////////////////////////////
// import React from 'react'

// const Messages = ({ messages, currentUser }) => {

//     let renderMessage = (message) => {
//         const { sender, content, color } = message;
//         const messageFromMe = currentUser.username === message.sender;
//         const className = messageFromMe ? "Messages-message currentUser" : "Messages-message";
//         return (
//             <li className={className}>
//                 <span
//                     className="avatar"
//                     style={{ backgroundColor: color }}
//                 />
//                 <div className="Message-content">
//                     <div className="username">
//                         {sender}
//                     </div>
//                     <div className="text">{content}</div>
//                 </div>
//             </li>
//         );
//     };

//     return (
//         <ul className="messages-list">
//             {messages.map(msg => renderMessage(msg))}
//         </ul>
//     )
// }


// export default Messages