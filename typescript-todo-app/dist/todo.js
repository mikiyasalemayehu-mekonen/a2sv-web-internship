"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const prompt = (0, prompt_sync_1.default)();
let nextId = 1;
let todoList = [];
function addTask(task) {
    const newItem = {
        id: nextId++,
        task,
        completed: false,
    };
    todoList.push(newItem);
    console.log("✅ Task added:", newItem);
}
function editTask(id, newTask) {
    const item = todoList.find((todo) => todo.id === id);
    if (item) {
        item.task = newTask;
        console.log("✏️ Task edited:", item);
    }
    else {
        console.log("❌ Task not found");
    }
}
function deleteTask(id) {
    todoList = todoList.filter((todo) => todo.id !== id);
    console.log("🗑️ Task deleted. Current List:", todoList);
}
function displayTasks() {
    console.log("\n📋 Todo List:");
    todoList.forEach((item) => {
        console.log(`[${item.completed ? "✓" : " "}] ${item.task} (ID: ${item.id})`);
    });
}
let choice;
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
//# sourceMappingURL=todo.js.map