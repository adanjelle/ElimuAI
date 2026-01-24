import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';

const Signup = ({ onSignupSuccess, onNavigateToLogin, onNavigateToChat }) => {
  const [form, setForm] = useState({ 
    name: '', 
    username: '', 
    email: '', 
    password: '', 
    confirmPassword: '',
    agreeTerms: false 
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    setError('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (!form.agreeTerms) {
      setError('Please agree to the terms and conditions');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/auth/signup', {
        name: form.name,
        username: form.username,
        email: form.email,
        password: form.password
      });

      if (response.data.success) {
        onSignupSuccess(response.data.user);
      } else {
        setError(response.data.message || 'Signup failed');
      }
    } catch (error) {
      setError(error.response?.data?.error || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 p-6">
      <div className="max-w-7xl w-full bg-gray-900 rounded-3xl shadow-2xl overflow-hidden grid grid-cols-12">
        {/* Left - Illustration */}
        <div className="col-span-4 hidden md:flex items-center justify-center bg-gradient-to-br from-green-900 via-blue-900 to-purple-900 p-6">
          <div className="w-full h-full flex flex-col justify-center items-center gap-6">
            <div className="w-64 h-64 bg-gradient-to-br from-green-400 to-blue-600 rounded-xl shadow-2xl flex items-center justify-center">
              <svg className="w-32 h-32 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <div className="w-full">
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div className="w-6/12 h-full bg-green-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Center - Main Form */}
        <div className="col-span-12 md:col-span-5 flex items-center justify-center p-8 md:p-12 bg-gradient-to-b from-[#06060a] to-[#0b0b10]">
          <div className="w-full max-w-md">
            <h1 className="text-4xl font-extrabold text-white text-center mb-2">Join AI Assist</h1>
            <p className="text-sm text-gray-300 text-center mb-6">Start your intelligent learning journey today.</p>

            {error && (
              <div className="mb-4 p-3 bg-red-900 border border-red-700 text-red-200 rounded-md text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 bg-transparent">
              <div>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full name"
                  className="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <input
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="Username"
                  className="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Email address"
                  className="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                  disabled={loading}
                />
              </div>

              <div className="relative">
                <input
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  className="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(s => !s)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-200"
                  aria-label="Toggle password visibility"
                  disabled={loading}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>

              <div>
                <input
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Confirm password"
                  className="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                  disabled={loading}
                />
              </div>

              <div className="flex items-start gap-2 text-sm">
                <input 
                  name="agreeTerms" 
                  type="checkbox" 
                  checked={form.agreeTerms} 
                  onChange={handleChange} 
                  className="w-4 h-4 rounded bg-gray-700 mt-1" 
                  disabled={loading}
                />
                <label className="text-gray-300">
                  I agree to the <a href="#" className="text-green-400 underline">Terms and Conditions</a> and <a href="#" className="text-green-400 underline">Privacy Policy</a>
                </label>
              </div>

              <button 
                type="submit" 
                className="w-full py-3 rounded-md bg-green-500 text-gray-900 font-semibold hover:opacity-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>

              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-gray-700" />
                <div className="text-sm text-gray-400">Or continue with</div>
                <div className="flex-1 h-px bg-gray-700" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button type="button" className="py-2 rounded-md bg-black bg-opacity-50 border border-gray-700 text-gray-100 hover:bg-gray-800 transition">Google</button>
                <button type="button" className="py-2 rounded-md bg-black bg-opacity-50 border border-gray-700 text-gray-100 hover:bg-gray-800 transition">Facebook</button>
              </div>

              <p className="text-center text-sm text-gray-400">
                Already have an account?{' '}
                <button 
                  type="button" 
                  onClick={onNavigateToLogin} 
                  className="text-green-400 underline hover:text-green-300"
                >
                  Login
                </button>
              </p>

              <p className="text-center text-sm text-gray-400">
                <button 
                  type="button" 
                  onClick={onNavigateToChat} 
                  className="text-blue-400 underline hover:text-blue-300"
                >
                  Back to Chat
                </button>
              </p>
            </form>
          </div>
        </div>

        {/* Right - Mobile preview */}
        <div className="col-span-3 hidden lg:flex items-center justify-center p-6 bg-gradient-to-b from-gray-900 to-gray-800">
          <div className="w-72 bg-gray-800 rounded-3xl p-4 shadow-inner">
            <h2 className="text-lg font-semibold text-white text-center mb-2">Join AI Assist</h2>
            <div className="space-y-3">
              <input placeholder="Full name" className="w-full px-3 py-2 rounded-md bg-gray-700 text-gray-100" />
              <input placeholder="Username" className="w-full px-3 py-2 rounded-md bg-gray-700 text-gray-100" />
              <input placeholder="Email" className="w-full px-3 py-2 rounded-md bg-gray-700 text-gray-100" />
              <input placeholder="Password" type="password" className="w-full px-3 py-2 rounded-md bg-gray-700 text-gray-100" />
              <input placeholder="Confirm Password" type="password" className="w-full px-3 py-2 rounded-md bg-gray-700 text-gray-100" />
              <div className="flex items-center gap-2">
                <input type="checkbox" /> <span className="text-xs text-gray-300">I agree to terms</span>
              </div>
              <button className="w-full py-2 rounded-md bg-green-500 text-gray-900 font-semibold">Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;