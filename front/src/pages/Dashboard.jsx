import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CreatePost } from '../components/CreatePost';
import PostCard from '../components/PostCard';
import axiosInstance from '../config/apiconfig';
import { useNavigate } from 'react-router-dom';
import { X, MinusCircle, PlusCircle } from 'lucide-react'; // optional icon

export default function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const navigate = useNavigate();

  const getAllPosts = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get('/posts');
      setPosts(res.data.posts);
    } catch (err) {
      setError('Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, [user]);

  const handleCreatePost = async (formData) => {
    try {
      const res = await axiosInstance.post("/posts/create", formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log("Post created:", res.data);
      setShowCreate(false);
      getAllPosts();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {!loading&&(
          <h1>All Posts : {posts?.length}</h1>
        )}
      {user && (
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Welcome, {user.name}</h2>
          <button
            onClick={() => setShowCreate(!showCreate)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
         {showCreate ? (
    <>
      <X size={20} />
      <span>Cancel</span>
    </>
  ) : (
    <>
      <PlusCircle size={20} />
      <span>Add Post</span>
    </>
  )}
          </button>
        </div>
      )}

      {showCreate && user && (
        <div className="bg-white p-4 rounded-lg shadow-md border">
          <CreatePost onCreatePost={handleCreatePost} />
        </div>
      )}

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>
      )}

      {loading ? (
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg p-4 shadow-sm">
              <div className="h-4 bg-gray-300 rounded w-1/3 mb-3"></div>
              <div className="h-4 bg-gray-300 rounded w-full"></div>
            </div>
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">No posts yet.</div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
