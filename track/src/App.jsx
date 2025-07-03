
import { ToastContainer } from 'react-toastify';
import './App.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import LogOut from './components/LogOut';
// import PrivateRoute from './components/PrivateRoute';
import SignIn from './components/SignIn';
import TopBar from './components/TopBar';
import { useEffect } from 'react'

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {

  // const userLoggedIn = localStorage.getItem('token') === null ? false : true;
  const userLoggedIn = !!localStorage.getItem('token'); // cleaner way

  useEffect(() => {
    if (!userLoggedIn) {
      // Set demo user data only if token is not present
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
    }
  }, [userLoggedIn]);

  return (

    <div className="App">
      <Router>
        <TopBar />
        <Routes>
          {/* <Route path="/" element={<PrivateRoute element={<Dashboard />} />} /> */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<LogOut />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </Router>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}

export default App;
