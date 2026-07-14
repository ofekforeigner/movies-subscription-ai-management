const express = require('express');
const jwt = require('jsonwebtoken');
// const User = require('../models/userModel')
const usersService = require('../services/usersService')
const router = express.Router();

const JWT_SECRET = 'secretkey'


// Entry Point: http://localhost:3000/auth

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!(username && password)) {
    return res.status(400).send({ message: 'Fields cannot be empty!' })
  }

  const users = await usersService.getAll()
  const user = await usersService.getUser({ username, password })

  const existingUser = users.find(u => u.id == user[0]?._id)

  // if 'username' and 'password' are exist in DB:
  if (existingUser) {
    const token = jwt.sign(
      { id: existingUser._id },
      JWT_SECRET,
      { expiresIn: existingUser.session_timeout * 60000 }
    );

    return res
      .status(200)
      .json({
        message: "User logged in successfully", accessToken: token, user: JSON.stringify(existingUser)
      });
  } else {
    return res.json({ message: "User does not exist!" });
  }
});

router.post('/register', async (req, res) => {
  
  const { username, password } = req.body;
  //TODO: CHECK IF USER ALREADY SET HIS OWN PASSWORD

  
  if (!(username && password)) {
    return res.status(400).send({ message: 'Fields cannot be empty!' })
  } else {
    const users = await usersService.getAll()
    const user = await usersService.getByUsername(username)
    
    // if (!user) {
    //   return res.status(400).send({ message: 'User does not exist!' })
    // } else 
    if (user) {
      return res.status(400).send({ message: 'User already registered!' })
    }
    // const userData = users.find(u => u.id == user._id)
    await usersService.addUser({ username, password })

    const token = jwt.sign(
      JWT_SECRET,
      { expiresIn: userData.session_timeout }
    );

    return res.send({ accessToken: token, expiresIn: userData.session_timeout, message: "User registered successfully" });
  }

});

module.exports = router;
