import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  signInWithPopup,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth, provider } from '../firebase/config';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Google login
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate('/blogs');
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  // Email/password login
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/blogs');
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back</h1>
        
        {/* Email/Password Login Form */}
        <div onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            Login with Email
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500 text-sm">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Google Sign-In */}
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-white text-gray-700 p-3 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.51h5.84c-.25 1.37-.81 2.53-1.74 3.31v2.77h2.81c1.64-1.51 2.59-3.74 2.59-6.34z"
            />
            <path
              fill="#34A853"
              d="M12 23c3.24 0 5.96-1.08 7.95-2.92l-2.81-2.77c-.88.59-2.02.94-3.14.94-2.41 0-4.46-1.63-5.19-3.83H5.92v2.86C7.9 20.92 9.9 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M6.81 13.83c-.18-.55-.28-1.14-.28-1.75s.1-1.2.28-1.75V7.47H5.92C5.34 8.62 5 9.89 5 11.08s.34 2.46.92 3.61l.89-.86z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.36 0 2.58.47 3.54 1.39l2.66-2.66C16.96 1.83 14.76 1 12 1 9.9 1 7.9 2.08 5.92 3.92l.89.86C7.54 3.58 9.59 2.75 12 2.75z"
            />
          </svg>
          Sign in with Google
        </button>

        {/* Links */}
        <div className="text-center mt-6 space-y-2">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-600 hover:underline font-medium">
              Sign up
            </Link>
          </p>
          <p className="text-sm text-gray-600">
            <Link to="/reset" className="text-blue-600 hover:underline font-medium">
              Forgot password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}