const Task = require('../models/task.model');

class TasksController {
  static async create(req, res) {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const task = await Task.create({
      userId: req.user.id,
      title,
      description,
    });

    return res.status(201).json(task);
  }

  static async list(req, res) {
    const tasks = await Task.findAllByUser(req.user.id);
    res.json(tasks);
  }

  static async get(req, res) {
    const task = await Task.findById(req.params.id, req.user.id);
    if (!task) {
      return res.status(404).json({
        message: 'Task not found',
      });
    }
    res.json(task);
  }

  static async update(req, res) {
    const updated = await Task.update(req.params.id, req.user.id, req.body);

    if (!updated) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task updated' });
  }

  static async delete(req, res) {
    const deleted = await Task.delete(req.params.id, req.user.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted' });
  }
}

module.exports = TasksController;
