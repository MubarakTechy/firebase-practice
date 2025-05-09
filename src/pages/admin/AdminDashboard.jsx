import { useState, useEffect } from 'react';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { db, auth } from '../../firebase/firebasee';
import { Navigate } from 'react-router-dom';
import AdminSidebar from '../../Component/AdminSidebar';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [stats, setStats] = useState({
    totalBlogs: 0,
    recentBlogs: []
  });

  useEffect(() => {
    const checkAdminStatus = () => {
      if (auth.currentUser) {
        setIsAdmin(auth.currentUser.email === "punkmk6@gmail.com");
      }
      setLoading(false);
    };
    
    const fetchStats = async () => {
      if (auth.currentUser?.email === "punkmk6@gmail.com") {
        try {
          // Get total blog count
          const blogsCollection = collection(db, 'blogs');
          const blogsSnapshot = await getDocs(blogsCollection);
          
          // Get recent blogs
          const recentBlogsQuery = query(
            collection(db, 'blogs'),
            orderBy('createdAt', 'desc')
          );
          const recentBlogsSnapshot = await getDocs(recentBlogsQuery);
          
          const recentBlogs = recentBlogsSnapshot.docs
            .slice(0, 5)
            .map(doc => ({
              id: doc.id,
              ...doc.data(),
              createdAt: doc.data().createdAt?.toDate().toLocaleDateString() || 'Unknown date'
            }));
            
          setStats({
            totalBlogs: blogsSnapshot.size,
            recentBlogs
          });
        } catch (error) {
          console.error("Error fetching stats:", error);
        }
      }
    };
    
    checkAdminStatus();
    fetchStats();
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
          <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl lg:text-3xl font-bold mb-6">Admin Dashboard</h1>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-700">Total Blogs</h3>
                <p className="text-3xl font-bold text-black-600 mt-2">{stats.totalBlogs}</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-700">This Month</h3>
                <p className="text-3xl font-bold text-red-600 mt-2">
                  {stats.recentBlogs.filter(blog => {
                    const blogDate = new Date(blog.createdAt);
                    const now = new Date();
                    return blogDate.getMonth() === now.getMonth() && 
                           blogDate.getFullYear() === now.getFullYear();
                  }).length}
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-700">Actions</h3>
                <div className="mt-2">
                  <a 
                    href="/admin/create" 
                    className="inline-block bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                  >
                    Create New Blog
                  </a>
                </div>
              </div>
            </div>
            
            {/* Recent Blogs */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-[#1d1d1d] text-white p-4">
                <h2 className="text-xl font-semibold">Recent Blog Posts</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Title</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {stats.recentBlogs.length > 0 ? (
                      stats.recentBlogs.map(blog => (
                        <tr key={blog.id} className="hover:bg-gray-50">
                          <td className="py-3 px-4 text-sm">{blog.title}</td>
                          <td className="py-3 px-4 text-sm">{blog.createdAt}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="2" className="py-4 px-4 text-center text-gray-500">
                          No blog posts yet
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}