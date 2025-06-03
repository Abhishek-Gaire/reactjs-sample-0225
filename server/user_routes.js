const { v4: uuidv4 } = require('uuid');
const express = require('express');
const fetch = require("node-fetch");

const router = express.Router();

let users = [
  {
    id: uuidv4(),
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://picsum.photos/id/77/200/200',
    joinDate: '2024-01-15',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// GET /api/users/profile - Get user profile
router.get('/api/users/profile', async (req, res) => {
  try {
    // Get random profile image from Picsum
    const randomId = Math.floor(Math.random() * 1000);

    let user = users[0]; // For demo, we'll use the first user

    // Try to fetch random profile image
    try {
      const fetch = require('node-fetch');
      const response = await fetch(`https://picsum.photos/id/${randomId}/info`);
      const imageData = await response.json();
      user.avatar = imageData.download_url;
    } catch (apiError) {
      // Fallback if API fails
      user.avatar = `https://picsum.photos/id/${randomId}/200/200`;
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user profile',
      error: error.message
    });
  }
});

// PUT /api/users/profile - Update user profile
router.put('/api/users/profile', (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || name.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Name is required'
      });
    }

    if (!email || !email.includes('@')) {
      return res.status(400).json({
        success: false,
        message: 'Valid email is required'
      });
    }

    const updatedUser = {
      ...users[0],
      name: name.trim(),
      email: email.trim(),
      updatedAt: new Date().toISOString()
    };

    users[0] = updatedUser;

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update profile',
      error: error.message
    });
  }
});

module.exports = router;