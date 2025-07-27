import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';

import Dashboard from './components/Dashboard';
import Login from './components/Login';
import LogOut from './components/LogOut';
import SignIn from './components/SignIn';
import TopBar from './components/TopBar';
import Profile from './components/Profile';
import ExpenseReports from './components/ExpenseReports';

// Utility to decode JWT and extract payload
const parseJwt = (token) => {
  try {
    const base64Payload = token.split('.')[1];
    const decodedPayload = atob(base64Payload);
    return JSON.parse(decodedPayload);
  } catch (e) {
    return null;
  }
};

function App() {
  var backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';
  const [userLoggedIn, setUserLoggedIn] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const checkTokenValidity = () => {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded = parseJwt(token);
        if (decoded?.exp) {
          const now = Math.floor(Date.now() / 1000);
          if (decoded.exp < now) {
            console.warn('Token expired, logging out...');
            localStorage.removeItem('token');
            setUserLoggedIn(false);
            window.location.href = "/login"; // force redirect
          }
        }
      }
    };

    checkTokenValidity();
    const interval = setInterval(checkTokenValidity, 60 * 1000); // check every 1 min

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!userLoggedIn) {
      localStorage.setItem('demoUserEmail', 'demo@example.com');
      localStorage.setItem('demoUserExpenses', JSON.stringify([
        { id: 1, spentDetails: 'Demo Food', spentAmount: 500, expenseCreatedTimeEpoch: Math.floor(Date.now() / 1000) },
        { id: 2, spentDetails: 'Demo Transport', spentAmount: 300, expenseCreatedTimeEpoch: Math.floor(Date.now() / 1000) },
        { id: 3, spentDetails: 'Demo Shopping', spentAmount: 700, expenseCreatedTimeEpoch: Math.floor(Date.now() / 1000) }
      ]));
      localStorage.setItem('demoUserSummary', JSON.stringify({
        totalSpent: 1500,
        remaining: 1000,
        budget: 2500,
        exceeded: false
      }));
    }
  }, [userLoggedIn]);

  return (
    <div className="App">
      <Router>
        <TopBar userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn} />
        <Routes>
          <Route path="/" element={<Dashboard userLoggedIn={userLoggedIn} backendUrl={backendUrl} />} />
          <Route path="/signin" element={<SignIn setUserLoggedIn={setUserLoggedIn} backendUrl={backendUrl} />} />
          <Route path="/login" element={<Login setUserLoggedIn={setUserLoggedIn} backendUrl={backendUrl} />} />
          <Route path="/logout" element={<LogOut setUserLoggedIn={setUserLoggedIn} />} />
          <Route path="/profile" element={<Profile userLoggedIn={userLoggedIn} backendUrl={backendUrl} />} />
          <Route path="/expense-reports" element={<ExpenseReports userLoggedIn={userLoggedIn} backendUrl={backendUrl} />} />
          {/* <Route path="/settings" element={<Settings userLoggedIn={userLoggedIn} />} /> */}
          <Route path="*" element={<div>Content You are Searching is not found.</div>} />
        </Routes>
      </Router>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}

export default App;
