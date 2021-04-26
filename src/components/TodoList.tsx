import React from 'react'
import { Todos } from '../types'

type TodoListProps = {
  todos: Todos
  onSwitchTodo: (id: string) => void
  onRemoveTodo: (id: string) => void
}

function TodoList({ todos, onSwitchTodo, onRemoveTodo }: TodoListProps) {
  return (
    <div>
      {todos.map((_) => {
        return (
          <div>
            <span
              style={{
                color: _.completed ? 'gray' : 'blue',
              }}
            >
              {_.text}
            </span>
            <button onClick={() => onSwitchTodo(_.id)}>complated</button>
            <button onClick={() => onRemoveTodo(_.id)}>delete</button>
          </div>
        )
      })}
    </div>
  )
}

export default TodoList
