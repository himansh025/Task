const express = require('express');
const authMiddleware = require('../middleware/auth');
const { register, login } = require('../controller/userController');
const { logout } = require('../../front/src/store/authSlicer');

const router = express.Router();

// Register
router.post('/register',register)
router.post('/login',login);
router.post('/logout',authMiddleware,logout);

router.get('/me', authMiddleware, async (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;