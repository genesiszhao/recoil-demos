import React from 'react'
import { RecoilRoot, atom, useRecoilState, useRecoilValue } from 'recoil'
import { nanoid } from 'nanoid'
import { Todos, VisibilityFilter } from '../../types'
import { SHOW_ALL, SHOW_COMPLATED, SHOW_UNCOMPLATED } from '../../constants'
import TodoCreator from '../../components/TodoCreator'
import TodoList from '../../components/TodoList'
import ChnageFilter from '../../components/ChangeFilter'

const todoListState = atom<Todos>({
  key: 'todoListState',
  default: [],
})

// 为todoList创建 增删改查 Hooks
function useTodoList() {
  const [todoList, setTodoList] = useRecoilState(todoListState)
  const visibilityFilter = useRecoilValue(visibilityFilterState)

  const addTodo = React.useCallback(
    (value: string) => {
      setTodoList([
        ...todoList,
        {
          id: nanoid(),
          text: value,
          completed: false,
        },
      ])
    },
    [todoList, setTodoList]
  )

  const removeTodo = React.useCallback(
    (id: string) => {
      setTodoList(todoList.filter((_) => _.id !== id))
    },
    [todoList, setTodoList]
  )

  const switchTodo = React.useCallback(
    (id: string) => {
      setTodoList(
        todoList.map((_) => {
          if (_.id === id) {
            return { ..._, completed: !_.completed }
          } else {
            return _
          }
        })
      )
    },
    [todoList, setTodoList]
  )

  return {
    // todoList,
    todoList: todoList.filter((_) => {
      switch (visibilityFilter) {
        case SHOW_ALL:
          return true
        case SHOW_COMPLATED:
          return _.completed
        case SHOW_UNCOMPLATED:
          return !_.completed
        default:
          return []
      }
    }),
    addTodo,
    removeTodo,
    switchTodo,
  }
}

const visibilityFilterState = atom<VisibilityFilter>({
  key: 'visibilityFilterState',
  default: 'SHOW_ALL',
})

// 为visibilityFilter创建 改查 Hooks
function useVisibilityFilter() {
  const [visibilityFilter, setVisibilityFilter] = useRecoilState(visibilityFilterState)

  const changeFilter = React.useCallback(
    (filter: VisibilityFilter) => {
      setVisibilityFilter(filter)
    },
    [setVisibilityFilter]
  )

  return { visibilityFilter, changeFilter }
}

function Content() {
  const { todoList, addTodo, removeTodo, switchTodo } = useTodoList()
  const { visibilityFilter, changeFilter } = useVisibilityFilter()

  return (
    <div>
      <TodoCreator defaultValue="" onSubmit={addTodo} />
      <ChnageFilter currentFilter={visibilityFilter} onChange={changeFilter} />
      <TodoList todos={todoList} onSwitchTodo={switchTodo} onRemoveTodo={removeTodo} />
    </div>
  )
}

export default function App() {
  return (
    <RecoilRoot>
      <Content />
    </RecoilRoot>
  )
}
