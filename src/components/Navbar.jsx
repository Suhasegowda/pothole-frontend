import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Camera, Map, Trophy, History as HistoryIcon, LogOut, User, LayoutDashboard, BarChart3, ChevronDown } from 'lucide-react';

function Navbar() {
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path ? 'text-cyan-500 bg-cyan-50' : 'text-slate-600 hover:text-cyan-500 hover:bg-slate-50';
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-20 bg-white border-b border-slate-200 z-50 flex items-center px-6 shadow-sm">
      <div className="w-full max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="/logo_transparent.png" 
            alt="CivicLens AI Logo" 
            className="h-16 w-auto object-contain" 
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <span className="font-bold text-2xl text-sky-500">CivicLens</span>
        </Link>
        <div className="flex items-center gap-2">
          <Link to="/map" className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${isActive('/map')}`}>
            <Map size={18} /> Map View
          </Link>
          <Link to="/dashboard" className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white bg-cyan-500 hover:bg-cyan-500 transition">
            <Camera size={18} /> Report Issue
          </Link>

          {/* User Profile Dropdown */}
          <div className="relative ml-4">
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-200 hover:bg-slate-50 transition"
            >
              <div className="w-6 h-6 rounded-full bg-cyan-500 text-white flex items-center justify-center font-bold text-xs overflow-hidden">
                {localStorage.getItem('userAvatar') ? (
                  <img src={localStorage.getItem('userAvatar')} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span>
                    {localStorage.getItem('civiclens_user') 
                      ? (JSON.parse(localStorage.getItem('civiclens_user')).firstName?.[0] || JSON.parse(localStorage.getItem('civiclens_user')).name?.[0] || 'U').toUpperCase() 
                      : 'U'}
                  </span>
                )}
              </div>
              <span className="text-sm font-bold text-slate-700">
                {localStorage.getItem('civiclens_user') 
                  ? (JSON.parse(localStorage.getItem('civiclens_user')).firstName || JSON.parse(localStorage.getItem('civiclens_user')).name || 'User').split(' ')[0]
                  : 'User'}
              </span>
              <ChevronDown size={14} className="text-slate-500" />
            </button>

            {dropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40"
                  onClick={() => setDropdownOpen(false)}
                ></div>
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-50">
                  <Link to="/profile" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-cyan-500 transition">
                    <User size={16} /> Profile
                  </Link>
                  <Link to="/leaderboard" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-cyan-500 transition">
                    <Trophy size={16} /> Leaderboard
                  </Link>
                  <Link to="/history" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-cyan-500 transition">
                    <HistoryIcon size={16} /> My Issues
                  </Link>
                  <div className="h-px bg-slate-100 my-2"></div>
                  <Link to="/login" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition">
                    <LogOut size={16} /> Logout
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
