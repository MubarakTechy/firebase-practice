import { useState, useEffect } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../firebase/config'; // Import auth here as well
import Navbar from '../../src/Component/Navbar';
import { Navigate } from 'react-router-dom';

export default function BlogAdmin() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true); // Loading state to check user
  const [isAdmin, setIsAdmin] = useState(false); // State to track if the user is admin

  useEffect(() => {
    // Check if the user is logged in and if the user is an admin
    const checkAdminStatus = () => {
      if (auth.currentUser) {
        if (auth.currentUser.email === "Punkmk6@gmail.com") {
          setIsAdmin(true); // Set admin status
        } else {
          setIsAdmin(false); // If not admin
        }
        setLoading(false); // Stop loading after checking
      } else {
        setLoading(false); // Stop loading if no user is logged in
      }
    };

    checkAdminStatus();
  }, []);

  const handleSubmit = async () => {
    if (!title || !content) return;

    try {
      await addDoc(collection(db, 'blogs'), {
        title,
        content,
        createdAt: new Date(),
      });
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };

  // If the user is not logged in or not an admin, redirect them
  if (loading) {
    return <div>Loading...</div>; // Optional: display a loading state
  }

  if (!isAdmin) {
    return <Navigate to="/blogs" />; // Redirect if not an admin
  }

  return (
    <div>
      <Navbar />
      <h1>Create Blog</h1>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Content"
      />
      <button onClick={handleSubmit}>Post</button>
    </div>
  );
}
