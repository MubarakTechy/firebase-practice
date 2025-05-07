import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import Navbar from '../../src/Component/Navbar';
import { Link } from 'react-router-dom';

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'blogs'));
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) {
    return <div className="text-center py-16 text-xl font-medium">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Latest Blog Posts</h1>

        {blogs.length === 0 ? (
          <p className="text-center text-gray-600">No blogs found.</p>
        ) : (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <div key={blog.id} className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition duration-300">
                {blog.imageUrl && (
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="h-48 w-full object-cover"
                  />
                )}
                <div className="p-6">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">{blog.title}</h2>
                  <p className="text-gray-600 text-sm mb-4">
                    {blog.content?.substring(0, 100) || 'No content available'}...
                  </p>
                  <Link
                    to={`/blog/${blog.id}`}
                    className="text-red-600 hover:text-red-800 font-semibold text-sm"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
