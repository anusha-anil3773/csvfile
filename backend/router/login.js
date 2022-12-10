const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');

const userData = require('../models/users') 
// login
username=" "
password=" "
  router.post('/login',(req,res)=>{
    let userData =req.body

    if(!username){
        res.status(401).send('invalid username')
    }else
    if(password !== userData.password){
        res.status(401).send('invalid password')
    }else{
        let payload = {subject:username+password}
        let token =jwt.sign(payload,'secretkey')
        res.status(200).send({token})
    }
  })

  app.post('/api/staff', function (req, res) {
    let item = {

        Username: req.body.user.username,
        Password: req.body.user.password,
        Email: req.body.user.email


    }

    let loginstaff= userData(item);
    loginstaff.save().then(function (data) {
        res.send(true);
    }).catch(function (error) {
        res.send(false);
    })

    //ends

});