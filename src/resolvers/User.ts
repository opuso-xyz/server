import {Context} from '../utils'
import {Todo} from '../models/TodoModel';

export const User = {
  todos: ({id}) => {
    return Todo.find({owner: id})
  }
}
