import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <nav className="p-4 bg-gray-100 flex justify-between">
      <h2>Blog</h2>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}
