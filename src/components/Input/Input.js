 
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const Input = ({ onSendMessage }) => {
    const [text, setText] = useState("");
    const [file, setFile] = useState(null);

    const onChange = (e) => {
        setText(e.target.value);
    };

    const onChangeFile = (e) => {
        setFile(e.target.files[0]);
    };

    const onSubmit = () => {
        setText("");
        setFile(null);
        onSendMessage(text, file);
    };

    const handleFileUploadClick = () => {
        document.getElementById('file-input').click();
    };

    return (
        <div className="message-input">
            <TextField
                className="inputField"
                label="Type your message here..."
                placeholder="Enter your message and press ENTER"
                onChange={onChange}
                margin="normal"
                value={text}
                onKeyPress={event => {
                    if (event.key === 'Enter') {
                        onSubmit();
                    }
                }}
                style={{ height: "30px", width: "60%" }}
            />
            
            <input
                type="file"
                id="file-input"
                style={{ display: 'none' }}
                onChange={onChangeFile}
            />
            
            <Button
                variant="contained"
                color="default"
                onClick={handleFileUploadClick}
                style={{ marginLeft: '10px' }}
            >
                Upload File
            </Button>

            <Button 
                variant="contained" 
                color="primary" 
                onClick={onSubmit}
                style={{ marginLeft: '10px' }}
            >
                Send
            </Button>
        </div>
    );
}

export default Input;

 