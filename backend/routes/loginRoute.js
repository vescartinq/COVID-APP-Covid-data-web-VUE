const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');

// import User Schema
const User = require('../models/userSchema');

// Hash password
const bcrypt = require('bcrypt');
const saltRounds = 10;

// // Confirm login routes works
// router.get('/', async(req,res)=>{
//     return res.json({mensaje: 'login route is working!'})
// })

router.post('/', async(req, res) => {
  
  const body = req.body;

  try {

    // Verify email
    const userDB = await User.findOne({email: body.email})
    if(!userDB){
      return res.status(400).json({
        message: 'Email not found'
      })
    }

    // Verify password
    if(!bcrypt.compareSync(body.pass, userDB.pass)){
      return res.status(400).json({
        message: 'Incorrect password'
      })
    }

    // Generate token
    const token = jwt.sign(
        {data: userDB}, 
        'secret', 
        { expiresIn: 60 * 60 * 24 * 30 } // Time to renew token (sec,min, hours, days)
    ); 

    // Return user and token
    res.json({
      userDB,
      token
    })
    
  } catch (error) {
    return res.status(400).json({
      message: 'Error during the process',
      error
    })
  }

});

module.exports = router;