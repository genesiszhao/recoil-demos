import React from "react";
import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";
import { Provider, useDispatch, useSelector, useStore } from "react-redux";
import { Todo, Todos } from "../types";
import { nanoid } from "nanoid";
import TodoCreator from "../components/TodoCreator";
import TodoList from "../components/TodoList";

const todosSlice = createSlice({
  name: "todos",
  initialState: [] as Todos,
  reducers: {
    addTodo: {
      reducer: (state, action: PayloadAction<Todo>) => {
        return [...state, action.payload];
      },
      prepare: (text: string) => {
        const id = nanoid();
        return { payload: { id, text, completed: false } };
      },
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      return state.filter((_) => _.id !== action.payload);
    },
    switchTodo: (state, action: PayloadAction<string>) => {
      return state.map((_) => {
        if (_.id !== action.payload) {
          return _;
        } else {
          return {
            ..._,
            completed: !_.completed,
          };
        }
      });
    },
  },
});

const store = configureStore({
  reducer: {
    todos: todosSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

function App() {
  return (
    <Provider store={store}>
      <Content />
    </Provider>
  );
}

function Content() {
  const todos = useSelector((state: RootState) => {
    return state.todos;
  });
  const dispatch = useDispatch();

  const onSubmit = React.useCallback((value: string) => {
    dispatch(todosSlice.actions.addTodo(value));
  }, []);

  const onSwitchTodo = React.useCallback((id: string) => {
    dispatch(todosSlice.actions.switchTodo(id));
  }, []);

  const onRemoveTodo = React.useCallback((id: string) => {
    dispatch(todosSlice.actions.removeTodo(id));
  }, []);

  return (
    <div>
      <TodoCreator defaultValue="" onSubmit={onSubmit} />
      <TodoList
        todos={todos}
        onSwitchTodo={onSwitchTodo}
        onRemoveTodo={onRemoveTodo}
      />
    </div>
  );
}

export default App;
