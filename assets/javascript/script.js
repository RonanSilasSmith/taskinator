var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var pageContentEl = document.querySelector("#page-content");
var taskIdCounter = 0;
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var completeEditTask = function(taskName, taskType, taskId){
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;


    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
};

var taskFormHandler = function(){

    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    if (!taskNameInput || !taskTypeInput){
        return false;
    }

    formEl.reset();

    var isEdit = formEl.hasAttribute("data-task-id");
    console.log(isEdit);

    if(isEdit){
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }else{
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput
        };
    }



    createTaskEl(taskDataObj);
}

var createTaskEl = function(taskDataObj){
    // create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    listItemEl.setAttribute("data-task-id", taskIdCounter);

    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    // give it a class name
    taskInfoEl.className = "task-info";
    // add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    listItemEl.appendChild(taskInfoEl);

    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);

    taskIdCounter++;
}

var createTaskActions = function(taskId){
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    var statusChoices = ["To Do", "In Progress", "Completed"];
    for(var i = 0; i < statusChoices.length; i++){
        var statusOptionsEl = document.createElement("option");
        statusOptionsEl.textContent = statusChoices[i];
        statusOptionsEl.setAttribute("value", statusChoices[i]);

        statusSelectEl.appendChild(statusOptionsEl);
    }

    actionContainerEl.appendChild(statusSelectEl);


    return actionContainerEl;
};

var deleteTask = function (taskId){
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
};

var editTask = function (taskId){
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    console.log(taskName);

    var taskType = taskSelected.querySelector("span.task-type").textContent;
    console.log(taskType);

    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;

    document.querySelector("#save-task").textContent = "Save Task";
    formEl.setAttribute("data-task-id", taskId);
}

var taskButtonHandler = function(event) {
    console.log(event.target);
    var targetEl = event.target;

  
    if (targetEl.matches(".edit-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
      } 
      // delete button was clicked
      else if (targetEl.matches(".delete-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
      }
  };

var taskStatusChangeHandler = function(event) {
    var taskId = event.target.getAttribute("data-task-id");

    var statusValue = event.target.value.toLowerCase();

    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    if (statusValue === "to do"){
        tasksToDoEl.appendChild(taskSelected);
    }else if(statusValue === "in progress"){
        tasksInProgressEl.appendChild(taskSelected);
    }else if(statusValue === "completed"){
        tasksCompletedEl.appendChild(taskSelected);
    }
};


pageContentEl.addEventListener("click", taskButtonHandler);
formEl.addEventListener("submit", taskFormHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);