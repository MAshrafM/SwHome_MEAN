const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');

const User = require('../models/user');
const router = express.Router();

/* Sign Up */
router.post('/signup', function(req, res, next) {
  const {
    username,
    password,
    firstName,
    lastName,
    email
  } = req.body;
  
  // Validations
  if(!username || !password || !firstName || !lastName || !email){
    res.status(400).json({message: 'Fields cannot be empty'});
    return;
  }
  User.findOne({username}, '_id', (err, foundUser) => {
    if(foundUser){
      res.status(400).json({message: 'Username is taken'});
      return;
    }
  
  
    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);
    
    const newUser = new User({
      username,
      password: hashPass,
      firstName,
      lastName,
      email
    });
    
    newUser.save((err) => {
      if(err){
        res.status(400).json({message: 'Something went wrong while saving!'});
        return;
      }
      
      req.login(newUser, (err) => {
        if(err){
          res.status(500).json({message: 'Something went wrong while saving!'});
          return;
        }
        
        res.status(200).json(req.user);
      });
    });
  });
});

// login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, currUser, failUser) => {
    if(err){
      res.status(500).json({message: 'Server Error'});
      return;
    }
    
    if(!currUser){
      res.status(401).json(failUser);
      return;
    }
    
    req.login(currUser, (err) => {
      if(err){
        res.status(500).json({message: 'Something went wrong'});
        return;
      }
      res.status(200).json({message: ' User Logged In'});
    });
  })(req, res, next);
});

// logout
router.post('/logout', (req, res, next) => {
  req.logout();
  res.status(200).json({message: 'User logout'});
});

// logged
router.get('/private', (req, res, next) => {
  if(req.isAuthenticated()){
    res.status(200).json({message: 'User is in'});
    return;
  }
  
  res.status(403).json({message: 'Unauthorized access'});
});

router.get('/loggedin', (req, res, next) => {
  if(req.isAuthenticated()){
    res.status(200).json(req.user);
    return;
  }
  
  res.status(403).json({message: 'Unauthorized access'});
});

module.exports = router;
