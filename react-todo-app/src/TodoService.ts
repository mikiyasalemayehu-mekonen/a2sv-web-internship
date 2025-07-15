import type TodoTypes from "./todo";

const LOCAL_STORAGE_KEY = "todos";

const TodoService = {
  getTodos: (): TodoTypes[] => {
    try {
      const todoStr = localStorage.getItem(LOCAL_STORAGE_KEY);
      return todoStr ? JSON.parse(todoStr) : [];
    } catch (error) {
      console.error("Error parsing todos:", error);
      return [];
    }
  },

  addTodos: (text: string): TodoTypes => {
    const todos = TodoService.getTodos();
    const newTodo: TodoTypes = { id: todos.length + 1, text, completed: false };
    const updateTodos = [...todos, newTodo];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateTodos));
    return newTodo;
  },

  updateTodo: (todo: TodoTypes): TodoTypes => {
    const todos = TodoService.getTodos();
    const updateTodos = todos.map((t) => (t.id === todo.id ? todo : t));
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateTodos));
    return todo; // Return single TodoTypes object
  },

  deleteTodo: (id: number): void => {
    const todos = TodoService.getTodos();
    const updateTodos = todos.filter((todo) => todo.id !== id); // Fixed: use filter
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateTodos));
  },
};

export default TodoService;
