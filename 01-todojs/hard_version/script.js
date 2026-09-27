/* Full-featured Todo app: add, edit, delete, complete, filter, persist, reorder */
(function () {
  const input = document.getElementById("todoInput");
  const addBtn = document.getElementById("addBtn");
  const listEl = document.getElementById("todoList");
  const countEl = document.getElementById("count");
  const clearCompletedBtn = document.getElementById("clearCompleted");
  const filterBtns = Array.from(document.querySelectorAll(".filter-btn"));

  const STORAGE_KEY = "todos_v1";
  let todos = [];
  let filter = "all";

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }
  function load() {
    try {
      todos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch (e) {
      todos = [];
    }
  }

  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  }

  function render() {
    listEl.innerHTML = "";
    const visible = todos.filter((t) =>
      filter === "all"
        ? true
        : filter === "active"
          ? !t.completed
          : t.completed,
    );
    visible.forEach(addListItem);
    const left = todos.filter((t) => !t.completed).length;
    countEl.textContent = `${left} item${left !== 1 ? "s" : ""} left`;
    save();
  }

  function addListItem(todo) {
    const li = document.createElement("li");
    li.className = "todo-item" + (todo.completed ? " completed" : "");
    li.setAttribute("draggable", "true");
    li.dataset.id = todo.id;

    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.checked = !!todo.completed;
    cb.addEventListener("change", () => {
      todo.completed = cb.checked;
      li.classList.toggle("completed", todo.completed);
      render();
    });

    const span = document.createElement("span");
    span.className = "text";
    span.textContent = todo.text;
    span.tabIndex = 0;
    span.addEventListener("dblclick", () => startEdit(todo, li));

    const editInput = document.createElement("input");
    editInput.className = "edit-input";
    editInput.value = todo.text;
    editInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") finishEdit(todo, editInput, li);
      if (e.key === "Escape") cancelEdit(li);
    });
    editInput.addEventListener("blur", () => finishEdit(todo, editInput, li));

    const actions = document.createElement("div");
    actions.className = "actions";
    const editBtn = document.createElement("button");
    editBtn.className = "btn edit";
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => startEdit(todo, li));
    const delBtn = document.createElement("button");
    delBtn.className = "btn delete";
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", () => {
      todos = todos.filter((t) => t.id !== todo.id);
      render();
    });
    actions.appendChild(editBtn);
    actions.appendChild(delBtn);

    const handle = document.createElement("span");
    handle.className = "handle";
    handle.textContent = "⋮⋮";
    handle.title = "Drag to reorder";

    li.appendChild(cb);
    li.appendChild(span);
    li.appendChild(editInput);
    li.appendChild(actions);
    li.appendChild(handle);

    // Drag events
    li.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", todo.id);
      li.classList.add("dragging");
    });
    li.addEventListener("dragend", () => li.classList.remove("dragging"));
    li.addEventListener("dragover", (e) => {
      e.preventDefault();
      const dragging = document.querySelector(".dragging");
      if (!dragging) return;
      const rect = li.getBoundingClientRect();
      const after = e.clientY - rect.top > rect.height / 2;
      if (after)
        ((li.style["border-bottom"] = "2px solid rgba(79,70,229,0.14)"),
          (li.style["border-top"] = ""));
      else
        ((li.style["border-top"] = "2px solid rgba(79,70,229,0.14)"),
          (li.style["border-bottom"] = ""));
    });
    li.addEventListener("dragleave", () => {
      li.style["border-bottom"] = "";
      li.style["border-top"] = "";
    });
    li.addEventListener("drop", (e) => {
      e.preventDefault();
      li.style["border-bottom"] = "";
      li.style["border-top"] = "";
      const fromId = e.dataTransfer.getData("text/plain");
      const toId = todo.id;
      if (fromId === toId) return;
      reorder(
        fromId,
        toId,
        e.clientY <
          li.getBoundingClientRect().top +
            li.getBoundingClientRect().height / 2,
      );
      render();
    });

    listEl.appendChild(li);
  }

  function reorder(fromId, toId, insertBefore) {
    const fromIndex = todos.findIndex((t) => t.id === fromId);
    const toIndex = todos.findIndex((t) => t.id === toId);
    if (fromIndex < 0 || toIndex < 0) return;
    const [item] = todos.splice(fromIndex, 1);
    const newIndex = insertBefore ? toIndex : toIndex + 1;
    todos.splice(newIndex, 0, item);
  }

  function startEdit(todo, li) {
    const input = li.querySelector(".edit-input");
    const span = li.querySelector(".text");
    span.style.display = "none";
    input.style.display = "block";
    input.focus();
    input.select();
  }
  function finishEdit(todo, inputEl, li) {
    const val = inputEl.value.trim();
    if (val) {
      todo.text = val;
    } else {
      todos = todos.filter((t) => t.id !== todo.id);
    }
    inputEl.style.display = "none";
    li.querySelector(".text").style.display = "block";
    render();
  }
  function cancelEdit(li) {
    const inputEl = li.querySelector(".edit-input");
    inputEl.style.display = "none";
    li.querySelector(".text").style.display = "block";
  }

  addBtn.addEventListener("click", addFromInput);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addFromInput();
  });

  function addFromInput() {
    const text = input.value.trim();
    if (!text) return;
    const todo = { id: uid(), text, completed: false };
    todos.unshift(todo);
    input.value = "";
    render();
  }

  filterBtns.forEach((b) =>
    b.addEventListener("click", () => {
      filterBtns.forEach((x) => x.classList.remove("active"));
      b.classList.add("active");
      filter = b.dataset.filter;
      render();
    }),
  );

  clearCompletedBtn.addEventListener("click", () => {
    todos = todos.filter((t) => !t.completed);
    render();
  });

  // initial load
  load();
  render();
})();
const input = document.getElementById("todoInput");
const button = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

todoList.innerHTML = "<li> Todo list </li>";

// take input

button.addEventListener("click", () => {});
