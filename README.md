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