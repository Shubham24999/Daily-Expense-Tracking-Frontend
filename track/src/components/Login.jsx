import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Divider,
  Paper
} from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export default function Login({ setUserLoggedIn }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
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

    axios.post('http://127.0.0.1:8080/auth/login', formData)
      .then((response) => {
        const res = response.data;

        if (res.status === "OK" && res.data) {
          const { token, id, name } = res.data;
          localStorage.setItem('token', token);
          localStorage.setItem('userId', id);
          localStorage.setItem('name', name);
          localStorage.removeItem('demoUserEmail');

          toast.success("Login successful!");
          setUserLoggedIn(true);
          navigate('/');
        } else {
          toast.error(res.message || "Something went wrong.");
        }
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          const res = err.response.data;
          if (res.status === "FAIL" && res.message.includes("User not found!")) {
            toast.warn("No account found. Please sign up first.");
            navigate('/signin');
          } else if (res.status === "FAIL" && res.message.includes("Invalid credentials")) {
            toast.warn("Incorrect email or password.");
          } else {
            toast.error(res.message || "Login failed.");
          }
        } else {
          toast.error("Login failed. Please try again later.");
        }
        console.error("Login error:", err);
      });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #4e54c8, #8f94fb)',
        p: 2
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          width: 350,
          borderRadius: 4,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)'
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: 700, color: '#4e54c8' }}
        >
          Login
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

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              py: 1.2,
              fontWeight: 600,
              background: 'linear-gradient(90deg, #4e54c8, #8f94fb)'
            }}
          >
            Login
          </Button>
        </form>

        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Typography variant="body2">
            Don't have an account? <a href="/signin">Sign Up</a>
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }}>OR</Divider>

        <Button
          fullWidth
          variant="outlined"
          color="primary"
          href="/auth/google"
          sx={{ py: 1.2, fontWeight: 600 }}
        >
          Login with Google
        </Button>
      </Paper>
    </Box>
  );
}










// import React, { useState } from 'react';
// import {
//   Box,
//   Typography,
//   Button,
//   TextField,
//   Divider,
//   Paper
// } from '@mui/material';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// import { useNavigate } from 'react-router-dom';

// export default function Login({ setUserLoggedIn }) {

//   const navigate = useNavigate();


//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value
//     }));

//   };

//   const handleEmailLogin = (e) => {
//     e.preventDefault();

//     axios.post('http://127.0.0.1:8080/auth/login', formData)
//       .then((response) => {
//         const res = response.data;

//         if (res.status === "OK" && res.data) {
//           const { token, id, name } = res.data;

//           localStorage.setItem('token', token);
//           localStorage.setItem('userId', id);
//           localStorage.setItem('name', name);
//           localStorage.removeItem('demoUserEmail');

//           toast.success("Login successful!");
//           setUserLoggedIn(true);
//           navigate('/');  // Redirect to dashboard
//         } else {
//           toast.error(res.message || "Something went wrong.");
//         }
//       })
//       .catch((err) => {
//         if (err.response && err.response.data) {
//           const res = err.response.data;

//           if (res.status === "FAIL" && res.message.includes("User not found!")) {
//             toast.warn("No account found. Please sign up first.");
//             navigate('/signin');
//           } else if (res.status === "FAIL" && res.message.includes("Invalid credentials")) {
//             toast.warn("Incorrect email or password.");
//           } else {
//             toast.error(res.message || "Login failed.");
//           }
//         } else {
//           toast.error("Login failed. Please try again later.");
//         }

//         console.error("Login error:", err);
//       });
//   };




//   return (
//     <>
//       <Box
//         sx={{
//           mt: 5, // Margin from topbar
//           mb: 5,
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           bgcolor: '#f5f5f5',
//         }}
//       >
//         <Paper elevation={3} sx={{ padding: 4, width: 320 }}>
//           <Typography variant="h5" align="center" gutterBottom>
//             Expenses Tracker Login
//           </Typography>

//           <form onSubmit={handleEmailLogin}>
//             <TextField
//               label="Email"
//               name="email"
//               type="email"
//               fullWidth
//               required
//               margin="normal"
//               value={formData.email}
//               onChange={handleChange}
//             />
//             <TextField
//               label="Password"
//               name="password"
//               type="password"
//               fullWidth
//               required
//               margin="normal"
//               value={formData.password}
//               onChange={handleChange}
//             />

//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 2 }}
//             >
//               Login
//             </Button>
//           </form>
//           <Box sx={{ textAlign: 'center', mt: 2 }}>
//             <Typography variant="body2">
//               Don't have an account? <a href="/signin">Sign Up</a>
//             </Typography>
//           </Box>

//           <Divider sx={{ my: 3 }}>OR</Divider>

//           <Button
//             fullWidth
//             variant="contained"
//             color="primary"
//             href="/auth/google"
//           >
//             Login with Google
//           </Button>
//         </Paper>
//       </Box>


//     </>
//   );
// }
