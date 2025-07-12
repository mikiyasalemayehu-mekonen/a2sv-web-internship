import promptSync from "prompt-sync";
const prompt = promptSync();

interface TodoItem {
  id: number;
  task: string;
  completed: boolean;
}

let nextId = 1;

let todoList: TodoItem[] = [];

function addTask(task: string): void {
  const newItem: TodoItem = {
    id: nextId++,
    task,
    completed: false,
  };
  todoList.push(newItem);
  console.log("✅ Task added:", newItem);
}

function editTask(id: number, newTask: string): void {
  const item = todoList.find((todo) => todo.id === id);
  if (item) {
    item.task = newTask;
    console.log("✏️ Task edited:", item);
  } else {
    console.log("❌ Task not found");
  }
}

function deleteTask(id: number): void {
  todoList = todoList.filter((todo) => todo.id !== id);
  console.log("🗑️ Task deleted. Current List:", todoList);
}

function displayTasks(): void {
  console.log("\n📋 Todo List:");
  todoList.forEach((item) => {
    console.log(
      `[${item.completed ? "✓" : " "}] ${item.task} (ID: ${item.id})`
    );
  });
}

let choice: string;

do {
  console.log("\n--- Todo App Menu ---");
  console.log("1. Add Task");
  console.log("2. Edit Task");
  console.log("3. Delete Task");
  console.log("4. Display Tasks");
  console.log("5. Exit");

  choice = prompt("Enter your choice (1-5): ");

  switch (choice) {
    case "1":
      const newTask = prompt("Enter task: ");
      addTask(newTask);
      break;
    case "2":
      const editId = parseInt(prompt("Enter task ID to edit: "));
      const updatedTask = prompt("Enter new task: ");
      editTask(editId, updatedTask);
      break;
    case "3":
      const deleteId = parseInt(prompt("Enter task ID to delete: "));
      deleteTask(deleteId);
      break;
    case "4":
      displayTasks();
      break;
    case "5":
      console.log("👋 Exiting...");
      break;
    default:
      console.log("❌ Invalid choice. Please enter 1-5.");
  }
} while (choice !== "5");
