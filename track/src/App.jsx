
import './App.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import LogOut from './components/LogOut';
import SignIn from './components/SignIn';
import TopBar from './components/TopBar';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {

  
  return (

    <div className="App">
      <Router>
        <TopBar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<LogOut />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
