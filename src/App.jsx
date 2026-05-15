import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import Leaderboard from './pages/Leaderboard';
import MapView from './pages/MapView';
import Profile from './pages/Profile';
import Stats from './pages/Stats';
import Landing from './pages/Landing';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <Routes>
                {/* Full screen routes */}
                <Route path="/map" element={<div className="pt-16"><MapView /></div>} />
                
                {/* Contained routes */}
                <Route
                  path="*"
                  element={
                    <div className="page-wrapper">
                      <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/history" element={<History />} />
                        <Route path="/leaderboard" element={<Leaderboard />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/stats" element={<Stats />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                      </Routes>
                    </div>
                  }
                />
              </Routes>
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
