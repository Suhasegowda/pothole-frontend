import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    localStorage.setItem('civiclens_user', JSON.stringify({ 
      name, 
      email, 
      password,
      memberSince: Date.now() 
    }));
    localStorage.setItem('issuesCount', '0');
    alert('Account created successfully! Please login.');
    navigate('/login');
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0f172a]">
      {/* Background */}
      <div className="bg-animation"></div>

      {/* Floating Shapes */}
      <div className="circle circle1"></div>
      <div className="circle circle2"></div>
      <div className="circle circle3"></div>

      {/* Main Container */}
      <div className="min-h-screen flex items-center justify-center px-5 relative z-10 py-12">
        <div className="glass w-full max-w-4xl rounded-3xl overflow-hidden grid md:grid-cols-2">
          {/* Left Side */}
          <div className="hidden md:flex flex-col justify-center items-center text-white p-14 relative bg-sky-600/20 backdrop-blur-sm">
            <h1 className="text-5xl font-bold mb-6 leading-tight text-center">
              Join Us
            </h1>

            <p className="text-lg text-gray-200 text-center max-w-md">
              Create an account and start making a difference in your community today.
            </p>

            {/* Logo */}
            <img 
              src="/logo_transparent.png" 
              alt="CivicLens" 
              className="w-64 mt-8 drop-shadow-lg rounded-2xl" 
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>

          {/* Right Side */}
          <div className="bg-white p-10 md:p-14">
            <div className="mb-8">
              <h2 className="text-4xl font-bold text-slate-800">
                Sign Up
              </h2>
              <p className="text-gray-500 mt-2">
                Create your account to continue
              </p>
            </div>

            {/* Signup Form */}
            <form onSubmit={handleSignup}>
              {/* Name */}
              <div className="mb-5">
                <label className="block text-gray-700 font-semibold mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="input-box w-full px-5 py-4 rounded-2xl border border-gray-300 outline-none text-slate-800 bg-white"
                />
              </div>

              {/* Email */}
              <div className="mb-5">
                <label className="block text-gray-700 font-semibold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="input-box w-full px-5 py-4 rounded-2xl border border-gray-300 outline-none text-slate-800 bg-white"
                />
              </div>

              {/* Password */}
              <div className="mb-7">
                <label className="block text-gray-700 font-semibold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create password"
                  className="input-box w-full px-5 py-4 rounded-2xl border border-gray-300 outline-none text-slate-800 bg-white"
                />
              </div>

              {/* Signup Button */}
              <button
                type="submit"
                className="signup-btn w-full bg-gradient-to-r from-sky-500 to-cyan-400 text-white py-4 rounded-2xl font-bold text-lg border-0 cursor-pointer"
              >
                Create Account
              </button>
            </form>

            {/* Login Link */}
            <p className="text-center mt-8 text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-sky-500 font-bold hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
