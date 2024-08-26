import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import axios from 'axios';

// Define styles using styled
const Container = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    margin: theme.spacing(1),
    width: '300px',
}));

const StyledButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(1),
}));

const RegisterForm = ({ onBack }) => {
    const [username, setUsername] = useState("");
    const [kingdom, setKingdom] = useState("");
    const [error, setError] = useState("");

    const handleUsernameChange = (event) => setUsername(event.target.value);
    const handleKingdomChange = (event) => setKingdom(event.target.value);

    const handleSubmit = () => {
        if (username && kingdom) {
            axios.post('http://localhost:8080/api/v1/users/register', { username, kingdom })
                .then(response => {
                    console.log('User registered:', response.data);
                    // Handle successful registration (e.g., redirect to login page or show success message)
                })
                .catch(err => {
                    console.error('Registration error:', err);
                    setError("An error occurred during registration.");
                });
        } else {
            setError("Username and kingdom are required.");
        }
    };

    return (
        <Container>
            <StyledTextField
                label="Username"
                placeholder="Username"
                onChange={handleUsernameChange}
                margin="normal"
                value={username}
                autoFocus
            />
            <StyledTextField
                label="Kingdom"
                placeholder="Kingdom"
                onChange={handleKingdomChange}
                margin="normal"
                value={kingdom}
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <StyledButton
                variant="contained"
                color="primary"
                onClick={handleSubmit}
            >
                Register
            </StyledButton>
            <StyledButton
                variant="contained"
                color="secondary"
                onClick={onBack}
            >
                Back to Login
            </StyledButton>
        </Container>
    );
}

export default RegisterForm;
