import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Tween, Timeline } from 'react-gsap';
import { db, auth } from '../firebase/firebasee';
import { collection, getDocs } from 'firebase/firestore';
import { useUser } from '../context/UserContext';
import { signOut } from 'firebase/auth';


export default function LandingPage() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const { user, loading } = useUser();

    const handleLogout = async () => {
      await signOut(auth);
      localStorage.removeItem("authToken")
      navigate('/login');
    };


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'blogs'));
        const postList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPosts(postList);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">BlogSphere</h1>
            {
              user ?
              (<div className="space-x-4 flex gap-2 ">
                <p className="text-gray-600 hover:text-blue-600 font-medium">{user.displayName}</p>
                <button onClick={handleLogout}  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-blue-700">Logout</button>
              </div>):
              (<div className="space-x-4">
              <Link to="/login" className="text-gray-600 hover:text-blue-600 font-medium">Login</Link>
              <Link to="/signup" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-blue-700">Sign Up</Link>
            </div>)
            }
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow">
        <section className="bg-gradient-to-r from-[#1d1d1d] to-[#251e1e] text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Timeline target={
              <>
                <Tween from={{ opacity: 0, y: 50 }} to={{ opacity: 1, y: 0 }} duration={0.8}>
                  <h1 className="text-4xl sm:text-5xl font-extrabold mb-6">Welcome to BlogSphere</h1>
                </Tween>
                <Tween from={{ opacity: 0, y: 50 }} to={{ opacity: 1, y: 0 }} duration={0.8} delay={0.2}>
                  <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto">
                    Discover inspiring stories, share your thoughts, and connect with a vibrant community of writers and readers.
                  </p>
                </Tween>
                <Tween from={{ opacity: 0, scale: 0.8 }} to={{ opacity: 1, scale: 1 }} duration={0.8} delay={0.4}>
                  <Link
                    to="/login"
                    className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#070202] transition"
                  >
                    Start Exploring
                  </Link>
                </Tween>
              </>
            } />
          </div>
        </section>

        {/* Posts Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Latest Posts</h2>
            <Tween from={{ opacity: 0, scale: 0.9 }} to={{ opacity: 1, scale: 1 }} stagger={0.2} duration={0.9}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <div key={post.id} className="bg-gray-50 rounded-lg shadow hover:shadow-lg transition">
                    <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover rounded-t-lg" />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h3>
                      <p className="text-gray-600 mb-4">{post.description?.slice(0, 100)}...</p>
                      <Link
                        to={`/blog/${post.id}`}
                        className="text-red-600 hover:underline"
                        onClick={(e) => {
                          const isLoggedIn = localStorage.getItem('authToken');
                          if (!isLoggedIn) {
                            e.preventDefault();
                            localStorage.setItem('redirectAfterLogin', `/blog/${post.id}`);
                            navigate('/login');
                          }
                        }}
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </Tween>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#1d1d1d] to-[#251e1e] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">BlogSphere</h3>
              <p className="text-gray-400">Your go-to platform for sharing and discovering amazing stories.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/blogs" className="text-gray-400 hover:text-white">All Blogs</Link></li>
                <li><Link to="/login" className="text-gray-400 hover:text-white">Login</Link></li>
                <li><Link to="/signup" className="text-gray-400 hover:text-white">Sign Up</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">Twitter</a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">Facebook</a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">Instagram</a>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400">
            © 2025 BlogSphere. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
