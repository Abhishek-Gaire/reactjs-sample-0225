const express = require("express");
const { v4: uuidv4 } = require('uuid');
const tasks = require("./tasks");

const router = express.Router();

// GET /api/tasks - Get all tasks
router.get('/api/tasks', (req, res) => {
  try {
    const { status, priority, search } = req.query;

    let filteredTasks = [...tasks];

    // Filter by status
    if (status && status !== 'all') {
      filteredTasks = filteredTasks.filter(task => task.status === status);
    }

    // Filter by priority
    if (priority && priority !== 'all') {
      filteredTasks = filteredTasks.filter(task => task.priority === priority);
    }

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filteredTasks = filteredTasks.filter(task =>
        task.title.toLowerCase().includes(searchLower) ||
        task.description.toLowerCase().includes(searchLower)
      );
    }

    // Sort by creation date (newest first)
    filteredTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json({
      success: true,
      data: filteredTasks,
      count: filteredTasks.length,
      total: tasks.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch tasks',
      error: error.message
    });
  }
});

// GET /api/tasks/:id - Get task by ID
router.get('/api/tasks/:id', (req, res) => {
  try {
    const { id } = req.params;
    const task = tasks.find(t => t.id === id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    res.json({
      success: true,
      data: task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch task',
      error: error.message
    });
  }
});

// POST /api/tasks - Create new task
router.post('/api/tasks', (req, res) => {
  try {
    const { title, description, priority = 'medium', status = 'todo', dueDate } = req.body;

    // Validation
    if (!title || title.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Title is required'
      });
    }

    if (!['low', 'medium', 'high'].includes(priority)) {
      return res.status(400).json({
        success: false,
        message: 'Priority must be low, medium, or high'
      });
    }

    if (!['todo', 'inprogress', 'done'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Status must be todo, inprogress, or done'
      });
    }

    const newTask = {
      id: uuidv4(),
      title: title.trim(),
      description: description ? description.trim() : '',
      priority,
      status,
      dueDate: dueDate || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    tasks.push(newTask);

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: newTask
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create task',
      error: error.message
    });
  }
});

// PUT /api/tasks/:id - Update task
router.put('/api/tasks/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, priority, status, dueDate } = req.body;

    const taskIndex = tasks.findIndex(t => t.id === id);

    if (taskIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    // Validation
    if (title !== undefined && title.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Title cannot be empty'
      });
    }

    if (priority && !['low', 'medium', 'high'].includes(priority)) {
      return res.status(400).json({
        success: false,
        message: 'Priority must be low, medium, or high'
      });
    }

    if (status && !['todo', 'inprogress', 'done'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Status must be todo, inprogress, or done'
      });
    }

    // Update task
    const updatedTask = {
      ...tasks[taskIndex],
      ...(title !== undefined && { title: title.trim() }),
      ...(description !== undefined && { description: description.trim() }),
      ...(priority && { priority }),
      ...(status && { status }),
      ...(dueDate !== undefined && { dueDate }),
      updatedAt: new Date().toISOString()
    };

    tasks[taskIndex] = updatedTask;

    res.json({
      success: true,
      message: 'Task updated successfully',
      data: updatedTask
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update task',
      error: error.message
    });
  }
});

// DELETE /api/tasks/:id - Delete task
router.delete('/api/tasks/:id', (req, res) => {
  try {
    const { id } = req.params;
    const taskIndex = tasks.findIndex(t => t.id === id);

    if (taskIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    const deletedTask = tasks.splice(taskIndex, 1)[0];

    res.json({
      success: true,
      message: 'Task deleted successfully',
      data: deletedTask
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete task',
      error: error.message
    });
  }
});

module.exports = router;