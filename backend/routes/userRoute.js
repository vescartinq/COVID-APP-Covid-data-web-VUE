const express = require('express');
const router = express.Router();

// import User Schema
const User = require('../models/userSchema');

// Middleware to verify JWT
const {verifyAuth, verifyAdmin} = require('../middlewares/authentication')

// Encrypt password
const bcrypt = require('bcrypt');
const saltRounds = 10; //Rounds to encrypt password

// Make validatons -> Filter PUT data
const _ = require('underscore');

// Add new user
router.post('/new-user', async(req, res) => {

    // Receive body sent from frontend
    // const body=req.body;

    // Rebuild frontend body object received from frontend 
    // to encrypt password
    const body = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role
    }
  
    // Encrypt password and add to body
    body.pass = bcrypt.hashSync(req.body.pass, saltRounds);
  
    try {
  
      const userDB = await User.create(body);
      res.json(userDB);
      
    } catch (error) {
      return res.status(500).json({
        mensaje: 'Error during the process',
        error
      })
    }
  
  });

 // Get user by parameters
router.put(
    '/user/:id', 
    [verifyAuth, verifyAdmin],  //verify user and only admin user can modify users
    async(req, res) => {

    // Get user by params
    const _id = req.params.id;
    // Receive body sent from frontend by params
    // const body=req.body

    // Filters params user can modify (to modify role is not an option)
    const body = _.pick(req.body, ['name', 'email', 'pass', 'active']);
  
    // Confirm password is encrypted
    if(body.pass){
      body.pass = bcrypt.hashSync(req.body.pass, saltRounds);
    }
  
    try {
  
      const userDB = await User.findByIdAndUpdate(_id, body, {new: true, runValidators: true}) //runValidator to validate user role
  
      return res.json(userDB);
      
    } catch (error) {
      return res.status(400).json({
        mensaje: 'Error during the process',
        error
      })
    }
  
  }) 

  module.exports = router;