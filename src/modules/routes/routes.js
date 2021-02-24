const express = require('express');
const router = express.Router();

const {
  getAllTasks,
  createNewTask,
  changeTaskInfo,
  deleteTask
} = require('../controllers/task.controller')

router.post('/createTask', createNewTask);
router.delete('/deleteTask', deleteTask);
router.patch('/updateTask', changeTaskInfo);
router.get('/allTasks', getAllTasks);
module.exports = router;