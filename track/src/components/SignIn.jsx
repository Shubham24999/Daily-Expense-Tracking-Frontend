import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Paper,
  Box,
  TextField,
  Divider
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignIn = ({ setUserLoggedIn }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    mobileNo: '',
    name: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEmailSignUp = (e) => {
    e.preventDefault();

    axios.post('http://127.0.0.1:8080/auth/signup', formData)
      .then((response) => {
        const res = response.data;

        if (res.status === "Ok" && res.data) {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('userId', res.data.id);
          localStorage.setItem('name', res.data.name);
          setUserLoggedIn(true);
          navigate('/');
        } else {
          toast.warn(`Signup failed: ${res.message}`);
        }
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          const res = err.response.data;
          if (res.status === "FAIL" && res.message.includes("Email already exists!")) {
            toast.warn(`${res.message} Please use another for Signup`);
          } else {
            toast.error(`Signup failed: ${res.message}`);
          }
        } else {
          toast.error("Signup failed. Please try again.");
        }
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
      <Container maxWidth="xs">
        <Paper
          elevation={6}
          sx={{
            padding: 4,
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
            Create Account
          </Typography>

          <form onSubmit={handleEmailSignUp}>
            <TextField
              label="User Name"
              name="name"
              type="text"
              fullWidth
              margin="normal"
              value={formData.name}
              onChange={handleChange}
            />
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
              margin="normal"
              value={formData.mobileNo}
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
              Sign Up
            </Button>
          </form>

          <Divider sx={{ my: 3 }}>OR</Divider>

          <Typography variant="body1" align="center" gutterBottom>
            Already have an account?
          </Typography>

          <Button
            fullWidth
            variant="outlined"
            color="primary"
            href="/login"
            sx={{ py: 1.2, fontWeight: 600 }}
          >
            Log In
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default SignIn;







// import React, { useState } from 'react';
// import {
//   Container,
//   Typography,
//   Button,
//   Paper,
//   Box,
//   TextField,
//   Divider
// } from '@mui/material';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const SignIn = ({ setUserLoggedIn }) => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     mobileNo: '',
//     name: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleEmailSignUp = (e) => {
//     e.preventDefault();

//     axios.post('http://127.0.0.1:8080/auth/signup', formData)
//       .then((response) => {
//         const res = response.data;

//         if (res.status === "Ok" && res.data) {
//           localStorage.setItem('token', res.data.token);
//           localStorage.setItem('userId', res.data.id);
//           localStorage.setItem('name', res.data.name);
//           localStorage.removeItem('demoUserEmail');
//           setUserLoggedIn(true);
//           navigate('/');
//         } else {
//           toast.warn(`Signup failed: ${res.message}`);
//         }
//       })
//       .catch((err) => {
//         if (err.response && err.response.data) {
//           const res = err.response.data;
//           if (res.status === "FAIL" && res.message.includes("Email already exists!")) {
//             toast.warn(`${res.message} Please use another for Signup`);
//           } else {
//             toast.error(`Signup failed: ${res.message}`);
//           }
//         } else {
//           toast.error("Signup failed. Please try again.");
//         }
//       });
//   };

//   return (
//     <Container maxWidth="sm">
//       <Box
//         sx={{
//           mt: 5, // Margin from topbar
//           mb: 5,
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}
//       >
//         <Paper
//           elevation={4}
//           sx={{
//             padding: 4,
//             width: '100%',
//             maxWidth: 400,
//             borderRadius: 3,
//             backgroundColor: '#ffffff'
//           }}
//         >
//           <Typography variant="h5" align="center" gutterBottom fontWeight={600}>
//             Create Account
//           </Typography>

//           <form onSubmit={handleEmailSignUp}>
//             <TextField
//               label="User Name"
//               name="name"
//               type="text"
//               fullWidth
//               margin="normal"
//               value={formData.name}
//               onChange={handleChange}
//             />
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
//             <TextField
//               label="Mobile No"
//               name="mobileNo"
//               type="text"
//               fullWidth
//               margin="normal"
//               value={formData.mobileNo}
//               onChange={handleChange}
//             />

//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               color="primary"
//               sx={{ mt: 2, py: 1 }}
//             >
//               Sign Up
//             </Button>
//           </form>

//           <Divider sx={{ my: 3 }}>OR</Divider>

//           <Typography variant="body1" align="center" gutterBottom>
//             Already have an account?
//           </Typography>

//           <Button
//             fullWidth
//             variant="outlined"
//             color="primary"
//             href="/login"
//             sx={{ py: 1 }}
//           >
//             Log In
//           </Button>
//         </Paper>
//       </Box>
//     </Container>
//   );
// };

// export default SignIn;
