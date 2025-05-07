import { useState, useEffect } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../../firebase/config';
import { Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import AdminSidebar from '../../Component/AdminSidebar';
import 'react-toastify/dist/ReactToastify.css';

export default function BlogAdmin() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const checkAdminStatus = () => {
      if (auth.currentUser) {
        setIsAdmin(auth.currentUser.email === "punkmk6@gmail.com");
      }
      setLoading(false);
    };
    checkAdminStatus();
  }, []);

  const handleSubmit = async () => {
    if (!title || !content || submitting) return;
    setSubmitting(true);
    try {
      await addDoc(collection(db, 'blogs'), {
        title,
        content,
        createdAt: new Date(),
      });
      setTitle('');
      setContent('');
      toast.success("Blog posted successfully!");
    } catch (error) {
      console.error('Error adding document:', error);
      toast.error("Failed to post blog.");
    } finally {
      setSubmitting(false);
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
          <div className="max-w-3xl mx-auto py-6 lg:py-10 px-4">
            <h1 className="text-2xl lg:text-3xl font-bold text-center mb-6 lg:mb-8">Create a New Blog Post</h1>
            <div className="bg-[#1d1d1d] shadow-lg rounded-lg p-4 lg:p-6 space-y-4 lg:space-y-6">
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Blog Title"
              />
              <textarea
                className="w-full h-48 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="Write your blog content here..."
              />
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className={`w-full text-white py-2 rounded-lg transition duration-300 ${
                  submitting ? 'bg-gray-500 cursor-not-allowed' : 'bg-red-600 hover:bg-blue-700'
                }`}
              >
                {submitting ? 'Publishing...' : 'Publish Blog'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}