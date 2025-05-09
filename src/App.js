import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ResetPassword from './pages/ResetPassword';
import BlogList from './pages/BlogList';
import SingleBlog from './pages/SingleBlog';

import BlogAdmin from './pages/admin/BlogAdmin';
import EditBlog from './pages/EditBlog';
import ProtectedRoute from './pages/ProtectedRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageBlogs from './pages/admin/ManageBlogs';
import UserSettings from './pages/admin/UserSettings';
// import Users from './pages/admin/Users';
// import CreateBlog from './pages/admin/CreateBlog';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset" element={<ResetPassword />} />

        {/* Blog Pages */}
        <Route
          path="/blogs"
          element={
            <ProtectedRoute>
              <BlogList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/blog/:slug"
          element={
            <ProtectedRoute>
              <SingleBlog />
            </ProtectedRoute>
          }
        />

        {/* Admin Pages */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <BlogAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
      path="/blog/:id"
      element={
        <ProtectedRoute>
          <SingleBlog />
        </ProtectedRoute>
      }
    />

        <Route
          path="/admin/manage"
          element={
            <ProtectedRoute>
              <ManageBlogs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/UserSettings"
          element={
            <ProtectedRoute>
              <UserSettings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/edit/:id"
          element={
            <ProtectedRoute>
              <EditBlog />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
