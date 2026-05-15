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
    <div className="min-h-screen flex items-center justify-center px-5 relative z-10 bg-slate-900 text-white overflow-hidden">
      <div className="bg-animation"></div>
      <div className="circle circle1"></div>
      <div className="circle circle2"></div>
      <div className="circle circle3"></div>
      <div className="glass w-full max-w-md rounded-3xl p-10 text-white relative z-10">
        {/* Heading */}
        <div className="text-center mb-8">
          <div className="bg-white p-2 rounded-xl inline-block mb-4 shadow-xl">
            <img 
              src="/logo_transparent.png" 
              alt="Logo" 
              className="h-16 object-contain mx-auto" 
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
          <h1 className="text-4xl font-bold mb-3">
            Create Account
          </h1>
          <p className="text-gray-200">
            Register to continue
          </p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSignup}>
          {/* Name */}
          <div className="mb-5">
            <label className="block mb-2 font-semibold">
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="input-box w-full px-5 py-4 rounded-xl bg-white border border-white/30 outline-none placeholder:text-gray-400 text-slate-800"
            />
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="block mb-2 font-semibold">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="input-box w-full px-5 py-4 rounded-xl bg-white border border-white/30 outline-none placeholder:text-gray-400 text-slate-800"
            />
          </div>

          {/* Password */}
          <div className="mb-7">
            <label className="block mb-2 font-semibold">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create password"
              className="input-box w-full px-5 py-4 rounded-xl bg-white border border-white/30 outline-none placeholder:text-gray-400 text-slate-800"
            />
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="signup-btn w-full bg-gradient-to-r from-blue-600 to-cyan-500 py-4 rounded-xl font-bold text-lg border-0 text-white cursor-pointer"
          >
            Create Account
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center mt-8 text-gray-200">
          Already have an account?{' '}
          <Link to="/login" className="text-cyan-300 font-bold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
