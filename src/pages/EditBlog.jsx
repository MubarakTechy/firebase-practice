import { useEffect, useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { db, auth } from '../firebase/firebasee';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Navbar from '../../src/Component/Navbar';
import { toast, ToastContainer } from 'react-toastify';

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      const blogRef = doc(db, 'blogs', id);
      const blogSnap = await getDoc(blogRef);
      if (blogSnap.exists()) {
        const data = blogSnap.data();
        setTitle(data.title);
        setContent(data.content);
      }
      setLoading(false);
    };

    if (auth.currentUser?.email === "punkmk6@gmail.com") {
      setIsAdmin(true);
      fetchBlog();
    } else {
      setLoading(false);
    }
  }, [id]);

  const handleUpdate = async () => {
    try {
      await updateDoc(doc(db, 'blogs', id), { title, content });
      toast.success("Blog updated!");
      navigate('/admin/dashboard');
    } catch (err) {
      toast.error("Failed to update.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!isAdmin) return <Navigate to="/blogs" />;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <ToastContainer />
      <div className="max-w-2xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-4 text-center">Edit Blog Post</h1>
        <input
          className="w-full px-4 py-2 border rounded mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full px-4 py-2 border rounded h-48 mb-4"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          onClick={handleUpdate}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Update Blog
        </button>
      </div>
    </div>
  );
}
