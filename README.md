# TaskFLow - Testable Todo Item Card

A high-fidelity, polished Task Card UI component built as part of the HNG Stage 0 evaluation. This project focuses on semantic HTML, modern CSS (Glassmorphism), and robust Vanilla JavaScript logic for real-time data updates.

## 🚀 Live URL
- Link: [https://taskflow-mocha-zeta.vercel.app/](https://taskflow-mocha-zeta.vercel.app/)

## 🛠 Features
- **High-Fidelity UI:** Modern glassmorphism aesthetic with smooth transitions and hover states.
- **Real-time Countdown:** Automatically calculates "Time Remaining" or "Overdue" status relative to the specified deadline date.
- **Auto-Refresh:** Logic updates the "Time Remaining" every 30 seconds without page reloads.
- **Interactive Completion:** Checkbox toggles visual states (strike-through and status label changes).
- **Fully Testable:** Every required element is mapped with specific `data-testid` attributes for automated test compliance.

## 📂 Project Structure
```text
├── index.html   # Semantic structure + Dynamic year logic
├── main.css    # Modern UI styles (Glassmorphism)
└── script.js     # Time calculations & Task state management
```

## ⚙️ How to Run Locally

Follow the steps below to download and run project on your local machine.

1. Clone the repository:


    ```bash 
    git clone https://github.com/chisomchris/taskflow.git
    ```

2. Navigate to the project directory:

    ```bash
    cd <your-repo-name>
    ```

3. Open `index.html` in any modern web browser.
(No build tools or external dependencies required.)

## 🎨 Design Decisions & Evolution (Post-Stage 0)
- **Dynamic State Management**: We evolved the status logic beyond a simple toggle. If a task is marked as "Done" and subsequently unchecked, it intelligently reverts to Pending rather than just a generic active state, reflecting a more realistic user workflow.

- **Adaptive Color Coding**: To maintain high clarity, we implemented strict CSS priority for status colors. Overdue tasks remain Red even after edits, ensuring urgency is never masked by user interaction.

- **Information Density Control**: Introduced a Collapsible Description Container. If the task description exceeds 5 lines, it is truncated by default to maintain card verticality, with a smooth "Show More" transition.

- **Priority Hierarchy**: Added color-mapped badges for High, Medium, and Low priorities to allow for quick scannability in a list view.

## ♿ Accessibility Notes
- **Semantic Integrity**: Uses \<article> for the card, \<time> for date-related data, and proper heading levels (\<h2>) for accessibility tree clarity.

- **Aria Labels**: Screen readers are provided with context via aria-label on icon-only buttons (Edit, Delete, Cancel) and sr-only labels for the completion checkbox.

- **Interactive Contrast**: All status badges (High/Medium/Low) meet high-contrast requirements for readability against the glassmorphism background.

- **Keyboard Navigation**: All interactive elements (Inputs, Buttons, Toggles) are reachable via Tab with visible focus indicators.

## ⚠️ Known Limitations
- **Client-Side Persistence**: As this is a Vanilla JS Stage 0 project, state is not currently persisted via localStorage or a database. Refreshing the page will reset the task to the default state.

- **DateTime Picker Support**: The datetime-local input behavior varies slightly across browsers (specifically Safari vs. Chrome) but remains functional for deadline updates.