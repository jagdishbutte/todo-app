const express = require('express');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "mytodoapp";
const app = express();
const users = [];

app.use(express.json());

app.post("/signup", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username,
        password
    });
    
    console.log({
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
    }
    else{
        console.log({
            message: "You have entered wrong credentials..."
        });
    }
    
});