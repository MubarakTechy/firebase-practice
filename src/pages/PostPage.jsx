// src/pages/PostPage.jsx
import { useParams } from 'react-router-dom';

export default function PostPage() {
  const { id } = useParams();

  // You can fetch data based on id here later
  return (
    <div className="min-h-screen p-8 bg-white text-center">
      <h1 className="text-4xl font-bold mb-4">Post #{id}</h1>
      <p className="text-gray-700">This is a placeholder for blog post with ID {id}.</p>
    </div>
  );
}
