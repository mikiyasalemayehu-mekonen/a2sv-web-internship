const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

function addTask() {
  if (input.value.trim() === "") {
    alert("Please enter a task.");
    return;
  }
  let li = document.createElement("li");
  let taskText = document.createElement("span");
  taskText.classList.add("task-text");
  taskText.textContent = input.value;
  let editSpan = document.createElement("span");
  editSpan.innerHTML = "\u270E"; 
  editSpan.classList.add("edit-btn");
  let deleteSpan = document.createElement("span");
  deleteSpan.innerHTML = "\u00d7"; 
  deleteSpan.classList.add("delete-btn");
  li.appendChild(taskText);
  li.appendChild(editSpan);
  li.appendChild(deleteSpan);
  taskList.appendChild(li);
  input.value = "";
}

function editTask(taskElement, taskTextElement) {
  let currentText = taskTextElement.textContent;
  let inputField = document.createElement("input");
  inputField.type = "text";
  inputField.value = currentText;
  inputField.classList.add("edit-input");

  taskElement.replaceChild(inputField, taskTextElement);
  inputField.focus();

  inputField.addEventListener("blur", function () {
    let newText = inputField.value.trim();
    if (newText === "") {
      alert("Task cannot be empty.");
      taskElement.remove();
    } else {
      taskTextElement.textContent = newText;
      taskElement.replaceChild(taskTextElement, inputField);
    }
  });

  inputField.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      inputField.blur();
    }
  });
}

taskList.addEventListener("click", function (e) {
  if (e.target.classList.contains("edit-btn")) {
    let taskElement = e.target.parentElement;
    let taskTextElement = taskElement.querySelector(".task-text");
    editTask(taskElement, taskTextElement);
  } else if (e.target.classList.contains("delete-btn")) {
    e.target.parentElement.remove();
  } else if (e.target.classList.contains("task-text")) {
    e.target.parentElement.classList.toggle("checked");
  }
});

input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

addBtn.addEventListener("click", addTask);

function saveData() {
  localStorage.setItem("data", taskList.innerHTML);
}

function showTask() {
  taskList.innerHTML = localStorage.getItem("data") || ""; 
}

// Call showTask to load tasks on page load
showTask()
