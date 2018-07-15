const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/database');

// Register
router.post('/register', (req, res, next) => {
  let newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    country: req.body.country
    
  });

  User.getUserByUsername(newUser.username, (err, user) => {
    if(err) throw err;

    if(!user){
      //return res.json({success: false, msg: 'User not found'});
      User.addUser(newUser, (err, user) => {
        if(err){
          res.json({success: false, msg:'Failed to register user'});
        } else {
          res.json({success: true, msg:'User registered'});
        }
      });
    }
    else{
      return res.json({success: false, msg: 'Username already present'});
    }
  });  
});

router.get('/profile',(req,res,next)=>{
  res.send('Profile');
});



module.exports = router;
