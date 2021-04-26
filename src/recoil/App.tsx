import React from 'react'
import { RecoilRoot, atom, useRecoilState } from 'recoil'
import { nanoid } from 'nanoid'
import { Todos } from '../types'
import TodoCreator from '../components/TodoCreator'
import TodoList from '../components/TodoList'

const todoListState = atom<Todos>({
  key: 'todoListState',
  default: [],
})

function useTodoList() {
  const [todoList, setTodoList] = useRecoilState(todoListState)

  const addTodo = React.useCallback((value: string) => {
    setTodoList([
      ...todoList,
      {
        id: nanoid(),
        text: value,
        completed: false,
      },
    ])
  }, [])

  const removeTodo = React.useCallback((id: string) => {
    setTodoList(todoList.filter((_) => _.id === id))
  }, [])

  const switchTodo = React.useCallback((id: string) => {
    setTodoList(
      todoList.map((_) => {
        if (_.id === id) {
          return { ..._, completed: !_.completed }
        } else {
          return _
        }
      })
    )
  }, [])

  return { todoList, addTodo, removeTodo, switchTodo }
}

function App() {
  return (
    <RecoilRoot>
      <Content />
    </RecoilRoot>
  )
}

function Content() {
  const { todoList, addTodo, removeTodo, switchTodo } = useTodoList()

  return (
    <div>
      <TodoCreator defaultValue="" onSubmit={addTodo} />
      <TodoList todos={todoList} onSwitchTodo={switchTodo} onRemoveTodo={removeTodo} />
    </div>
  )
}

export default App
