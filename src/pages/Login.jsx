import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    const savedUser = localStorage.getItem('civiclens_user');
    
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      if (parsedUser.email === email && parsedUser.password === password) {
        navigate('/dashboard');
      } else {
        setError('Incorrect email or password.');
      }
    } else {
      setError('No account found. Please Create an Account first.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-5 relative z-10 bg-slate-900 text-white overflow-hidden">
      <div className="bg-animation"></div>
      <div className="circle circle1"></div>
      <div className="circle circle2"></div>
      <div className="circle circle3"></div>
      <div className="glass w-full max-w-6xl rounded-3xl overflow-hidden grid md:grid-cols-2 relative z-10">
        {/* Left Side */}
        <div className="hidden md:flex flex-col justify-center items-center text-white p-14 relative">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Welcome Back
          </h1>
          <p className="text-lg text-gray-200 text-center max-w-md">
            Smart login experience with modern UI design,
            animations and glassmorphism effects.
          </p>
          {/* Illustration */}
          <div className="bg-white p-2 rounded-2xl shadow-xl mt-10 animate-bounce">
            <img
              src="/logo.jpeg"
              alt="CivicLens AI"
              className="w-64 rounded-xl"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="bg-white p-10 md:p-16">
          <div className="mb-10">
            <h2 className="text-4xl font-bold text-slate-800">
              Sign In
            </h2>
            <p className="text-gray-500 mt-2">
              Login to continue
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin}>
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-200">
                {error}
              </div>
            )}
            
            {/* Email */}
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="input-box w-full px-5 py-4 rounded-xl border border-gray-300 outline-none text-slate-800 bg-white"
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="input-box w-full px-5 py-4 rounded-xl border border-gray-300 outline-none text-slate-800 bg-white"
              />
            </div>

            {/* Remember */}
            <div className="flex justify-between items-center mb-8 text-sm">
              <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                <input type="checkbox" className="w-4 h-4" />
                Remember me
              </label>
              <a href="#" className="text-blue-600 hover:underline">
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="login-btn w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-4 rounded-xl font-bold text-lg border-0"
            >
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-8">
            <hr className="flex-grow border-gray-300" />
            <span className="px-3 text-gray-400 text-sm">
              OR
            </span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Social Login */}
          <button
            className="w-full border border-gray-300 py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-100 transition text-slate-800 font-medium"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/300/300221.png"
              width="22"
              alt="Google"
            />
            Continue with Google
          </button>

          {/* Signup */}
          <p className="text-center text-gray-600 mt-8">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-600 font-bold hover:underline">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
