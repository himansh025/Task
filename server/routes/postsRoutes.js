
// routes/postRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const postController = require('../controller/postController');
const {upload}= require("../middleware/multer")

router.post('/create', authMiddleware, upload.single('image'), postController.createPost);
router.get('/', postController.getAllPosts);
router.get('/:userId', postController.getPostsByUser);
router.delete('/delete/:id', postController.deletePost);

module.exports = router;