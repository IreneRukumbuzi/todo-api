import express from "express";
import AuthController from "../controllers/auth.controller";
import TodosController from "../controllers/todos.controller";
import checkAuth from "../middlewares/checkAuth";
import todoValidate from "../middlewares/todo.validator";
import userValidate from "../middlewares/user.validator";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send({ message: "Welcome to my Todo API :)" });
});

// Auth
router
  .post("/signup", userValidate, AuthController.signUp)
  .post("/login", userValidate, AuthController.login);

// Todos
router
  .post(
    "/todos",
    checkAuth.verifyUser,
    todoValidate,
    TodosController.createTodo
  )
  .get("/todos", checkAuth.verifyUser, TodosController.getTodos);

router
  .get("/todos/:todoId", checkAuth.verifyUser, TodosController.getOneTodo)
  .patch(
    "/todos/:todoId",
    checkAuth.verifyUser,
    todoValidate,
    TodosController.updateTodo
  )
  .delete("/todos/:todoId", checkAuth.verifyUser, TodosController.deleteTodo);

router.use("/*", (req, res) => {
  res.status(404).send({ message: "URL not found" });
});

export default router;
