import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const Input = ({ onSendMessage }) => {
    const [text, setText] = useState("")
    const [file, setFile] = useState(null);

    let onChange = (e) => {
        setText(e.target.value)
    }
    let onChangeFile = (e) => {
        setFile(e.target.files[0]);
    }
    let onSubmit = () => {
        setText("");
        setFile(null);
        onSendMessage(text, file);
    }

    return (
        <div className="message-input">
            <TextField
                className="inputField"
                label="Type your message here..."
                placeholder="Enter your message and press ENTER"
                onChange={e => onChange(e)}
                margin="normal"
                value={text}
                onKeyPress={event => {
                    if (event.key === 'Enter') {
                        onSubmit(text);
                    }
                }}
                style={{ height: "30px", width: "60%" }}
            />
            <input
                type="file"
                name="file"
                onChange={onChangeFile}
                style={{ marginLeft: "10px" }}
            />

            <Button variant="contained" color="primary" onClick={onSubmit}>
                Send
            </Button>
        </div>
    );
}


export default Input
