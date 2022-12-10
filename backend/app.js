const express = require("express");
const app = new express();
const jwt = require('jsonwebtoken');
const cors = require("cors");//communication
const logger = require("morgan");//to view api call on terminal
const path = require('path')

// to pass data from frontend to backend.  use => while starting the app, use is executed
app.use(express.json());//json pair
app.use(express.urlencoded({ extended: true }));//json pair
app.use(cors());
app.use(logger("dev"));//morgan

app.use(express.static(path.resolve(__dirname, './uploads')));


// mongodb
require("./middleware/mongodb.js");


// Token Verification

function verifytoken(req,res,next){
    if (!req.headers.authorization)
    {
        return res.status(401).send('Unauthorised Request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token=='null')
    {
        return res.status(401).send('Unauthorised Request')
    }
    let payload = jwt.verify(token,'secretKey')
    console.log(payload)
    if(!payload)
    {
        return res.status(401).send('Unauthorised Request')
    }
    req.role=payload.subject
    next()
}

// login
const login = require("./router/login");
app.use("/login", login);

// for api calls
const api = require("./router/api.js");
app.use("/api",verifytoken, api)


// set port 
// const port = "api";
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`........port is now connected at ${port} url: http://localhost:3000/........`);
});


