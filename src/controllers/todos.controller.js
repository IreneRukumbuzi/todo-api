import { Todo } from "../database/models";

class TodoController {
  static async getTodos(req, res) {
    try {
      const { id } = req.user;
      const todos = await Todo.findAll({ where: { ownerId: id } });
      if (todos.length === 0) {
        return res.status(204).send({ message: "no todos created yet!", todos });
      }
      return res
        .status(200)
        .send({ message: "todos retrieved successfully", todos });
    } catch (error) {
      return res.status(500).send({ message: "Server error" });
    }
  }

  static async getOneTodo(req, res) {
    try {
      const { todoId } = req.params;
      const { id } = req.user;

      const allTodos = await Todo.findAll({ where: { ownerId: id } });
      if (allTodos) {
        const todoItem = await Todo.findOne({ where: { id: todoId } });
        if (todoItem) {
          return res
            .status(200)
            .send({ message: "to do retrieved successfully", todoItem });
        }
        return res.status(404).send({ message: "no item found" });
      }
      return res.status(401).send({ message: "Unauthorized" });
    } catch (error) {
      return res.status(500).send({ message: "Server error" });
    }
  }

  static async createTodo(req, res) {
    try {
      const { item } = req.body;
      const { id } = req.user;

      const newTodo = await Todo.create({
        item,
        ownerId: id,
      });

      return res
        .status(201)
        .send({ message: "Todo item added successfully", newTodo });
    } catch (error) {
      return res.status(500).send({ message: "Server error" });
    }
  }

  static async updateTodo(req, res) {
    try {
      const { todoId } = req.params;
      const { id } = req.user;
      const { item, isCompleted } = req.body;

      const allTodos = await Todo.findAll({ where: { ownerId: id } });
      if (allTodos) {
        const itemToUpdate = await Todo.findOne({ where: { id: todoId } });
        if (itemToUpdate) {
          const result = await itemToUpdate.update({
            item,
            isCompleted,
          });
          return res.status(200).send({
            message: "Item successfully updated",
            updatedTodo: result,
          });
        }
        return res.status(404).send({ message: "no item found" });
      }
      return res.status(401).send({ message: "Unauthorized" });
    } catch (error) {
      return res.status(500).send({ message: "Server error" });
    }
  }

  static async deleteTodo(req, res) {
    try {
      const { todoId } = req.params;
      const { id } = req.user;

      const itemToDelete = await Todo.findAll({ where: { ownerId: id } });
      if (itemToDelete) {
        const itemToDelete = await Todo.destroy({ where: { id: todoId } });
        if (itemToDelete) {
          return res.status(200).send({ message: "item deleted successfully" });
        }
        return res.status(404).send({ message: "No Item Found" });
      }
      return res.status(401).send({ message: "Unauthorized" });
    } catch (error) {
      return res.status(500).send({ message: "Server error" });
    }
  }
}

export default TodoController;
