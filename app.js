const newTaskInput = document.querySelector("#new_task_input");
const addButton = document.querySelector("#add_button");
const incompleteTasksList = document.querySelector(".incomplete_tasks");
const completedTasksList = document.querySelector(".completed_tasks");

function createNewTaskElement(taskText) {
  const listItem = document.createElement("li");
  listItem.className = "task";

  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.className = "checkbox";

  const label = document.createElement("label");
  label.innerText = taskText;
  label.className = "task_label";

  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.className = "task_text";

  const editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.className = "base_button task_edit_button";

  const deleteButton = document.createElement("button");
  deleteButton.className = "base_button task_delete_button";

  const deleteButtonImg = document.createElement("img");
  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.className = "delete_button_img";

  deleteButton.appendChild(deleteButtonImg);

  listItem.append(checkBox, label, editInput, editButton, deleteButton);
  return listItem;
}

function addTask() {
  if (!newTaskInput.value) return;
  const listItem = createNewTaskElement(newTaskInput.value);

  incompleteTasksList.append(listItem);
  bindTaskEvents(listItem);

  newTaskInput.value = "";
}

function editTask() {
  const listItem = this.parentNode;

  const editInput = listItem.querySelector(".task_text");
  const label = listItem.querySelector(".task_label");
  const editButton = listItem.querySelector(".task_edit_button");
  const isEditMode = listItem.classList.contains("editMode");

  if (isEditMode) {
    label.innerText = editInput.value;
    editButton.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editButton.innerText = "Save";
  }

  listItem.classList.toggle("editMode");
}

const deleteTask = function () {
  this.parentNode.remove();
};

function toggleTask() {
  const listItem = this.parentNode;
  if (listItem.parentNode === incompleteTasksList) {
    completedTasksList.appendChild(listItem);
  } else {
    incompleteTasksList.appendChild(listItem);
  }
}

addButton.addEventListener("click", addTask);

function bindTaskEvents(taskListItem) {
  const checkBox = taskListItem.querySelector(".checkbox");
  const editButton = taskListItem.querySelector(".task_edit_button");
  const deleteButton = taskListItem.querySelector(".task_delete_button");

  checkBox.addEventListener("click", toggleTask);
  editButton.addEventListener("click", editTask);
  deleteButton.addEventListener("click", deleteTask);
}
