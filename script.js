document.addEventListener("DOMContentLoaded", () => {
  let currentDeadline = new Date("2026-04-16T23:59:00");
  let currentStatus = "In Progress";

  const card = document.getElementById("todo-card");
  const editBtn = document.getElementById("edit-btn");
  const cancelBtn = document.getElementById("cancel-btn");
  const todoToggle = document.getElementById("todo-toggle");
  const descContainer = document.getElementById("desc-container");
  const descToggleBtn = document.getElementById("desc-toggle");

  const SAVE_ICON = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
  const EDIT_ICON = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>`;

  function updateApp() {
    const now = new Date();
    const timeEl = document.getElementById("time-remaining");
    const dot = document.getElementById("status-dot");
    const statusView = document.getElementById("view-status");
    const dateView = document.getElementById("view-due-date");

    timeEl.className = "countdown";
    dot.className = "status-dot";

    if (currentStatus === "Done") {
      timeEl.textContent = "Completed";
      timeEl.classList.add("completed-text");
      dot.style.background = "var(--success)";
      statusView.style.color = "var(--success)";
      statusView.textContent = "Done";
      card.classList.add("completed");
      todoToggle.checked = true;
    } else {
      const diff = currentDeadline - now;
      const isOverdue = diff < 0;
      const absDiff = Math.abs(diff);

      const d = Math.floor(absDiff / (1000 * 60 * 60 * 24));
      const h = Math.floor(
        (absDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const m = Math.floor((absDiff % (1000 * 60 * 60)) / (1000 * 60));

      const prefix = isOverdue ? "Overdue by " : "Due in ";
      if (d > 0) timeEl.textContent = `${prefix}${d} day${d > 1 ? "s" : ""}`;
      else if (h > 0)
        timeEl.textContent = `${prefix}${h} hour${h > 1 ? "s" : ""}`;
      else timeEl.textContent = `${prefix}${m} minute${m > 1 ? "s" : ""}`;

      if (isOverdue) {
        timeEl.classList.add("overdue-text");
        dot.classList.add("overdue-pulse");
        statusView.style.color = "var(--danger)";
      } else {
        statusView.style.color =
          currentStatus === "Pending" ? "var(--text-muted)" : "var(--warning)";
        dot.style.background =
          currentStatus === "Pending" ? "var(--text-muted)" : "var(--warning)";
      }

      statusView.textContent = currentStatus;
      card.classList.remove("completed");
      todoToggle.checked = false;
    }

    const opts = {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    dateView.textContent = currentDeadline.toLocaleDateString("en-US", opts);

    checkDescriptionHeight();
  }

  function checkDescriptionHeight() {
    const descText = document.getElementById("view-description");
    if (descText.scrollHeight > 115) {
      descToggleBtn.style.display = "block";
    } else {
      descToggleBtn.style.display = "none";
    }
  }

  descToggleBtn.addEventListener("click", () => {
    const isCollapsed = descContainer.classList.toggle("collapsed");
    descToggleBtn.textContent = isCollapsed ? "Show More" : "Show Less";
  });

  const toggleEditMode = (isEditing) => {
    if (isEditing) {
      document.getElementById("edit-title").value =
        document.getElementById("view-title").innerText;
      document.getElementById("edit-description").value =
        document.getElementById("view-description").innerText;
      document.getElementById("edit-status").value = currentStatus;
      document.getElementById("edit-priority").value = document
        .getElementById("view-priority")
        .innerText.toLowerCase();

      const tags = Array.from(document.querySelectorAll("#view-tags li")).map(
        (li) => li.innerText,
      );
      document.getElementById("edit-tags").value = tags.join(", ");

      const offset = currentDeadline.getTimezoneOffset() * 60000;
      document.getElementById("edit-due-date").value = new Date(
        currentDeadline - offset,
      )
        .toISOString()
        .slice(0, 16);

      card.classList.add("is-editing");
      editBtn.innerHTML = SAVE_ICON;
      editBtn.setAttribute("data-testid", "test-todo-edit-button");
      cancelBtn.style.display = "inline-block";
    } else {
      card.classList.remove("is-editing");
      editBtn.innerHTML = EDIT_ICON;
      editBtn.setAttribute("data-testid", "test-todo-save-button");
      cancelBtn.style.display = "none";
      updateApp();
    }
  };

  const saveAll = () => {
    document.getElementById("view-title").innerText =
      document.getElementById("edit-title").value;
    document.getElementById("view-description").innerText =
      document.getElementById("edit-description").value;

    currentStatus = document.getElementById("edit-status").value;
    currentDeadline = new Date(document.getElementById("edit-due-date").value);

    const priority = document.getElementById("edit-priority").value;
    const pBadge = document.getElementById("view-priority");
    pBadge.innerText = priority.charAt(0).toUpperCase() + priority.slice(1);
    pBadge.className = `priority-badge ${priority}`;

    const tagInput = document.getElementById("edit-tags").value;
    const tagsArr = tagInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t !== "");
    document.getElementById("view-tags").innerHTML = tagsArr
      .map(
        (tag) =>
          `<li data-testid="test-todo-tag-${tag.toLowerCase().replace(/\s+/g, "")}">${tag}</li>`,
      )
      .join("");

    toggleEditMode(false);
  };

  editBtn.addEventListener("click", () => {
    card.classList.contains("is-editing") ? saveAll() : toggleEditMode(true);
  });

  cancelBtn.addEventListener("click", () => toggleEditMode(false));

  /**
   * Logic for checkbox: If unchecked after Done, revert to Pending.
   */
  todoToggle.addEventListener("change", (e) => {
    if (e.target.checked) {
      currentStatus = "Done";
    } else {
      // Revert specifically to Pending when unchecking a completed task
      currentStatus = "Pending";
    }
    updateApp();
  });

  updateApp();
  setInterval(updateApp, 30000);
});
