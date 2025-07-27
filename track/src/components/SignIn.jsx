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

const SignIn = ({ setUserLoggedIn, backendUrl }) => {
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

    axios.post(`${backendUrl}/auth/signup`, formData)
      .then((response) => {
        const res = response.data;

        if (res.status === "Ok" && res.data) {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('userId', res.data.id);
          localStorage.setItem('name', res.data.name);
          setUserLoggedIn(true);
          navigate('/');
        } else {
          toast.warn(`Signup failed: ${res.message}`);
        }
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          const res = err.response.data;
          if (res.status === "FAIL" && res.message.includes("Email already exists!")) {
            toast.warn(`${res.message} Please use another for Signup`);
          } else {
            toast.error(`Signup failed: ${res.message}`);
          }
        } else {
          toast.error("Signup failed. Please try again.");
        }
      });
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            width: '100%',
            maxWidth: 400,
            borderRadius: 2
          }}
        >
          <Typography variant="h5" align="center" fontWeight={600} gutterBottom>
            Create Account
          </Typography>

          <form onSubmit={handleEmailSignUp}>
            <TextField
              label="User Name"
              name="name"
              type="text"
              fullWidth
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
              margin="normal"
              value={formData.mobileNo}
              onChange={handleChange}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, py: 1.2, fontWeight: 600 }}
            >
              Sign Up
            </Button>
          </form>

          <Divider sx={{ my: 3 }}>OR</Divider>

          <Typography variant="body1" align="center" gutterBottom>
            Already have an account?
          </Typography>

          <Button
            fullWidth
            variant="outlined"
            href="/login"
            sx={{ py: 1.2, fontWeight: 600 }}
          >
            Log In
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default SignIn;
