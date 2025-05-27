
export default function Login() {

    // How to get username from jwt token in React?

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <Typography variant="h4" gutterBottom>
                Welcome to Track
            </Typography>
            <Typography variant="body1" gutterBottom>
                Please log in to continue
            </Typography>
            <Button variant="contained" color="primary" href="/auth/google">
                Login with Google
            </Button>
        </Box>
    );
}