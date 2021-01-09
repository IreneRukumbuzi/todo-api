import { Todo, User } from '../database/models';

class TodoController {
  static async getTodos(req, res) {
    try {
      const {id} = req.user;
      const todos = await Todo.findAll({where: {ownerId: id}});
      if (!todos) {
        return res.status(401).send({ message: 'no todos found!' });
      }
      return res.status(200).send({ todos });
    }
    catch (error) {
      return res.status(500).send({ message: 'Server error' });
    }
  }

  static async getOneTodo(req, res){
    try {
      const { todoId } = req.params;
      const {id} = req.user;

      const todo = await Todo.findOne({where: { id: todoId, ownerId: id }})
      if(todo){
        return res.status(200).send({ todo })
      }
      return res.status(401).send({ message: 'no todo associated with that id'})
    } catch (error) {
      return res.status(500).send({ message: 'Server error'})
    }
  }

  static async createTodo(req, res){
    try {
      const { item } = req.body;
      const { id } = req.user;

      const newTodo = await Todo.create({
        item,
        ownerId: id,
      }, {
        include: [
          {
            model: User,
            as: 'Owner'
          }
        ]
      })

      if(newTodo){
        return res.status(201).send({message: 'Todo item added successfully', newTodo})
      } 
    } catch (error) {
      return res.status(500).send({message: 'Server error'})
    }
  }

  static async updateTodo(req, res){
    try {
      const { todoId } = req.params;
      const { id } = req.user;
      const { item, isCompleted} = req.body
      return await Todo.findOne({ where: { id: todoId, ownerId: id }})
        .then((data) => {
          if(!data){
            return res.status(401).send({ message: 'no todo item found'})
          }
          return data.update({
            item,
            isCompleted
          })
          .then(() => {
            return res.status(200).send({ message: 'successfully updated', data})
          })
          .catch(() => {
            return res.status(409).send({message: 'conflict', err})
          })
        })
    } catch (error) {
       return res.status(500).send({message: 'Server error'})
    }
  }
  
  static async deleteTodo(req, res){
    try {
      const { todoId } = req.params;
      const { id } = req.user;

      await Todo.destroy({where: { id: todoId, ownerId: id } })
        .then((data) => {
          if(data){
            return res.status(202).send({message: 'Todo item deleted successfully'})
          }
          return res.status(204).send({ message: 'no todo item found'})
        })
        .catch(() => {
          return res.status(409).send({message: 'item already deleted'})
        })
      
    } catch (error) {
      return res.status(500).send({message: 'Server error'})
    }
  }
}

export default TodoController;
