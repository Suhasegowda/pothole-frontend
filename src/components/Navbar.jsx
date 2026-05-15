import { Link, useLocation } from 'react-router-dom';
import { Camera, Map, Trophy, History as HistoryIcon, LogOut } from 'lucide-react';

function Navbar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <img src="/logo.jpg" alt="CivicLens AI Logo" style={{ height: '40px', objectFit: 'contain' }} />
        </div>
        <div className="nav-links">
          <Link to="/dashboard" className={`nav-link ${isActive('/dashboard')}`}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Map size={18} /> Map & Report
            </div>
          </Link>
          <Link to="/leaderboard" className={`nav-link ${isActive('/leaderboard')}`}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Trophy size={18} /> Leaderboard
            </div>
          </Link>
          <Link to="/history" className={`nav-link ${isActive('/history')}`}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <HistoryIcon size={18} /> History
            </div>
          </Link>
          <Link to="/login" className="nav-link" style={{ marginLeft: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <LogOut size={18} /> Logout
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
