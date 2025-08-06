import { useState } from 'react';

export  function CreatePost({ onCreatePost }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }

    try {
      await onCreatePost(formData);
      setTitle('');
      setDescription('');
      setImage(null);
      setPreviewUrl('');
    } catch (err) {
      console.error('Post creation failed:', err);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-4 border space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Create a Post</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border border-gray-300 p-2 rounded-md"
        required
      />

      <textarea
        placeholder="What's on your mind?"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border border-gray-300 p-2 rounded-md"
        rows={4}
        required
      />

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">Upload Image</label>
        <input
          name='image'  
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
        {previewUrl && (
          <img src={previewUrl} alt="Preview" className="mt-4 rounded-md max-h-48 object-cover" />
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Post
      </button>
    </form>
  );
}
