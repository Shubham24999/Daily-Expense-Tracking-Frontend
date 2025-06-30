

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Divider,
  Paper
} from '@mui/material';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEmailLogin = (e) => {
    e.preventDefault();
    // 🔐 Replace with real email/password auth logic
    console.log('Logging in with:', formData);
    alert(`Logging in with email: ${formData.email}`);
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#f5f5f5',
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, width: 320 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Expenses Tracker Login
        </Typography>

        <form onSubmit={handleEmailLogin}>
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            required
            margin="normal"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            required
            margin="normal"
            value={formData.password}
            onChange={handleChange}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>

        <Divider sx={{ my: 3 }}>OR</Divider>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          href="/auth/google"
        >
          Login with Google
        </Button>
      </Paper>
    </Box>
  );
}
