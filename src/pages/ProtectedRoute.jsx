// components/ProtectedRoute.jsx
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const { user, loading } = useUser();

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (!user) {
    const encodedPath = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?redirect=${encodedPath}`} replace />;
  }

  return children;
}
