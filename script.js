// Function to add task
function addTask() {
  var dateInput = document.getElementById("dateInput").value;
  var taskInput = document.getElementById("taskInput").value.trim();
  if (taskInput === "") {
    alert("Please enter a task.");
    return;
  }
  if (dateInput === "") {
    alert("Please select a date.");
    return;
  }

  var todoList = JSON.parse(localStorage.getItem("todoList")) || [];
  todoList.push({ task: taskInput, date: dateInput, completed: false });
  localStorage.setItem("todoList", JSON.stringify(todoList));

  displayTodoList();
  // Clear input fields
  document.getElementById("taskInput").value = "";
  document.getElementById("dateInput").value = "";
}

// Function to display todo list
function displayTodoList() {
  var todoList = JSON.parse(localStorage.getItem("todoList")) || [];
  var todoListContainer = document.getElementById("todoList");
  todoListContainer.innerHTML = "";

  // Group tasks by date
  var groupedTasks = {};
  todoList.forEach(function (todoItem) {
    if (!groupedTasks[todoItem.date]) {
      groupedTasks[todoItem.date] = [];
    }
    groupedTasks[todoItem.date].push(todoItem);
  });

  // Display tasks under each date
  for (var date in groupedTasks) {
    var todoCard = document.createElement("div");
    todoCard.className = "todo-card";
    var tasksHTML = "<h3>" + date + "</h3>";
    groupedTasks[date].forEach(function (task, index) {
      var taskClass = task.completed ? "completed-task" : "";
      tasksHTML += `<p class="task-container">
          <span>
            <input type='checkbox' onchange='toggleTaskCompletion(${JSON.stringify(
              task
            )}, ${index})' ${task.completed ? "checked" : ""}>
            <span class='${taskClass}'>${task.task}</span>
          </span>
          <button class="trash-icon" onclick='deleteTask(${JSON.stringify(
            task
          )}, ${index})'><i class="fa-solid fa-trash"></i></button>
        </p>`;
    });
    todoCard.innerHTML = tasksHTML;
    todoListContainer.appendChild(todoCard);
  }

  // Call addHoverEffect function for all trash icon buttons
  var trashButtons = document.querySelectorAll(".task-container .trash-icon");
  trashButtons.forEach(function (trashButton) {
    addHoverEffect(trashButton);
  });
}

// Function to toggle task completion
function toggleTaskCompletion(task, index) {
  var todoList = JSON.parse(localStorage.getItem("todoList")) || [];
  var taskToUpdate = todoList.find(function (todoItem) {
    return todoItem.task === task.task && todoItem.date === task.date;
  });
  taskToUpdate.completed = !taskToUpdate.completed;
  localStorage.setItem("todoList", JSON.stringify(todoList));

  displayTodoList();
}

// Function to delete task
function deleteTask(task, index) {
  var todoList = JSON.parse(localStorage.getItem("todoList")) || [];
  var filteredList = todoList.filter(function (todoItem) {
    return !(todoItem.task === task.task && todoItem.date === task.date);
  });
  localStorage.setItem("todoList", JSON.stringify(filteredList));

  displayTodoList();
}

// Function to add hover effect on trash icon
function addHoverEffect(trashButton) {
  // Add event listener for mouseover
  trashButton.addEventListener("mouseover", function () {
    // Change icon color to red on hover
    trashButton.querySelector("i").style.color = "red";
  });

  // Add event listener for mouseout
  trashButton.addEventListener("mouseout", function () {
    // Change icon color back to default on mouseout
    trashButton.querySelector("i").style.color = ""; // Reset to default color
  });
}

// Function to toggle theme
function toggleTheme() {
  var body = document.body;
  var currentBackgroundColor =
    getComputedStyle(body).getPropertyValue("background-color");
  if (
    currentBackgroundColor === "rgb(249, 246, 238)" ||
    currentBackgroundColor === "#F9F6EE"
  ) {
    body.style.backgroundColor = "#222831";
    body.style.color = "#F9F6EE";
  } else {
    body.style.backgroundColor = "#F9F6EE";
    body.style.color = "#222831";
  }
}

document.getElementById("ic_con").addEventListener("click", toggleTheme);
document.getElementById("addTaskBtn").addEventListener("click", addTask);

displayTodoList();
