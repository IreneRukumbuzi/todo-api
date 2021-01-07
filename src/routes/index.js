import express from 'express';
import AuthController from '../controllers/auth.controller';
import TodosController from '../controllers/todos.controller';
import checkAuth from '../middlewares/checkAuth';
import todoValidate from '../middlewares/todo.validator';
import userValidate from '../middlewares/user.validator';

const router = express.Router();

// Auth
router.post('/signup', userValidate, AuthController.signUp);
router.post('/login', userValidate, AuthController.login);

// Todos
router.post('/todos', checkAuth.verifyUser, todoValidate, TodosController.createTodo);
router.get('/todos',checkAuth.verifyUser, TodosController.getTodos);
router.get('/todos/:todoId',checkAuth.verifyUser, TodosController.getOneTodo);
router.patch('/todos/:todoId', checkAuth.verifyUser, todoValidate, TodosController.updateTodo);
router.delete('/todos/:todoId', checkAuth.verifyUser, TodosController.deleteTodo);

export default router;
