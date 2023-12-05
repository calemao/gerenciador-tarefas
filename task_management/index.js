const statusOptions = {
	1: "Pendente",
	2: "Em andamento",
	3: "Concluída",
	4: "Em atraso",
};

const tasks = [];

let taskIndex = 0;

const deleteTaskButton = document.querySelector("#deleteTaskButton");
const doneTaskButton = document.querySelector("#doneTaskButton");
const cancelTaskEditButton = document.querySelector("#cancelTaskEditButton");
const updateTaskButton = document.querySelector("#updateTaskButton");
const createTaskButton = document.querySelector("#createTaskButton");
const tableBody = document.querySelector("#table-body");
const taskTitle = document.querySelector("#workItem");
const taskStartDate = document.querySelector("#startDate");
const taskStartTime = document.querySelector("#startTime");
const taskFinishDate = document.querySelector("#finishDate");
const taskFinishTime = document.querySelector("#finishTime");

const generateTaskHTMLOnTable = (task) => {
	const { taskTitle, taskStartDatetime, taskFinalDatetime, taskStatus } = task;
	const generatedIndex = tasks.length - 1;

	let tableItemHTML = `
              <tr id="task-${generatedIndex}">
								<td>
                  ${taskTitle}
                </td>
								<td>
                  ${taskStartDatetime}
                </td>
								<td>
                  ${taskFinalDatetime}
                </td>
								<td class="task-status">
                  ${taskStatus}
                </td>
								<td>
									<button 
									  type="button" 
										id="btnUpdateTask-${generatedIndex}"
									  class="btn btn-outline-warning btnUpdateTask"
										onclick="handleUpdateTask(event)"
									>
                    Alterar
                  </button>
								</td>
							</tr>
`;

	tableBody.innerHTML += tableItemHTML;
};

const handleCreateTask = () => {
	try {
		const taskTitleText = taskTitle.value;
		const taskStartDateText = taskStartDate.value;
		const taskStartTimeText = taskStartTime.value;
		const taskFinishDateText = taskFinishDate.value;
		const taskFinishTimeText = taskFinishTime.value;
		const taskStartDatetime = `${taskStartDate.value} às ${taskStartTime.value}`;
		const taskFinalDatetime = `${taskFinishDate.value} às ${taskFinishTime.value}`;
		const taskStatus = statusOptions[1];

		if (!taskTitleText) throw new Error("O título da task é obrigatório.");
		if (!taskStartDateText)
			throw new Error("A data de início da task é obrigatória.");
		if (!taskStartTimeText)
			throw new Error("O horário de início da task é obrigatório.");
		if (!taskFinishDateText)
			throw new Error("A data de término da task é obrigatória.");
		if (!taskFinishTimeText)
			throw new Error("O horário de término da task é obrigatório.");

		const task = {
			taskTitle: taskTitleText,
			taskStartDatetime,
			taskFinalDatetime,
			taskStatus,
		};

		tasks.push(task);
		generateTaskHTMLOnTable(task);
	} catch (e) {
		console.log("Não foi possível criar a task. Erro: ", e);
	}
};

const handleUpdateTask = (event) => {
	createTaskButton.style.display = "none";
	deleteTaskButton.style.display = "block";
	doneTaskButton.style.display = "block";
	cancelTaskEditButton.style.display = "block";
	updateTaskButton.style.display = "block";

	const taskEditButtonElement = event.target || event.srcElement;
	const taskElementId = taskEditButtonElement.id;
	taskIndex = taskElementId.split("-")[1];

	const task = tasks[taskIndex];

	taskTitle.value = task.taskTitle;
	taskStartDate.value = task.taskStartDatetime.split(" ")[0];
	taskStartTime.value = task.taskStartDatetime.split(" ")[2];
	taskFinishDate.value = task.taskFinalDatetime.split(" ")[0];
	taskFinishTime.value = task.taskFinalDatetime.split(" ")[2];
	const taskStartTimeText = taskStartTime.value;
	const taskFinishDateText = taskFinishDate.value;
	const taskFinishTimeText = taskFinishTime.value;
	const taskStartDatetime = `${taskStartDate.value} às ${taskStartTime.value}`;
	const taskFinalDatetime = `${taskFinishDate.value} às ${taskFinishTime.value}`;
};

const handleEditTask = async (event) => {
	const task = tasks[taskIndex];

	const taskTitleText = taskTitle.value;
	const taskStartDateText = taskStartDate.value;
	const taskStartTimeText = taskStartTime.value;
	const taskFinishDateText = taskFinishDate.value;
	const taskFinishTimeText = taskFinishTime.value;
	const taskStartDatetime = `${taskStartDate.value} às ${taskStartTime.value}`;
	const taskFinalDatetime = `${taskFinishDate.value} às ${taskFinishTime.value}`;

	task.taskTitle = taskTitleText;
	task.taskStartDatetime = taskStartDatetime;
	task.taskFinalDatetime = taskFinalDatetime;
	tasks[taskIndex] = task;

	const taskElement = document.querySelector(`#task-${taskIndex}`);
	taskElement.querySelector(".task-status").innerHTML = task.taskStatus;
	taskElement.querySelector("td").innerHTML = task.taskTitle;
	taskElement.querySelector("td:nth-child(2)").innerHTML =
		task.taskStartDatetime;
	taskElement.querySelector("td:nth-child(3)").innerHTML =
		task.taskFinalDatetime;
	taskElement.querySelector("td:nth-child(4)").innerHTML = task.taskStatus;
};

const handleDeleteTask = (event) => {
	const task = tasks[taskIndex];

	tasks.splice(taskIndex, 1);
	const taskElement = document.querySelector(`#task-${taskIndex}`);
	taskElement.remove();
	handleCancelTaskEdit();
};

const handleDoneTask = (event) => {
	const task = tasks[taskIndex];

	task.taskStatus = statusOptions[3];
	const taskElement = document.querySelector(`#task-${taskIndex}`);
	taskElement.querySelector(".task-status").innerHTML = statusOptions[3];
	handleCancelTaskEdit();
};

const handleCancelTaskEdit = () => {
	createTaskButton.style.display = "block";
	deleteTaskButton.style.display = "none";
	doneTaskButton.style.display = "none";
	cancelTaskEditButton.style.display = "none";
	updateTaskButton.style.display = "none";
	taskTitle.value = "";
	taskStartDate.value = "";
	taskStartTime.value = "";
	taskFinishDate.value = "";
	taskFinishTime.value = "";
};

window.addEventListener("DOMContentLoaded", (onLoadEvent) => {
	updateTaskButton.style.display = "none";
	deleteTaskButton.style.display = "none";
	doneTaskButton.style.display = "none";
	cancelTaskEditButton.style.display = "none";
	updateTaskButton.addEventListener("click", (event) => {
		handleEditTask(event, event.target.id.split("-")[1]);
	});
	deleteTaskButton.addEventListener("click", (event) =>
		handleDeleteTask(event)
	);
	doneTaskButton.addEventListener("click", (event) => handleDoneTask(event));
	cancelTaskEditButton.addEventListener("click", (event) =>
		handleCancelTaskEdit(event)
	);
	createTaskButton.addEventListener("click", (event) =>
		handleCreateTask(event)
	);
});
