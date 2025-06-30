

import React,{useState} from 'react';
import {
  Container,
  Typography,
  Button,
  Paper,
  Box,
  TextField,
  Divider
} from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';

const SignIn = () => {

  // alert("Google Sign Up Clicked");

  const [formData, setFormData] = useState({
      email: '',
      password: '',
      mobileNo: ''
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

                <TextField
                  label="Mobile No"
                  name="mobileNo"
                  type="text"
                  fullWidth
                  required
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
                Login If you have an account
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
