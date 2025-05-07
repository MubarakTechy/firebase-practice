import { useState, useEffect } from 'react';
import { updateProfile, updateEmail, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import AdminSidebar from '../../Component/AdminSidebar';
import 'react-toastify/dist/ReactToastify.css';

export default function UserSettings() {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const checkAdminStatus = () => {
      if (auth.currentUser) {
        setIsAdmin(auth.currentUser.email === "punkmk6@gmail.com");
        setFormData(prev => ({
          ...prev,
          displayName: auth.currentUser.displayName || '',
          email: auth.currentUser.email || ''
        }));
      }
      setLoading(false);
    };

    checkAdminStatus();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    
    if (updating) return;
    setUpdating(true);
    
    try {
      // Update display name if changed
      if (formData.displayName !== auth.currentUser.displayName) {
        await updateProfile(auth.currentUser, {
          displayName: formData.displayName
        });
        toast.success("Profile name updated successfully!");
      }
      
      // Update email if changed and current password provided
      if (formData.email !== auth.currentUser.email && formData.currentPassword) {
        const credential = EmailAuthProvider.credential(
          auth.currentUser.email,
          formData.currentPassword
        );
        
        await reauthenticateWithCredential(auth.currentUser, credential);
        await updateEmail(auth.currentUser, formData.email);
        toast.success("Email updated successfully!");
      }
      
      // Update password if new password is provided and matches confirmation
      if (formData.newPassword && formData.currentPassword) {
        if (formData.newPassword !== formData.confirmPassword) {
          toast.error("New passwords don't match!");
          return;
        }
        
        const credential = EmailAuthProvider.credential(
          auth.currentUser.email,
          formData.currentPassword
        );
        
        await reauthenticateWithCredential(auth.currentUser, credential);
        await updatePassword(auth.currentUser, formData.newPassword);
        
        // Clear password fields
        setFormData(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }));
        
        toast.success("Password updated successfully!");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      if (error.code === 'auth/wrong-password') {
        toast.error("Current password is incorrect!");
      } else {
        toast.error(`Failed to update profile: ${error.message}`);
      }
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="text-center py-10 text-lg">Loading...</div>;
  if (!isAdmin) return <Navigate to="/blogs" />;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      {/* Admin Sidebar */}
      <AdminSidebar />
      
      {/* Main Content */}
      <div className="flex-1 transition-all duration-300">
        <div className="bg-[#c5c5c5] min-h-screen p-4 lg:p-6">
          <ToastContainer position="top-right" autoClose={3000} />
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl lg:text-3xl font-bold mb-6">User Settings</h1>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-[#1d1d1d] text-white p-4">
                <h2 className="text-xl font-semibold">Edit Profile</h2>
              </div>
              
              <form onSubmit={handleProfileUpdate} className="p-6 space-y-4">
                {/* Display Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                {/* Current Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Password (required for email/password changes)
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                {/* New Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Password (leave blank to keep current)
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={updating}
                  className={`w-full text-white py-2 rounded-lg transition duration-300 ${
                    updating ? 'bg-gray-500 cursor-not-allowed' : 'bg-red-600 hover:bg-blue-700'
                  }`}
                >
                  {updating ? 'Updating...' : 'Save Changes'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}