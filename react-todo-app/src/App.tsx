import TodoList from "./components/TodoList";
import "./CSS/App.css";
import { FaPen, FaClipboardList } from "react-icons/fa";
function App() {
  return (
    <div className="App">
      <div className="header">
        <div className="logoside">
          <FaPen />
          <h1>My ToDo list</h1>
          <FaClipboardList />
        </div>
      </div>
      <TodoList />
    </div>
  );
}

export default App;
