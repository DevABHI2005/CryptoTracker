const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/authMiddleware');

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

// ✅ Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).send("Email already exists");

    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashed });
    await newUser.save();
    res.status(201).send("User registered successfully");
  } catch (err) {
    res.status(500).send("Registration failed");
  }
});

// ✅ Login + Token
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send("Invalid credentials");

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    res.status(500).send("Login error");
  }
});

// ✅ Add Favorite (secure)
// server/routes/userRoutes.js
router.post('/favorites', async (req, res) => {
  const { email, coinId } = req.body;
  if (!email || !coinId) {
    return res.status(400).json({ error: 'Email and coin ID required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (!user.favorites.includes(coinId)) {
      user.favorites.push(coinId);
      await user.save();
    }

    res.json({ message: 'Favorite added' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


// ✅ Remove Favorite (secure)
router.post('/remove-favorite', verifyToken, async (req, res) => {
  const userId = req.user.id;
  const { coinId } = req.body;
  try {
    const user = await User.findById(userId);
    user.favorites = user.favorites.filter(id => id !== coinId);
    await user.save();
    res.json({ favorites: user.favorites });
  } catch (err) {
    res.status(500).json("Failed to remove favorite");
  }
});

// ✅ Profile Info (secure)
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).send("User not found");
    res.json({
      name: user.name,
      email: user.email,
      favorites: user.favorites
    });
  } catch (err) {
    res.status(500).json("Server error");
  }
});

router.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ email: user.email, favorites: user.favorites });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
