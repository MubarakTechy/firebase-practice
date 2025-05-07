import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from '../../firebase/config';
import { Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import AdminSidebar from '../../Components/AdminSidebar';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminStatus = () => {
      if (auth.currentUser) {
        setIsAdmin(auth.currentUser.email === "punkmk6@gmail.com");
      }
      setLoading(false);
    };

    const fetchUsers = async () => {
      try {
        // Note: In a real application, you would likely need Firebase Admin SDK
        // or a backend server to list all users. This is a simplified example
        // using a 'users' collection in Firestore.
        const usersCollection = collection(db, 'users');
        const querySnapshot = await getDocs(usersCollection);
        
        const userData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          lastLogin: doc.data().lastLogin?.toDate().toLocaleDateString() || 'Never'
        }));
        
        setUsers(userData);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to load users.");
      }
    };

    checkAdminStatus();
    fetchUsers();
  }, []);

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
          <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl lg:text-3xl font-bold mb-6">User Management</h1>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-[#1d1d1d] text-white p-4">
                <h2 className="text-xl font-semibold">Registered Users</h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Name</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Email</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Last Login</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Role</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {users.length > 0 ? (
                      users.map(user => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="py-3 px-4 text-sm">{user.displayName || 'N/A'}</td>
                          <td className="py-3 px-4 text-sm">{user.email}</td>
                          <td className="py-3 px-4 text-sm">{user.lastLogin}</td>
                          <td className="py-3 px-4 text-sm">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              user.email === "punkmk6@gmail.com" 
                                ? 'bg-red-100 text-red-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {user.email === "punkmk6@gmail.com" ? 'Admin' : 'User'}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="py-4 px-4 text-center text-gray-500">
                          No users found
                        </td>
                      </tr>
                    )}
                    {/* Add admin user if not in list */}
                    {!users.some(user => user.email === "punkmk6@gmail.com") && (
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm">Admin User</td>
                        <td className="py-3 px-4 text-sm">punkmk6@gmail.com</td>
                        <td className="py-3 px-4 text-sm">Current</td>
                        <td className="py-3 px-4 text-sm">
                          <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
                            Admin
                          </span>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              <div className="p-4 text-sm text-gray-600">
                <p>Note: This is a simplified user management view. In a production environment, you would need more robust user management features.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}