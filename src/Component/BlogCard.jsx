import { Link } from "react-router-dom";

export default function BlogCard({ blog, onDelete }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold">{blog.title}</h2>
      <p className="text-sm text-gray-600">{blog.content.slice(0, 100)}...</p>
      <div className="mt-4 flex gap-2">
        <Link
          to={`/admin/edit/${blog.id}`}
          className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Edit
        </Link>
        <button
          onClick={() => onDelete(blog.id)}
          className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
