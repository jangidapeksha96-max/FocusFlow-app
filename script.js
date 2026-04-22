// LOAD TASKS ON START
window.onload = function () {
  loadTasks();
  getDailyQuote();
};

// ADD TASK
function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();

  if (taskText === "") return;

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  input.value = "";
  loadTasks();
}

// LOAD TASKS
function loadTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task;

    li.onclick = () => deleteTask(index);

    taskList.appendChild(li);
  });
}

// DELETE TASK
function deleteTask(index) {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}
// Load theme + correct icon
window.onload = function () {
  const savedTheme = localStorage.getItem("theme");
  const icon = document.querySelector("#themeBtn i");

  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  }
};

// Load theme
window.onload = function () {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  }
};
let time = 1500;
let timerInterval;
let isBreak = false;

function startTimer() {
  clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    time--;
    updateTimer();

    if (time === 0) {
      playSound();

      if (!isBreak) {
        switchToBreak();
      } else {
        switchToFocus();
      }
    }
  }, 1000);
}

// Manual break button
function startBreak() {
  clearInterval(timerInterval);
  switchToBreak();
}

// Switch modes
function switchToBreak() {
  isBreak = true;
  time = 300;
  document.getElementById("mode").textContent = "Break Time";
}

function switchToFocus() {
  isBreak = false;
  time = 1500;
  document.getElementById("mode").textContent = "Focus Time";

  updateSessions(); // track completed session
}



// Update display
function updateTimer() {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const totalTime = isBreak ? 300 : 1500;
const progress = time / totalTime;

const circle = document.getElementById("progressCircle");
const circumference = 565;

circle.style.strokeDashoffset = circumference * (1 - progress);

  document.getElementById("timerDisplay").textContent =
    `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function resetTimer() {
  clearInterval(timerInterval);
  switchToFocus();
  updateTimer();
}
// Sound
function playSound() {
  const audio = new Audio("https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg");
  audio.play();
}


let sessions = localStorage.getItem("sessions") || 0;
document.getElementById("sessions").textContent = sessions;

function updateSessions() {
  sessions++;
  localStorage.setItem("sessions", sessions);
  document.getElementById("sessions").textContent = sessions;
}
function toggleTheme() {
  document.body.classList.toggle("dark");

  const icon = document.getElementById("themeIcon");

  if (document.body.classList.contains("dark")) {
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
    localStorage.setItem("theme", "dark");
  } else {
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
    localStorage.setItem("theme", "light");
  }
}
const circle = document.getElementById("progressCircle");

if (isBreak) {
  circle.style.stroke = "#00c896"; // green for break
} else {
  circle.style.stroke = "#6c63ff"; // purple for focus
}
async function getDailyQuote() {
  const today = new Date().toLocaleDateString();

  const savedQuote = localStorage.getItem("quote");
  const savedDate = localStorage.getItem("quoteDate");

  // If already fetched today → use saved
  if (savedDate === today && savedQuote) {
    document.getElementById("quote").textContent = savedQuote;
    return;
  }

  try {
    const res = await fetch("https://api.quotable.io/random");
    const data = await res.json();

    const quoteText = `"${data.content}" — ${data.author}`;

    // Save for today
    localStorage.setItem("quote", quoteText);
    localStorage.setItem("quoteDate", today);

    document.getElementById("quote").textContent = quoteText;
  } catch (error) {
    document.getElementById("quote").textContent =
      "Stay focused. Keep going 💪";
  }
}
getDailyQuote();