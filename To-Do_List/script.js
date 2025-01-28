document.addEventListener('DOMContentLoaded', function () {
    let addbtn = document.getElementById("add");
    let input_text = document.getElementById("input-task");
    let tasklist = document.getElementById("list");

    // Retrieve tasks from localStorage or initialize an empty array
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Render existing tasks on page load
    tasks.forEach(task => renderTask(task));

    // Add a new task on button click
    addbtn.addEventListener("click", function () {
        const input = input_text.value.trim();

        if (input === "") return; // Ignore empty input

        const newtask = {
            id: Date.now(),
            text: input,
            completed: false
        };

        tasks.push(newtask); // Add new task to the array
        saveTasks(); // Save updated tasks to localStorage
        renderTask(newtask); // Render the new task in the DOM
        input_text.value = ""; // Clear input field
        console.log(tasks); // Log the tasks array
    });

    // Function to render a task
    function renderTask(task) {
        const li = document.createElement("li");
        li.setAttribute("data-id", task.id);

        // Add a completed class if the task is marked completed
        if (task.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `
            <span>${task.text}</span>
            <button>Delete</button>
        `;

        // Toggle completed state on task click (excluding delete button)
        li.addEventListener("click", function (event) {
            if (event.target.tagName === "BUTTON") return; // Skip if delete button is clicked

            task.completed = !task.completed; // Toggle completed state
            li.classList.toggle("completed"); // Update class
            saveTasks(); // Save changes to localStorage
        });

        // Handle task deletion
        li.querySelector("button").addEventListener("click", function (event) {
            event.stopPropagation(); // Prevent triggering task toggle
            tasks = tasks.filter(t => t.id !== task.id); // Remove task from the array
            li.remove(); // Remove task from the DOM
            saveTasks(); // Save changes to localStorage
        });

        tasklist.appendChild(li); // Add task to the list
    }

    // Function to save tasks to localStorage
    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
});
