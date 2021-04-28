export type Todo = {
  id: string
  text: string
  completed: boolean
}

export type Todos = Todo[]

export const SHOW_ALL = 'SHOW_ALL'
export const SHOW_COMPLATED = 'SHOW_COMPLATED'
export const SHOW_UNCOMPLATED = 'SHOW_UNCOMPLATED'

export type VisibilityFilter = 'SHOW_ALL' | 'SHOW_COMPLATED' | 'SHOW_UNCOMPLATED'

export type User = {
  name: string
  age: number
  desc: string
  email: string
}
