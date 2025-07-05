

import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Paper,
  Box,
  TextField,
  Divider
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignIn = ({ setUserLoggedIn }) => {

  // alert("Google Sign Up Clicked");
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    email: '',
    password: '',
    mobileNo: '',
    name: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEmailSignUp = (e) => {
    e.preventDefault();

    axios.post('http://127.0.0.1:8080/auth/signup', formData)
      .then((response) => {
        const res = response.data;
        if (res.status === "Ok") {
          // Save token & user info
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('userId', res.data.id);
          localStorage.setItem('name', res.data.name);
          // localStorage.removeItem('demoUserExpenses')
          localStorage.removeItem('demoUserEmail')
          setUserLoggedIn(true);
          navigate('/'); // Redirect to dashboard
        } else {
          console.log("Signup failed: " + res.message);
        }
      })
      .catch((err) => {
        console.error("Signup error", err);
        toast.error("Signup failed. Please try again.");
      });
  };


  return (
    <Container maxWidth="sm">
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
            Expenses Tracker Sign In
          </Typography>

          <form onSubmit={handleEmailSignUp}>
            <TextField
              label="User Name"
              name="name"
              type="text"
              fullWidth
              required
              margin="normal"
              value={formData.name}
              onChange={handleChange}
            />
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

            <TextField
              label="Mobile No"
              name="mobileNo"
              type="text"
              fullWidth
              // required
              margin="normal"
              value={formData.mobileNo}
              onChange={handleChange}

            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
            >
              Sign In
            </Button>
          </form>

          <Divider sx={{ my: 3 }}>OR</Divider>

          <Typography variant="h5" align="center" gutterBottom>
            Already have Account.
          </Typography>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            href="/login"
          >
            Log In
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default SignIn;
