import * as React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    AppBar, Box, Toolbar, Typography, Button, IconButton,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import LogoutIcon from '@mui/icons-material/Logout';
import { toast } from 'react-toastify';

export default function TopBar({ userLoggedIn, setUserLoggedIn }) {
    const [openDialog, setOpenDialog] = React.useState(false);
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const navigate = useNavigate();

    var userName;
    if (userLoggedIn) {
        userName = localStorage.getItem('name');
    } else {
        userName = 'Demo User';
    }

    const handleLogoutConfirm = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        setUserLoggedIn(false);
        toast.success('Logged out successfully');
        setOpenDialog(false);
        navigate("/");
    };

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    const handleMenuClick = (path) => {

        if (path === "/expense-reports" && !userLoggedIn) {
            // ✅ If user is not logged in, redirect to login page
            toast.info("Please login to access this page");
            navigate("/login");
        } else {
            navigate(path);
        }
        setDrawerOpen(false);

        // navigate(path);
        // setDrawerOpen(false);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <Link to="/" style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
                                {userName ? `${userName}'s Expenses` : 'Demo User Expenses'}
                            </Link>
                        </Typography>
                    </Box>

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

            {/* Sidebar Drawer */}
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => handleMenuClick("/profile")}>
                                <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                                <ListItemText primary="Profile" />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton onClick={() => handleMenuClick("/expense-reports")}>
                                <ListItemIcon><ReceiptLongIcon /></ListItemIcon>
                                <ListItemText primary="Expense Reports" />
                            </ListItemButton>
                        </ListItem>


                        {/* <ListItem disablePadding>
                            <ListItemButton onClick={() => handleMenuClick("/settings")}>
                                <ListItemIcon><SettingsIcon /></ListItemIcon>
                                <ListItemText primary="Settings" />
                            </ListItemButton>
                        </ListItem> */}

                        <Divider />

                        <ListItem disablePadding>
                            <ListItemButton onClick={() => {
                                if (!userLoggedIn) {
                                    toast.warning("Please Login First");
                                } else {
                                    setOpenDialog(true);
                                }
                            }}>
                                <ListItemIcon><LogoutIcon color="error" /></ListItemIcon>
                                <ListItemText primary="Log Out" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>

            {/* Logout Confirmation Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Confirm Logout</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure you want to log out?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button onClick={handleLogoutConfirm} color="error" variant="contained">Log Out</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}