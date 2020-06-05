import { Query } from './Query'
import { auth } from './Mutation/auth'
import { todo } from './Mutation/todo'
import { tag } from './Mutation/tag'
import { User } from './User'
import { Todo } from './Todo'

export default {
  Query,
  Mutation: {
    ...auth,
    ...todo,
    ...tag,
  },
  User,
  Todo
}
