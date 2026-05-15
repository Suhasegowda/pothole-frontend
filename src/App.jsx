import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import Leaderboard from './pages/Leaderboard';

function App() {
  return (
    <Router>
      <div className="bg-animation"></div>
      <div className="circle circle1"></div>
      <div className="circle circle2"></div>
      <div className="circle circle3"></div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <div className="page-wrapper">
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/history" element={<History />} />
                  <Route path="/leaderboard" element={<Leaderboard />} />
                  <Route path="*" element={<Navigate to="/login" replace />} />
                  <Route path="/" element={<Navigate to="/login" replace />} />
                </Routes>
              </div>
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
