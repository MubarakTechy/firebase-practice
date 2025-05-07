import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { db, auth } from '../../firebase/config';
import { Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import AdminSidebar from '../../Component/AdminSidebar';
import 'react-toastify/dist/ReactToastify.css';

export default function ManageBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    const checkAdminStatus = () => {
      if (auth.currentUser) {
        setIsAdmin(auth.currentUser.email === "punkmk6@gmail.com");
      }
      setLoading(false);
    };

    const fetchBlogs = async () => {
      try {
        const blogsQuery = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(blogsQuery);
        
        const blogsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate().toLocaleDateString() || 'Unknown date'
        }));
        
        setBlogs(blogsData);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        toast.error("Failed to load blogs.");
      }
    };

    checkAdminStatus();
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      setDeleting(id);
      try {
        await deleteDoc(doc(db, 'blogs', id));
        setBlogs(blogs.filter(blog => blog.id !== id));
        toast.success("Blog deleted successfully!");
      } catch (error) {
        console.error("Error deleting blog:", error);
        toast.error("Failed to delete blog.");
      } finally {
        setDeleting(null);
      }
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
          <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl lg:text-3xl font-bold mb-6">Manage Blogs</h1>
            
            {/* Blog List */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-[#1d1d1d] text-white p-4">
                <h2 className="text-xl font-semibold">All Blog Posts</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Title</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Date</th>
                      <th className="py-3 px-4 text-right text-sm font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {blogs.length > 0 ? (
                      blogs.map(blog => (
                        <tr key={blog.id} className="hover:bg-gray-50">
                          <td className="py-3 px-4 text-sm">{blog.title}</td>
                          <td className="py-3 px-4 text-sm">{blog.createdAt}</td>
                          <td className="py-3 px-4 text-sm text-right">
                            <button
                              className="text-blue-600 hover:text-blue-800 mr-4"
                              onClick={() => window.location.href = `/blogs/${blog.id}`}
                            >
                              View
                            </button>
                            <button
                              className={`text-red-600 hover:text-red-800 ${deleting === blog.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                              onClick={() => handleDelete(blog.id)}
                              disabled={deleting === blog.id}
                            >
                              {deleting === blog.id ? 'Deleting...' : 'Delete'}
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="py-4 px-4 text-center text-gray-500">
                          No blog posts found
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