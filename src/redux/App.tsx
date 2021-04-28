import React from 'react'
import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { Todo, Todos, VisibilityFilter, SHOW_ALL, SHOW_COMPLATED, SHOW_UNCOMPLATED } from '../types'
import { nanoid } from 'nanoid'
import TodoCreator from '../components/TodoCreator'
import TodoList from '../components/TodoList'

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

// const visiableFilterSlice = createSlice({
//   name: 'visiableFilter',
//   initialState: 'SHOW_ALL' as VisibilityFilter,
//   reducers: {
//     changeFilter: (_, action: PayloadAction<VisibilityFilter>) => {
//       return action.payload
//     },
//   },
// })

const store = configureStore({
  reducer: {
    todos: todosSlice.reducer,
    // visiableFilter: visiableFilterSlice.reducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

function useTodoList() {
  const todoList = useSelector((state: RootState) => {
    return state.todos
  })
  const dispatch = useDispatch()

  const addTodo = React.useCallback((value: string) => {
    dispatch(todosSlice.actions.addTodo(value))
  }, [])

  const removeTodo = React.useCallback((id: string) => {
    dispatch(todosSlice.actions.removeTodo(id))
  }, [])

  const switchTodo = React.useCallback((id: string) => {
    dispatch(todosSlice.actions.switchTodo(id))
  }, [])

  return { todoList, addTodo, removeTodo, switchTodo }
}

// function useFilterTodoList() {
//   const todoList = useSelector((state: RootState) => {
//     return state.todos
//   })
//   const visiableFilter = useSelector((state: RootState) => {
//     return state.visiableFilter
//   })

//   switch (visiableFilter) {
//     case SHOW_ALL:
//       return todoList
//     case SHOW_COMPLATED:
//       return todoList.filter((_) => _.completed)
//     case SHOW_UNCOMPLATED:
//       return todoList.filter((_) => !_.completed)
//     default:
//       return []
//   }
// }

function App() {
  return (
    <Provider store={store}>
      <Content />
    </Provider>
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
