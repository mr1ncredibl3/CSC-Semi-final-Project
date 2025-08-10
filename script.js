const toggleButton = document.getElementById("toggle-btn");
const sidebar = document.getElementById("sidebar");

function toggleSidebar() {
  sidebar.classList.toggle("close");
  toggleButton.classList.toggle("rotate");
  Array.from(sidebar.getElementsByClassName("show")).forEach((ul) => {
    ul.classList.remove("show");
    ul.previousElementSibling.classList.remove("rotate");
  });
}

function toggleSubMenu(button) {
  button.nextElementSibling.classList.toggle("show");
  button.classList.toggle("rotate");
  if (sidebar.classList.contains("close")) {
    sidebar.classList.remove("close");
    toggleButton.classList.remove("rotate");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const page = window.location.pathname.split("/").pop();

  if (page === "index.html" || page === "") {
    function addTaskMessage() {
      let input = document.querySelector(".tasktextinput");
      let mesg = document.querySelector(".addedsuccessfully span");
      let priority = document.querySelector("select").value;

      if (input.value.trim() !== "" && priority !== "Priority") {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push({
          name: input.value,
          priority: priority,
          date: new Date().toLocaleString(),
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
        mesg.textContent = "Task Added!";
        input.value = "";
        setTimeout(() => {
          mesg.textContent = "";
        }, 2500);
      } else {
        mesg.textContent = "";
      }
    }

    document
      .querySelector(".addtaskbtn")
      .addEventListener("click", addTaskMessage);
    document
      .querySelector(".tasktextinput")
      .addEventListener("keydown", function (e) {
        if (e.key === "Enter") addTaskMessage();
      });
  }

  if (page === "pending.html") {
    let container = document.querySelector(".addedtask");
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let pending = tasks.filter((t) => t.priority !== "High");
    if (pending.length === 0) {
      container.innerHTML = "<p>No Pending Tasks Now...</p>";
      return;
    }

    pending.forEach((t) => {
      let taskEl = document.createElement("div");
      taskEl.classList.add("task-container", `priority-${t.priority}`);
      taskEl.innerHTML = `<strong>${t.name}</strong><br>Priority: ${t.priority}<br>Date added: ${t.date}<br><button class="donebtn">Done</button>`;
      let donebtn = taskEl.querySelector(".donebtn");
      donebtn.style.backgroundColor = "#aef359";
      donebtn.style.borderRadius = "0.5rem";
      donebtn.style.padding = "10px";
      donebtn.addEventListener("click", function () {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks = tasks.filter(
          (task) => !(task.name === t.name && task.date === t.date)
        );
        localStorage.setItem("tasks", JSON.stringify(tasks));
        let done = JSON.parse(localStorage.getItem("doneTasks")) || [];
        done.push(t);
        localStorage.setItem("doneTasks", JSON.stringify(done));
        taskEl.remove();
      });
      container.appendChild(taskEl);
    });
  }
  if (page === "priorities.html") {
    let container = document.querySelector(".addedtask");
    let tasks =
      JSON.parse(localStorage.getItem("tasks")) ||
      [].filter((t) => t.priority === "High");
    let high = tasks.filter((t) => t.priority === "High");

    if (high.length === 0) {
      container.innerHTML = "<p>No Pending Tasks Now...</p>";
      return;
    }

    high.forEach((t) => {
      let taskEl = document.createElement("div");
      taskEl.classList.add("task-container", `priority-${t.priority}`);
      taskEl.innerHTML = `<b>${t.name}</b><br>Priority: ${t.priority}<br>Date added: ${t.date}<br><button class="donebtn">Done</button>`;
      let donebtn = taskEl.querySelector(".donebtn");
      donebtn.style.backgroundColor = "#aef359";
      donebtn.style.borderRadius = "0.5rem";
      donebtn.style.padding = "5px";
      donebtn.addEventListener("click", function () {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks = tasks.filter(
          (task) => !(task.name == t.name && task.date === t.date)
        );
        localStorage.setItem("tasks", JSON.stringify(tasks));
        taskEl.remove();
      });
      container.appendChild(taskEl);
    });
  }
});
