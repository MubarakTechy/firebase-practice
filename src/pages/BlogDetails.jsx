import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import Navbar from '../../src/Component/Navbar';

export default function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      const docRef = doc(db, 'blogs', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setBlog(docSnap.data());
      } else {
        console.log("No such document!");
      }
      setLoading(false);
    };

    fetchBlog();
  }, [id]);

  if (loading) return <div className="text-center py-10 text-lg">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <img src={blog?.imgUrl} alt="" />
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">{blog.title}</h1>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <p className="text-gray-600">{blog.content}</p>
        </div>
      </div>
    </div>
  );
}
