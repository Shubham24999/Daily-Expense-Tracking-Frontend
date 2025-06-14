import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function TopBar() {
    const [isLoggedIn, setIsLoggedIn] = React.useState(true);
    const [userName, setUserName] = React.useState('Shubham');
    const [userEmail, setUserEmail] = React.useState('');
    const [userId, setUserId] = React.useState('');

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
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                       {userName} Expenses
                    </Typography>

                    {isLoggedIn ? (
                        <Button color="inherit">LogOut</Button>
                    ) : (
                        <>
                            <Button color="inherit">Login</Button>
                            <Button color="inherit">Sign Up</Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
