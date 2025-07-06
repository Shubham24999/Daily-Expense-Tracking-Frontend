

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Divider,
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
        console.log("Login response:", response);

        if (res.status === "OK" && res.data) {
          const { token, id, name } = res.data;

          localStorage.setItem('token', token);
          localStorage.setItem('userId', id);
          localStorage.setItem('name', name);
          localStorage.removeItem('demoUserEmail');

          toast.success("Login successful!");
          setUserLoggedIn(true);
          navigate('/');  // ✅ Redirect to Dashboard
        } else if (res.status === "FAIL" && res.message.includes("User not found! Please sign up before logging in.")) {
          navigate('/signin');
          toast.warn("No account found. Please Sign up before logging.");         
        } else {
          toast.error(res.message || "Something went wrong...");
        }
      })
      .catch((error) => {

        console.error("Login error:", error);
        toast.error("Login failed. Please check your credentials.");
      });
  };



  return (
    <>
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
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2">
              Don't have an account? <a href="/signin">Sign Up</a>
            </Typography>
          </Box>

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


    </>
  );
}
