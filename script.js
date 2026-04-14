
const DEADLINE = new Date("2026-04-16T23:59:00");

function updateTaskCard() {
  const now = new Date();

  // 1. Format Due Date Display
  const dueDateEl = document.getElementById("due-date-display");
  if (dueDateEl) {
    const options = { month: "short", day: "numeric", year: "numeric" };
    dueDateEl.textContent = `- ${DEADLINE.toLocaleDateString("en-US", options)}`;
    dueDateEl.setAttribute("datetime", DEADLINE.toISOString());
  }

  // 2. Time Remaining Calculation
  const remainingEl = document.getElementById("time-remaining");
  const statusEl = document.querySelector('[data-testid="test-todo-status"]');
  const checkbox = document.getElementById("todo-toggle");
  const isCompleted = checkbox ? checkbox.checked : false;

  if (!remainingEl || !statusEl) return;

  const diff = DEADLINE - now;
  const absDiff = Math.abs(diff);

  const days = Math.floor(absDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (absDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((absDiff % (1000 * 60 * 60)) / (1000 * 60));

  let timeStr = "";
  if (diff > 0) {
    if (days > 0) timeStr = `Due in ${days} day${days > 1 ? "s" : ""}`;
    else if (hours > 0) timeStr = `Due in ${hours} hour${hours > 1 ? "s" : ""}`;
    else timeStr = `Due in ${minutes} minute${minutes > 1 ? "s" : ""}`;
    remainingEl.classList.remove("overdue");
  } else {
    if (days > 0) timeStr = `Overdue by ${days} day${days > 1 ? "s" : ""}`;
    else timeStr = `Overdue by ${hours} hour${hours > 1 ? "s" : ""}`;
    remainingEl.classList.add("overdue");
  }

  remainingEl.textContent = timeStr;

  // 3. Status Display Update
  if (isCompleted) {
    statusEl.textContent = "Completed";
    statusEl.style.color = "var(--success)";
  } else {
    statusEl.textContent = diff > 0 ? "In Progress" : "Overdue";
    statusEl.style.color = diff > 0 ? "var(--warning)" : "var(--danger)";
  }
}

// Event Listeners
const todoToggle = document.getElementById("todo-toggle");
if (todoToggle) {
  todoToggle.addEventListener("change", (e) => {
    const card = document.querySelector(".todo-card");
    if (e.target.checked) {
      card.classList.add("completed");
    } else {
      card.classList.remove("completed");
    }
    updateTaskCard();
  });
}

// Refresh loop (every 30 seconds)
updateTaskCard();
setInterval(updateTaskCard, 30000);
