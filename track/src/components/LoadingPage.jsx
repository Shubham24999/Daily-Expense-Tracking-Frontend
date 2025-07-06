import { CircularProgress } from "@mui/material";



export default function LoadingPage() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <h1>Loading Expense Details...</h1>
            <CircularProgress sx={{ mt: 4 }} />
        </div>
    );
}