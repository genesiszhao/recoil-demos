import React from 'react'
import { makeObservable, observable, action, computed, IObservableArray, IObservableValue, IComputedValue } from 'mobx'
import { Provider, inject, observer } from 'mobx-react'
import { Todo, Todos, VisibilityFilter } from '../../types'
import { SHOW_ALL, SHOW_COMPLATED, SHOW_UNCOMPLATED } from '../../constants'
import { nanoid } from 'nanoid'
import TodoCreator from '../../components/TodoCreator'
import TodoList from '../../components/TodoList'
import ChangeFilter from '../../components/ChangeFilter'

// 无法对多个可观察状态交叉计算computed， 持用computed解决了，但是交叉计算的计算值无法跟组件对接起来

// 定义状态并使之可观察
const todoList = observable.array<Todo>([])

function useTodoList(observableTodoList: IObservableArray<Todo>) {
  const addTodo = React.useCallback(
    (value: string) => {
      observableTodoList.push({
        id: nanoid(),
        text: value,
        completed: false,
      })
    },
    [observableTodoList]
  )

  const removeTodo = React.useCallback(
    (id: string) => {
      const index = observableTodoList.findIndex((_) => _.id === id)

      observableTodoList.splice(index, 1)
    },
    [observableTodoList]
  )

  const switchTodo = React.useCallback(
    (id: string) => {
      observableTodoList.forEach((_) => {
        if (_.id === id) {
          _.completed = !_.completed
        }
      })
    },
    [observableTodoList]
  )

  return { todoList: observableTodoList, addTodo, removeTodo, switchTodo }
}

const visibilityFilter = observable.box<VisibilityFilter>(SHOW_ALL)

function useVisibilityFilter(observableVisibilityFilter: IObservableValue<VisibilityFilter>) {
  const onChangeFilter = React.useCallback(
    (filter: VisibilityFilter) => {
      observableVisibilityFilter.set(filter)
    },
    [observableVisibilityFilter]
  )

  return { visibilityFilter: observableVisibilityFilter.get(), onChangeFilter }
}

const filteredTodoList = computed(() => {
  switch (visibilityFilter.get()) {
    case SHOW_COMPLATED:
      return todoList.filter((_) => _.completed)
    case SHOW_UNCOMPLATED:
      return todoList.filter((_) => !_.completed)
    default:
      return todoList
  }
})

type ContentProps = {
  observableTodoList: IObservableArray<Todo>
  observableVisibilityFilter: IObservableValue<VisibilityFilter>
  filteredTodoList: IComputedValue<Todo[]>
}

const Content = observer(({ observableTodoList, observableVisibilityFilter, filteredTodoList }: ContentProps) => {
  const { addTodo, removeTodo, switchTodo } = useTodoList(observableTodoList)
  const { visibilityFilter, onChangeFilter } = useVisibilityFilter(observableVisibilityFilter)

  return (
    <div>
      <TodoCreator defaultValue="" onSubmit={addTodo} />
      <ChangeFilter currentFilter={visibilityFilter} onChange={onChangeFilter} />
      <TodoList todos={filteredTodoList.get()} onSwitchTodo={switchTodo} onRemoveTodo={removeTodo} />
    </div>
  )
})

export default function App() {
  return (
    <div>
      <Content
        observableTodoList={todoList}
        observableVisibilityFilter={visibilityFilter}
        filteredTodoList={filteredTodoList}
      />
    </div>
  )
}
