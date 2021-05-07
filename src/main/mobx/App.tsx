import React from 'react'
import { makeObservable, observable, action, computed, toJS } from 'mobx'
import { Provider, inject, observer, useLocalStore } from 'mobx-react'
import { Todos, VisibilityFilter } from '../../types'
import { SHOW_ALL, SHOW_COMPLATED, SHOW_UNCOMPLATED } from '../../constants'
import { nanoid } from 'nanoid'
import TodoCreator from '../../components/TodoCreator'
import TodoList from '../../components/TodoList'
import ChangeFilter from '../../components/ChangeFilter'

// 不支持多个数据共同computed
// mvc模式又回到最初的困境
// 没有对hooks相应的支持，useLocalObaserable，只是useState的语法糖
class Todo {
  id = nanoid()
  text = ''
  completed = false
  constructor(value: string) {
    makeObservable(this, {
      completed: observable,
    })
    this.text = value
  }
}

// 定义状态并使之可观察
class TodoStore {
  todoList: Todo[] = []
  visibilityFilter: VisibilityFilter = SHOW_ALL
  constructor() {
    makeObservable(this, {
      todoList: observable,
      visibilityFilter: observable,
      filteredTodoList: computed,
      addTodo: action,
      removeTodo: action,
      switchTodo: action,
      onChangeFilter: action,
    })
  }
  // 它们不应有副作用或更新其他可观察物。
  // 避免创建和返回新的可观测值。
  get filteredTodoList() {
    switch (this.visibilityFilter) {
      case SHOW_COMPLATED:
        return this.todoList.filter((_) => _.completed)
      case SHOW_UNCOMPLATED:
        return this.todoList.filter((_) => !_.completed)
      default:
        return this.todoList
    }
  }
  addTodo(value: string) {
    this.todoList = [
      ...this.todoList,
      {
        id: nanoid(),
        text: value,
        completed: false,
      },
    ]
  }

  removeTodo(id: string) {
    this.todoList = this.todoList.filter((_) => _.id !== id)
  }

  switchTodo(id: string) {
    this.todoList = this.todoList.map((_) => {
      if (_.id !== id) {
        return _
      } else {
        return {
          ..._,
          completed: !_.completed,
        }
      }
    })
  }

  onChangeFilter(filter: VisibilityFilter) {
    this.visibilityFilter = filter
  }
}

const todoStore = new TodoStore()
type ContentProps = {
  todoStore: TodoStore
}

const Content = observer(({ todoStore }: ContentProps) => {
  return (
    <div>
      <TodoCreator
        defaultValue=""
        // 如果不实用箭头函数this的指向会是undefinde
        onSubmit={(value: string) => {
          todoStore.addTodo(value)
        }}
      />
      <ChangeFilter
        currentFilter={todoStore.visibilityFilter}
        onChange={(filter: VisibilityFilter) => {
          todoStore.onChangeFilter(filter)
        }}
      />
      <TodoList
        todos={todoStore.filteredTodoList}
        onRemoveTodo={(id: string) => {
          todoStore.removeTodo(id)
        }}
        onSwitchTodo={(id: string) => {
          todoStore.switchTodo(id)
        }}
      />
    </div>
  )
})

export default function App() {
  return (
    <div>
      <Content todoStore={todoStore} />
    </div>
  )
}
