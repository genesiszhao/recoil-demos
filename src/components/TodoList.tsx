import React from 'react'
import { Todos } from '../types'

type TodoListProps = {
  todos: Todos
  onSwitchTodo: (id: string) => void
  onRemoveTodo: (id: string) => void
}

function TodoList({ todos, onSwitchTodo, onRemoveTodo }: TodoListProps) {
  return (
    <div
      style={{
        marginTop: '12px',
      }}
    >
      {todos.map((_, index) => {
        return (
          <div
            key={index}
            style={{
              display: 'flex',
              flexDirection: 'row',
              backgroundColor: '#445577',
            }}
          >
            {!_.completed ? (
              <strong
                style={{
                  flex: 1,
                  color: '#00CCBB',
                  fontSize: 19,
                  fontWeight: 'bold',
                }}
              >
                {_.text}
              </strong>
            ) : (
              <del
                style={{
                  flex: 1,
                  color: 'gray',
                  fontSize: 19,
                  fontWeight: 'bold',
                }}
              >
                {_.text}
              </del>
            )}

            <button onClick={() => onSwitchTodo(_.id)}>{_.completed ? 'Not Completed' : 'Completed'}</button>
            <button onClick={() => onRemoveTodo(_.id)}>delete</button>
          </div>
        )
      })}
    </div>
  )
}

export default TodoList
