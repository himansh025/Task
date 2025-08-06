// --- controllers/postController.js ---

const Post = require('../models/Post');
// ✅ Correct
const { uploadOnCloudinary } = require('../utils/cloudinary');
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'name email bio')
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({ posts });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { title,description } = req.body;
    let imageUrl = null;

    if (!title || description.trim().length === 0) {
      return res.status(400).json({ message: 'Content is required' });
    }

    // If image is uploaded
    console.log(req.file)
      const postImage = req.file.path;
      console.log(postImage)
    if (postImage) {
      const uploaded = await uploadOnCloudinary(postImage);
      console.log(uploaded)
      imageUrl = uploaded.secure_url;
    }

    const post = new Post({
      title,
      image: imageUrl,
      description,
      author: req.user._id
    });

    await post.save();
    await post.populate('author', 'name email bio');

    res.status(201).json({ message: 'Post created successfully', post });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getPostsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ author: userId })
      .populate('author', 'name email bio')
      .sort({ createdAt: -1 });

      console.log(posts)
    res.json({ posts });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }

    await Post.findByIdAndDelete(postId);
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
