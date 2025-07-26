import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  // Divider,
  Paper
} from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export default function Login({ setUserLoggedIn }) {
  const navigate = useNavigate();

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

    axios.post('http://127.0.0.1:8080/auth/login', formData)
      .then((response) => {
        const res = response.data;

        if (res.status === "OK" && res.data) {
          const { token, id, name } = res.data;
          localStorage.setItem('token', token);
          localStorage.setItem('userId', id);
          localStorage.setItem('name', name);
          localStorage.removeItem('demoUserEmail');

          toast.success("Login successful!");
          setUserLoggedIn(true);
          navigate('/');
        } else {
          toast.error(res.message || "Something went wrong.");
        }
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          const res = err.response.data;
          if (res.status === "FAIL" && res.message.includes("User not found!")) {
            toast.warn("No account found. Please sign up first.");
            navigate('/signin');
          } else if (res.status === "FAIL" && res.message.includes("Invalid credentials")) {
            toast.warn("Incorrect email or password.");
          } else {
            toast.error(res.message || "Login failed.");
          }
        } else {
          toast.error("Login failed. Please try again later.");
        }
        console.error("Login error:", err);
      });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#f4f4f4',
        minHeight: 'calc(100vh - 64px)', // assumes topbar height ~64px
        pt: 6 // only some padding top
      }}
    >

      <Paper
        elevation={1}
        sx={{
          padding: 4,
          width: 360,
          borderRadius: 2,
          backgroundColor: '#ffffff'
        }}
      >
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ fontWeight: 600 }}
        >
          Login
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

        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Typography variant="body2">
            Don't have an account? <a href="/signin">Sign Up</a>
          </Typography>
        </Box>

        {/*
         In Next Version:
         Note: The Google login button is commented out as it requires backend support.
        */}
        {/* <Divider sx={{ my: 3 }}>OR</Divider> */}

        {/* <Button
          fullWidth
          variant="outlined"
          color="primary"
          href="/auth/google"
        >
          Login with Google
        </Button> */}
      </Paper>
    </Box>
  );
}

