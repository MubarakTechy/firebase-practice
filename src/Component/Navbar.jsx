import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useNavigate, Link } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Link to="/" className="text-xl font-bold text-blue-600">
          BlogSite
        </Link>
        <Link to="/blogs" className="text-gray-700 hover:text-blue-600 transition">
          Blogs
        </Link>
        <Link to="/admin" className="text-gray-700 hover:text-blue-600 transition">
          Create Blog
        </Link>
      </div>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </nav>
  );
}
