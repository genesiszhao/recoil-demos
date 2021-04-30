export type Todo = {
  id: string
  text: string
  completed: boolean
}

export type Todos = Todo[]

export type VisibilityFilter = 'SHOW_ALL' | 'SHOW_COMPLATED' | 'SHOW_UNCOMPLATED'
