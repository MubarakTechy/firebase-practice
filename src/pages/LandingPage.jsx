import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="text-center p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Blog Website</h1>
      <p className="mb-4">Read and explore amazing blogs or sign in to start managing content.</p>
      <Link
        to="/login"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Login
      </Link>
    </div>
  );
}
