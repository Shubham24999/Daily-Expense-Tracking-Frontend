
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
import Settings from './components/Settings';

function App() {

  const [userLoggedIn, setUserLoggedIn] = useState(!!localStorage.getItem('token'));

  // Set demo data if not logged in
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

  console.log("user is ........", userLoggedIn);


  return (
    <div className="App">
      <Router>
        <TopBar userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn} />
        <Routes>
          <Route path="/" element={<Dashboard userLoggedIn={userLoggedIn} />} />
          <Route path="/signin" element={<SignIn setUserLoggedIn={setUserLoggedIn} />} />
          <Route path="/login" element={<Login setUserLoggedIn={setUserLoggedIn} />} />
          <Route path="/logout" element={<LogOut setUserLoggedIn={setUserLoggedIn} />} />
          <Route path="/profile" element={<Profile userLoggedIn={userLoggedIn} />} />
          <Route path="/expense-reports" element={<ExpenseReports userLoggedIn={userLoggedIn} />} />
          <Route path="/settings" element={<Settings userLoggedIn={userLoggedIn} />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </Router>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}

export default App;

