import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { doc, query, where, getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase/firebasee';

export default function SingleBlog() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const q = query(collection(db, 'blogs'), where('slug', '==', slug));
        const querySnapshot = await getDocs(q);
    
        if (!querySnapshot.empty) {
          setBlog(querySnapshot.docs[0].data());
        } else {
          setBlog(null);
        }
      } catch (error) {
        console.error("Failed to fetch blog:", error);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (loading) {
    return <div className="text-center mt-10 text-gray-500">Loading blog...</div>;
  }

  if (!blog) {
    return <div className="text-center mt-10 text-gray-500">Blog not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <img
        src={blog.imgUrl}
        alt={blog.title || 'Blog cover image'}
        className="w-full h-auto mb-6 rounded-md"
      />
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{blog.title}</h1>
      <p className="text-gray-700 leading-relaxed whitespace-pre-line">{blog.content}</p>
    </div>
  );
}
