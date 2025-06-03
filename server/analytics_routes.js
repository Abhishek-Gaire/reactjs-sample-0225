const express = require('express');
const router = express.Router();

const tasks = require('./tasks');

// GET /api/analytics - Get task analytics
router.get('/api/analytics', (req, res) => {
  try {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === 'done').length;
    const inProgressTasks = tasks.filter(t => t.status === 'inprogress').length;
    const todoTasks = tasks.filter(t => t.status === 'todo').length;
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    // Priority distribution
    const priorityStats = {
      high: tasks.filter(t => t.priority === 'high').length,
      medium: tasks.filter(t => t.priority === 'medium').length,
      low: tasks.filter(t => t.priority === 'low').length
    };

    // Tasks created in last 7 days
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const recentTasks = tasks.filter(t => new Date(t.createdAt) >= oneWeekAgo).length;

    res.json({
      success: true,
      data: {
        summary: {
          totalTasks,
          completedTasks,
          inProgressTasks,
          todoTasks,
          completionRate,
          recentTasks
        },
        priorityDistribution: priorityStats,
        statusDistribution: {
          todo: todoTasks,
          inprogress: inProgressTasks,
          done: completedTasks
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch analytics',
      error: error.message
    });
  }
});

module.exports = router;