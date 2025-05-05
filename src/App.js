import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ResetPassword from './pages/ResetPassword';
import BlogList from './pages/BlogList';
import BlogAdmin from './pages/BlogAdmin';
import ProtectedRoute from '../src/pages/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset" element={<ResetPassword />} />

        <Route
          path="/blogs"
          element={
            <ProtectedRoute>
              <BlogList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <BlogAdmin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
