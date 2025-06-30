



import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Divider,
  Paper
} from '@mui/material';

export default function LogOut() {


  const handleLogout = (e) => {
    e.preventDefault();
    // 🔐 Replace with real email/password auth logic
    console.log('Log out :',e);
    alert(`Logged out`);
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
    </Box>
  );
}


// function LogOut() {

//     // this should open as pop form

//     const handleLogout = () => {
//         // Logic to handle logout, e.g., clearing user data, redirecting to default home page.
//         console.log("User logged out");
//     };

//     return (
//         <div>
//             <h2>Are you sure you want to log out?</h2>
//             <button onClick={handleLogout} style={{ padding: '10px 20px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '5px' }}>
//                 Log Out
//             </button>
//         </div>
//     );
// }

// export default LogOut;