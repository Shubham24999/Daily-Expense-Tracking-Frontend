



import React from 'react';
import {
  Box,
  Typography,
  Button,
  Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LogOut() {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();

    // 🔐 Clear all auth-related data
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('name');
    

    toast.success("Logged out successfully!");

    setTimeout(() => {
      navigate("/");
    }, 1500);

  };

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#f5f5f5',
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, width: 320 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Are you sure you want to log out?
        </Typography>

        <form onSubmit={handleLogout}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
          >
            Log Out
          </Button>
        </form>
      </Paper>

      <ToastContainer position="top-center" />
    </Box>
  );
}



