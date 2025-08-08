// userRoutes.js

const express = require('express');
const router = express.Router();
const User = require('./models/User');

// GET all users
router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// POST new user
router.post('/adduser/', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a user by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted', user: deletedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
