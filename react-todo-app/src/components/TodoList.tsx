import React,{useState} from 'react';
import type TodoTypes from '../todo'; 
import TodoService from '../TodoService';
import { FaCheck, FaEdit } from 'react-icons/fa';
import { GiCancel } from 'react-icons/gi';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import TodoForm from './TodoForm';
import "../css/TodoList.css"

const TodoList = () => {

    const [todos,setTodos] = useState<TodoTypes[]>(TodoService.getTodos());
    const [editingTodoId,setEditedTodoId] = useState<number | null> (null);
    const [editingTodoText, setEditedTodoText] = useState<string>("");

    const handleEditStart = (id:number,text:string) =>{
        setEditedTodoId(id);
        setEditedTodoText(text)

    }
    const handleEditCancel = () =>{
          setEditedTodoId(null);
          setEditedTodoText("");
    }

 const handleEditSave = (id: number) => {
   if (editingTodoText.trim() !== "") {
     const existingTodo = todos.find((t) => t.id === id);
     if (existingTodo) {
       const updatedTodo: TodoTypes = TodoService.updateTodo({
         id,
         text: editingTodoText,
         completed: existingTodo.completed, // Preserve completed status
       });
       setTodos((prevTodos) =>
         prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
       );
     }
     setEditedTodoId(null);
     setEditedTodoText("");
   }
 };

    const handleDeleteTodo = (id:number)=>{
        TodoService.deleteTodo(id);
        setTodos((prevTodo) => prevTodo.filter((todo) => todo.id!=id))
    }
    
  return (
    <div className="todoContainer">
      <div>
        <TodoForm setTodos={setTodos} />
      </div>
      <div className="todos">
        {todos.map((todo) => (
          <div className="items" key={todo.id}>
            {editingTodoId === todo.id ? (
              <div className="editText">
                <input
                  type="text"
                  value={editingTodoText}
                  onChange={(e) => setEditedTodoText(e.target.value)}
                  autoFocus={true}
                />
                <button onClick={() => handleEditSave(todo.id)}>
                  <FaCheck />
                </button>
                <button className="cancelBtn" onClick={handleEditCancel}>
                  <GiCancel />
                </button>
              </div>
            ) : (
              <div className="editBtn">
                <span>{todo.text}</span>
                <button onClick={() => handleEditStart(todo.id, todo.text)}>
                  <FaEdit />
                </button>
                
              </div>
            )}
            <button onClick={() => handleDeleteTodo(todo.id)}>
              <RiDeleteBin5Fill />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
