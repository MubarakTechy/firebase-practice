import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import Navbar from '../../src/Component/Navbar';

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const snapshot = await getDocs(collection(db, 'blogs'));
      setBlogs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchBlogs();
  }, []);

  return (
    <div>
      <Navbar />
      <h1>All Blog Posts</h1>
      {blogs.map(blog => (
        <div key={blog.id}>
          <h2>{blog.title}</h2>
          <p>{blog.content}</p>
        </div>
      ))}
    </div>
  );
}
