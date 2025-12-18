const express = require('express');
const TasksController = require('../controllers/tasks.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(authMiddleware);

router.post('/', TasksController.create);
router.get('/', TasksController.list);
router.get('/:id', TasksController.get);
router.put('/:id', TasksController.update);
router.delete('/:id', TasksController.delete);

module.exports = router;
