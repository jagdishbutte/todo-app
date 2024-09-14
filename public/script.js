async function signup() {
    const username = document.getElementById("signup-un").value;
    const password = document.getElementById("signup-pass").value;

    const response = await axios.post("http://localhost:3000/signup", {
        username: username,
        password: password
    });
    alert("You are signed up")
}

async function signin() {
    const username = document.getElementById("signin-un").value;
    const password = document.getElementById("signin-pass").value;

    const response = await axios.post("http://localhost:3000/signin", {
        username: username,
        password: password
    });

    localStorage.setItem("token", response.data.token)

    alert("You are signed in");
}

async function addTask() {
    const response = await axios.get("http://localhost:3000/home", {
        headers: {
            token: localStorage.getItem("token")
        }
    });
    document.getElementById("information").innerHTML = "Your Tasks: " + response.data.tasks
}
addTask();

function logout() {
    localStorage.removeItem("token");
}
