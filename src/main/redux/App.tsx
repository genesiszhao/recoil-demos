import React from 'react'
import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { Todo, Todos, VisibilityFilter } from '../../types'
import { SHOW_ALL, SHOW_COMPLATED, SHOW_UNCOMPLATED } from '../../constants'
import { nanoid } from 'nanoid'
import TodoCreator from '../../components/TodoCreator'
import TodoList from '../../components/TodoList'
import ChangeFilter from '../../components/ChangeFilter'

const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todos,
  reducers: {
    addTodo: {
      reducer: (state, action: PayloadAction<Todo>) => {
        return [...state, action.payload]
      },
      prepare: (text: string) => {
        const id = nanoid()
        return { payload: { id, text, completed: false } }
      },
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      return state.filter((_) => _.id !== action.payload)
    },
    switchTodo: (state, action: PayloadAction<string>) => {
      return state.map((_) => {
        if (_.id !== action.payload) {
          return _
        } else {
          return {
            ..._,
            completed: !_.completed,
          }
        }
      })
    },
  },
})

const visibilityFilterSlice = createSlice({
  name: 'visibilityFilter',
  initialState: 'SHOW_ALL' as VisibilityFilter,
  reducers: {
    changeFilter: (_, action: PayloadAction<VisibilityFilter>) => {
      return action.payload
    },
  },
})

const store = configureStore({
  reducer: {
    todos: todosSlice.reducer,
    visibilityFilter: visibilityFilterSlice.reducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

// 为todoList创建 增删改查 Hooks
function useTodoList() {
  const todoList = useSelector((state: RootState) => {
    switch (state.visibilityFilter) {
      case SHOW_ALL:
        return state.todos
      case SHOW_COMPLATED:
        return state.todos.filter((_) => _.completed)
      case SHOW_UNCOMPLATED:
        return state.todos.filter((_) => !_.completed)
      default:
        return []
    }

    // return state.todos
  })
  const dispatch = useDispatch()

  const addTodo = React.useCallback(
    (value: string) => {
      dispatch(todosSlice.actions.addTodo(value))
    },
    [dispatch]
  )

  const removeTodo = React.useCallback(
    (id: string) => {
      dispatch(todosSlice.actions.removeTodo(id))
    },
    [dispatch]
  )

  const switchTodo = React.useCallback(
    (id: string) => {
      dispatch(todosSlice.actions.switchTodo(id))
    },
    [dispatch]
  )

  return { todoList, addTodo, removeTodo, switchTodo }
}

function useVisibilityFilter() {
  const visibilityFilter = useSelector((state: RootState) => {
    return state.visibilityFilter
  })
  const dispatch = useDispatch()

  const onChangeFilter = React.useCallback(
    (filter: VisibilityFilter) => {
      dispatch(visibilityFilterSlice.actions.changeFilter(filter))
    },
    [dispatch]
  )

  return { visibilityFilter, onChangeFilter }
}

function Content() {
  const { todoList, addTodo, removeTodo, switchTodo } = useTodoList()
  const { visibilityFilter, onChangeFilter } = useVisibilityFilter()

  return (
    <div>
      <TodoCreator defaultValue="" onSubmit={addTodo} />
      <ChangeFilter currentFilter={visibilityFilter} onChange={onChangeFilter} />
      <TodoList todos={todoList} onSwitchTodo={switchTodo} onRemoveTodo={removeTodo} />
    </div>
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <Content />
    </Provider>
  )
}
