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
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>

      {/* Email/Password Login Form */}
      <form onSubmit={handleEmailLogin} className="space-y-4 mb-6">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2">
          Login with Email
        </button>
      </form>

      {/* Google Sign-In */}
      <button
        onClick={handleGoogleLogin}
        className="w-full bg-purple-500 text-white p-2 mb-4"
      >
        Sign in with Google
      </button>

      {/* Links */}
      <div className="text-center">
        <Link to="/signup" className="text-green-600 underline">
          Don't have an account? Sign up
        </Link>
        <br />
        <Link to="/reset" className="text-red-600 underline">
          Forgot password?
        </Link>
      </div>
    </div>
  );
}
