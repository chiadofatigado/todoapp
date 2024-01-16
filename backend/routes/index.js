import express from 'express';
import Task from '../models/TaskModel.js';
import users from './users.js';

const router = express.Router();

// Helper function for error response
function sendErrorResponse(res, statusCode, message) {
  res.status(statusCode).json({ error: message });
}

// /api/users
router.use('/users', users);

// GET /api/tasks - Get all tasks
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    sendErrorResponse(res, 500, 'Database query failed');
  }
});

// POST /api/tasks - Create a new task
router.post('/tasks', async (req, res) => {
  try {
    // Basic Validation
    if (!req.body.title) {
      return sendErrorResponse(res, 400, 'Title is required');
    }

    const task = new Task(req.body);
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    sendErrorResponse(res, 500, 'Error saving task');
  }
});

// GET /api/tasks/:id - Get a task by id
router.get('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return sendErrorResponse(res, 404, 'Task not found');
    }
    res.json(task);
  } catch (err) {
    sendErrorResponse(res, 500, 'Error fetching task');
  }
});

// PUT /api/tasks/:id - Update a task by id
router.put('/tasks/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTask) {
      return sendErrorResponse(res, 404, 'Task not found');
    }
    res.json(updatedTask);
  } catch (err) {
    sendErrorResponse(res, 500, 'Error updating task');
  }
});

// DELETE /api/tasks/:id - Delete a task by id
router.delete('/tasks/:id', async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndRemove(req.params.id);
    if (!deletedTask) {
      return sendErrorResponse(res, 404, 'Task not found');
    }
    res.json(deletedTask);
  } catch (err) {
    sendErrorResponse(res, 500, 'Error deleting task');
  }
});

export default router;