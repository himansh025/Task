import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PostCard from '../components/PostCard';
import { User, Edit, Save, X } from 'lucide-react';
import axiosInstance from '../config/apiconfig';

export default function Profile() {
  const { user } = useSelector((state) => state.auth);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
  });
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || '');

  const fetchUserPosts = async () => {
    try {
      const res = await axiosInstance.get(`/posts/${user._id}`);
      console.log(res)
      setPosts(res.data.posts || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchUserPosts();
    }
  }, [user]);

  const handleUpdateProfile = async (e) => {
     const file = e.target.files[0];
    if (!file) return;
      const form = new FormData();
    form.append('avatar', file);
    try {
      await axiosInstance.put('/users/profile', form,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };


  const handleDeletePost = async (postId) => {
    try {
      await axiosInstance.delete(`/posts/user/delete/${postId}`);
      setPosts((prev) => prev.filter((post) => post._id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleCancel = () => {
    setFormData({ name: user?.name || '', bio: user?.bio || '' });
    setEditing(false);
  };

  if (!user) return null;

  return (
    <div className="max-w-2xl mt-20 lg:mt-0 mx-auto space-y-6">
      {/* Profile Section */}
      <div className="bg-white border rounded-lg shadow-sm p-6">
        <div className="flex items-start space-x-4">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-full overflow-hidden border bg-gray-100 flex-shrink-0">
            {avatarPreview ? (
              <img src={avatarPreview} alt="Avatar" className="object-cover w-full h-full" />
            ) : (
              <User className="w-8 h-8 m-auto text-blue-600" />
            )}
          </div>

          <div className="flex-1">
            {editing ? (
              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Bio */}
                <div>
                  <label className="text-sm font-medium text-gray-700">Bio</label>
                  <textarea
                    rows={3}
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                {/* Avatar Upload */}
                <div>
                  <label className="text-sm font-medium text-gray-700">Profile Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={handleUpdateProfile}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    <Save className="w-4 h-4" /> <span>Save</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center space-x-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                  >
                    <X className="w-4 h-4" /> <span>Cancel</span>
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-2xl font-bold text-gray-900"> Name : {user.name}</h2>
                  <button
                    onClick={() => setEditing(true)}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-3 py-1 hover:bg-gray-100 rounded-md"
                  >
                    <Edit className="w-4 h-4" /> <span>Edit</span>
                  </button>
                </div>
                <p className="text-gray-600 mb-2"> Email : {user.email}</p>
                {user.bio && <p className="text-gray-700">Bio : {user.bio}</p>}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Posts Section */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4">My Posts ({posts.length})</h3>
        {loading ? (
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="p-4 border rounded-lg">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            You haven&apos;t posted anything yet. Go to the feed to create your first post!
          </p>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                showDeleteButton
                onDelete={() => handleDeletePost(post._id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
