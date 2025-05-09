import { useState, useEffect } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase/firebasee';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from '../../context/UserContext';
import AdminSidebar from '../../Component/AdminSidebar';
import { Navigate } from 'react-router-dom';

// Utility to generate slug
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
};

export default function BlogAdmin() {
  const { user } = useUser();
  console.log(user);
  

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);
  // const [isAdmin, setIsAdmin] = useState(false);

  // useEffect(() => {
  //   // Allow access only for admin users
  //   const checkAdmin = () => {
  //     if (user?.email === 'admin@example.com') {
  //       setIsAdmin(true);
  //     } else {
  //       setIsAdmin(false);
  //     }
  //   };
  //   checkAdmin();
  // }, [user]);

  const handleSubmit = async () => {
    if (!title || !content || !imgUrl || submitting) {
      return toast.warn("All fields are required.");
    }

    setSubmitting(true);
    try {
      const slug = generateSlug(title);
      await addDoc(collection(db, 'blogs'), {
        title,
        content,
        imgUrl,
        slug,
        createdAt: new Date(),
        authorId: user.uid,
      });

      setTitle('');
      setContent('');
      setImgUrl('');
      toast.success("Blog posted successfully!");
      Navigate("/blogs")
    } catch (error) {
      console.error('Error adding blog:', error);
      toast.error("Failed to post blog.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) return <Navigate to="/login" />;
  // if (!isAdmin) return <Navigate to="/blogs" />;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 p-4 lg:p-6 bg-[#c5c5c5]">
        <ToastContainer position="top-right" autoClose={3000} />
        <div className="max-w-3xl mx-auto py-6 lg:py-10 px-4">
          <h1 className="text-2xl lg:text-3xl font-bold text-center mb-8">
            Create a New Blog Post
          </h1>

          <div className="bg-[#1d1d1d] shadow-lg rounded-lg p-6 space-y-6">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Blog Title"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
              placeholder="Image URL"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your blog content here..."
              className="w-full h-48 px-4 py-2 border border-gray-300 rounded-lg"
            />
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className={`w-full text-white py-2 rounded-lg ${
                submitting ? 'bg-gray-500 cursor-not-allowed' : 'bg-red-600 hover:bg-blue-700'
              }`}
            >
              {submitting ? 'Publishing...' : 'Publish Blog'}
            </button>
          </div>

          {/* Preview Section */}
          {title || content || imgUrl ? (
            <div className="bg-white mt-10 p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-2">📌 Preview</h2>
              <h3 className="text-lg font-semibold">{title}</h3>
              {imgUrl && <img src={imgUrl} alt="Blog" className="w-full h-auto rounded my-4" />}
              <p className="text-gray-800 whitespace-pre-wrap">{content}</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
