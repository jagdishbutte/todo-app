async function signup() {
    const username = document.getElementById("signup-un").value;
    const password = document.getElementById("signup-pass").value;

    try {
        const response = await axios.post("http://localhost:3000/signup", {
            username: username,
            password: password
        });
        alert("You are signed up");
    } catch (error) {
        console.error("Signup error:", error);
    }
}

async function signin() {
    const username = document.getElementById("signin-un").value;
    const password = document.getElementById("signin-pass").value;

    try {
        const response = await axios.post("http://localhost:3000/signin", {
            username: username,
            password: password
        });
        localStorage.setItem("token", response.data.token);
        alert("You are signed in");
        fetchTasks();
    } catch (error) {
        console.error("Signin error:", error);
    }
}

async function addTask() {
    const task = document.getElementById("add-task").value;

    try {
        const response = await axios.post("http://localhost:3000/addtask", 
        {
            task: task
        }, 
        {
            headers: {
                token: localStorage.getItem("token")
            }
        });
        fetchTasks(); // Refresh task list
    } catch (error) {
        console.error("Add task error:", error);
    }
}

async function fetchTasks() {
    try {
        const response = await axios.get("http://localhost:3000/home", {
            headers: {
                token: localStorage.getItem("token")
            }
        });

        const taskList = document.getElementById("task-list");
        taskList.innerHTML = ''; // Clear the existing list

        response.data.tasks.forEach(task => {
            const li = document.createElement("li");
            li.textContent = task;
            taskList.appendChild(li);
        });
    } catch (error) {
        console.error("Fetch tasks error:", error);
    }
}

function logout() {
    localStorage.removeItem("token");
    alert("You have been logged out");
}
