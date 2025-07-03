import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    AppBar, Box, Toolbar, Typography, Button, IconButton,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { toast } from 'react-toastify';

export default function TopBar() {
    const [openDialog, setOpenDialog] = React.useState(false);
    const navigate = useNavigate();

    const userLoggedIn = !!localStorage.getItem('token');
    const userName = localStorage.getItem('name');
    // const userEmail = localStorage.getItem('email');
    // const userId = localStorage.getItem('userId');

    const handleLogoutConfirm = () => {
        // Clear user data
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        localStorage.removeItem('userLoggedIn');
        localStorage.setItem('demoUserEmail', 'demo@example.com');
        localStorage.setItem('demoUserExpenses', JSON.stringify([
            {
                id: 1,
                spentDetails: 'Demo Food',
                spentAmount: 500,
                expenseCreatedTimeEpoch: Math.floor(Date.now() / 1000),
            },
            {
                id: 2,
                spentDetails: 'Demo Transport',
                spentAmount: 300,
                expenseCreatedTimeEpoch: Math.floor(Date.now() / 1000),
            },
            {
                id: 3,
                spentDetails: 'Demo Shopping',
                spentAmount: 700,
                expenseCreatedTimeEpoch: Math.floor(Date.now() / 1000),
            }
        ]));

        toast.success('Logged out successfully');
        setOpenDialog(false);
        navigate('/');
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
