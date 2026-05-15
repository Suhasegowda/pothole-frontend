import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-5 relative z-10">
      <div className="glass w-full max-w-md rounded-3xl p-10 text-white">
        {/* Heading */}
        <div className="text-center mb-8">
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
              placeholder="Enter your name"
              className="input-box w-full px-5 py-4 rounded-xl bg-white/20 border border-white/30 outline-none placeholder:text-gray-200 text-white"
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
              placeholder="Enter your email"
              className="input-box w-full px-5 py-4 rounded-xl bg-white/20 border border-white/30 outline-none placeholder:text-gray-200 text-white"
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
              placeholder="Create password"
              className="input-box w-full px-5 py-4 rounded-xl bg-white/20 border border-white/30 outline-none placeholder:text-gray-200 text-white"
            />
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="signup-btn w-full bg-gradient-to-r from-blue-600 to-cyan-500 py-4 rounded-xl font-bold text-lg border-0 text-white"
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
