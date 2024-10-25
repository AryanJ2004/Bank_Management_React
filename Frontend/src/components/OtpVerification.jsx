import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box, Paper } from '@mui/material';
import axios from 'axios';

function OTPVerification() {
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the OTP requirement flag is set
        const requiresOTP = localStorage.getItem('requiresOTP');
        if (!requiresOTP) {
            navigate('/login'); // Redirect to login if no OTP is required
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const email = localStorage.getItem('email');
            const response = await axios.post('https://bankbackend1.vercel.app/api/auth/verify-otp', { email, otp });
            localStorage.setItem('token', response.data.token);
            
            // Remove the OTP requirement flag after successful verification
            localStorage.removeItem('requiresOTP');
            navigate('/dashboard');
        } catch (err) {
            console.error(err.response.data);
            alert(err.response.data.message);
        }
    };

    return (
        <Container component="main" maxWidth="xs" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'calc(100vh - 64px)' }}>
            <Paper elevation={6} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                <Typography component="h1" variant="h5" align="center" gutterBottom>
                    Verify OTP
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{ py: 1.5, fontSize: '1rem', mb: 2 }}>
                        Verify OTP
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}

export default OTPVerification;
