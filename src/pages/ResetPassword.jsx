import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset link sent to your email.');
      navigate('/login');
    } catch (error) {
      alert(error.message);
      console.error(error);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
      <form onSubmit={handleReset} className="space-y-4">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-2 border"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2">
          Send Reset Link
        </button>
      </form>
    </div>
  );
}
