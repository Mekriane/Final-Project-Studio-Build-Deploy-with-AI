const input = document.getElementById("task-input");
const addBtn = document.getElementById("add-task");
const list = document.getElementById("task-list");
const filters = document.querySelectorAll(".filters button");
const counter = document.getElementById("task-counter");
const clearAllBtn = document.getElementById("clear-all");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

renderTasks();

addBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (text === "") return;
  tasks.push({ text, completed: false });
  input.value = "";
  saveTasks();
  renderTasks();
});

list.addEventListener("click", (e) => {
  const index = e.target.closest("li").dataset.index;
  if (e.target.classList.contains("fa-check")) {
    tasks[index].completed = !tasks[index].completed;
  }
  if (e.target.classList.contains("fa-trash")) {
    tasks.splice(index, 1);
  }
  saveTasks();
  renderTasks();
});

filters.forEach(btn => {
  btn.addEventListener("click", () => {
    filters.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    renderTasks();
  });
});

clearAllBtn.addEventListener("click", () => {
  tasks = [];
  saveTasks();
  renderTasks();
});

function renderTasks() {
  list.innerHTML = "";
  let filtered = tasks;
  if (currentFilter === "active") filtered = tasks.filter(t => !t.completed);
  if (currentFilter === "completed") filtered = tasks.filter(t => t.completed);

  filtered.forEach((task, index) => {
    const li = document.createElement("li");
    li.dataset.index = tasks.indexOf(task);
    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      <span>${task.text}</span>
      <div class="actions">
        <i class="fas fa-check"></i>
        <i class="fas fa-trash"></i>
      </div>
    `;
    list.appendChild(li);
  });

  const activeCount = tasks.filter(t => !t.completed).length;
  counter.textContent = `${activeCount} task${activeCount !== 1 ? "s" : ""} left`;
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
