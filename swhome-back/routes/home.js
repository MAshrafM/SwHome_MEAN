const express = require('express');
const mongoose = require('mongoose');
const Home = require('../models/home');
const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'homes',
  allowedFormats: ["jpg", "png"],
  transformation: [{ width: 500, height: 500, crop: "limit" }]
})

const parser = multer({storage: storage});

const router = express.Router();

// index user homes
router.get('/myhome', (req, res, next) => {
  const userId = req.user._id;
  
  Home.find({owner: userId}).then((userHomes, err) => {
    if(err){
      res.json(err);
      return;
    }
    res.json(userHomes);
  }).catch(error => next(error));
});

// home details
router.get('/myhome/:id', (req, res, next) => {
  const homeId = req.params.id;
  
  if(!mongoose.Types.ObjectId.isValid(homeId)){
    res.status(400).json({message: 'id not found'});
    return;
  }
  
  Home.findById(homeId).then((userHome, err) => {
    if(err){
      res.json(err);
      return;
    }
    
    res.json(userHome);
  }).catch(error => next(error));
});

// add home
router.post('/myhome', parser.array('photos', 10), (req, res, next) => {
  const userId = req.user._id;
  const homePhotos = req.files;
  const images = [{}];
  
  for(photo in homePhotos){
    images.push(photo.url, photo.id);
  }
  const {
    homeType,
    locationType,
    settingType,
    address,
    description,
  } = req.body;
  
  const userHome = new Home({
    owner: userId,
    homeType,
    locationType,
    settingType,
    address,
    description,
    images
  });
  
  userHome.save().then(userHome => {
    res.json({message: 'New Home Added!'});
  }).catch(error => next(error));
});

// edit home
router.put('/myhome/:id', (req, res, next) => {
  const homeId = req.params.id;
  if(!mongoose.Types.ObjectId.isValid(homeId)) {
    res.status(400).json({ message: 'id not found' });
    return;
  }
  
  const homeUpdate = {
    homeType: req.body.homeType, 
    locationType: req.body.locationType, 
    settingType: req.body.settingType,
    address: req.body.address,
    description: req.body.description
  }
  
  Home.findByIdAndUpdate(homeId, homeUpdate, {new: true}).then(home => {
    return res.json({message: 'Home updated!'});
  }).catch(error => next(error));
});

// delete home
router.delete('/myhome/:id', (req, res, next) => {
  const homeId = req.params.id;
  
  if(!mongoose.Types.ObjectId.isValid(homeId)){
    res.status(400).json({message: 'id not found'});
    return;
  }
  
  Home.remove({_id: homeId}).then((message) => {
    return res.json({message: 'Home removed!'});
  }).catch(error => next(error));
});

module.exports = router;