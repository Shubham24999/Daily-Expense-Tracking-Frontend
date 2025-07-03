import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    AppBar, Box, Toolbar, Typography, Button, IconButton,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { toast } from 'react-toastify';

export default function TopBar({ userLoggedIn, setUserLoggedIn }) {
    const [openDialog, setOpenDialog] = React.useState(false);
    const navigate = useNavigate();

    const userName = localStorage.getItem('name');

    const handleLogoutConfirm = () => {
        // Clear user data
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        localStorage.removeItem('userLoggedIn');
      
        setUserLoggedIn(false);

        toast.success('Logged out successfully');
        setOpenDialog(false);
        // window.location.href = "/";   tis is not a good method
        navigate("/");
    
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {userName ? `${userName}'s Expenses` : 'Demo User Expenses'}
                    </Typography>

                    {userLoggedIn ? (
                        <Button color="inherit" onClick={() => setOpenDialog(true)}>LogOut</Button>
                    ) : (
                        <>
                            <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
                            <Button color="inherit" onClick={() => navigate('/signin')}>Sign Up</Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>

            {/* Logout Confirmation Dialog */}
            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
            >
                <DialogTitle>Confirm Logout</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to log out?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button onClick={handleLogoutConfirm} color="error" variant="contained">Log Out</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
