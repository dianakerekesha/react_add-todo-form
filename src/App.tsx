import React, { useState } from 'react';
import './App.scss';
import { getUserById } from './services/userService';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import todosFromServer from './api/todos';
import { TodoWithUser } from './types/todo';

const initialTodos: TodoWithUser[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<TodoWithUser[]>(initialTodos);

  const addTodo = (newTodo: TodoWithUser) => {
    const maxId =
      todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) : 0;
    const todoToSave: TodoWithUser = {
      ...newTodo,
      id: maxId + 1,
      completed: false,
    };

    setTodos(currentTodo => [...currentTodo, todoToSave]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm onSubmit={addTodo} />

      <TodoList todos={todos} />
    </div>
  );
};
