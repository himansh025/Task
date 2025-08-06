
// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const {upload} = require('../middleware/multer');
const userController = require('../controller/userController');

router.get('/:userId', userController.getUserProfile);
router.put('/profile', authMiddleware, upload.single('avatar'), userController.updateUserProfile);

module.exports = router;

