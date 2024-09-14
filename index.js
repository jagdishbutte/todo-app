const express = require('express');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "mytodoapp";
const app = express();
const users = [];

app.use(express.json());

function auth(req, res, next){
    const token = req.headers.token;
    const decodeToken = jwt.verify(token, JWT_SECRET);

    if(decodeToken.username){
        req.username = decodeToken.username;
        next();
    }
    else{
        res.json({
            message: "Something went wrong..."
        });
    }
}


app.post("/signup", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username,
        password,
        tasks: []
    });
    
    res.json({
        message: "You are signed up successfully!"
    });
});


app.post("/signin", (req, res) =>{
    const username = req.body.username;
    const password = req.body.password;

    let foundUser = null;
    for(i = 0; i<users.length; i++){
        if(users[i].username === username && users[i].password === password){
            foundUser = users[i];
        }
    }

    if(foundUser){
        const token = jwt.sign({
            username: foundUser.username
        }, JWT_SECRET);

        res.send({
            token: token
        });
    }
    else{
        res.json({
            message: "You have entered wrong credentials..."
        });
    }
});



app.get("/home", auth, (req,res)=>{
    
    let foundUser = null;

    for(let i = 0; i<users.length; i++){
        if(users[i].username === req.username){
            foundUser = users[i];
        }
    }

    if(!foundUser){
        res.status(401).json({
            message: "Please login first..."
        });
    }

    res.json({
        username: foundUser.username,
        password: foundUser.password
    });

});


app.post("/addtask", auth, (req, res)=>{
    const task = req.body.task;

    let foundUser = null;
    for(i = 0; i<users.length; i++){
        if(users[i].username === username && users[i].password === password){
            foundUser = users[i];
        }
    }

    if (!foundUser) {
        return res.status(401).json({
            message: "Please login first..."
        });
    }

    foundUser.tasks.push(task);

    res.json({
        message: "Task added successfully", 
        tasks: foundUser.tasks
    });
});


app.listen(3000, ()=>{
    console.log("App is listening on port 3000");
});