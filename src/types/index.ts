export type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

export type Todos = Todo[];

export enum EVisibilityFilter {
  "SHOW_ALL",
  "SHOW_COMPLATED",
  "SHOW_UNCOMPLATED",
}

export type VisibilityFilter =
  | "SHOW_ALL"
  | "SHOW_COMPLATED"
  | "SHOW_UNCOMPLATED";