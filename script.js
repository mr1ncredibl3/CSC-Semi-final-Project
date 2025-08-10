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

      if (input.value.trim() !== "" && priority !== "") {
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

    if (tasks.length === 0) {
      container.innerHTML = "<p>No Pending Tasks Now...</p>";
      return;
    }

    tasks.forEach((t) => {
      let taskEl = document.createElement("div");
      taskEl.classList.add("task-container", `priority-${t.priority}`);
      taskEl.innerHTML = `<strong>${t.name}</strong><br>Priority: ${t.priority}<br>Date added: ${t.date}`;
      container.appendChild(taskEl);
    });
  }
});
