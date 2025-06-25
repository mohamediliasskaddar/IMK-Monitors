const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { registerUser, loginUser } = require('./auth');
const { verifyToken, isAdmin } = require('../middleware/auth_mdw');




//Get all users with middlware is admin 
router.get('/', verifyToken, isAdmin, async(req,res)=> {
    try {
        const users = await User.find();
        res.json(users);
    }catch (err){
        res.status(500).json({ message: err.message });
    }
});

//Get one user 
router.get('/:id', verifyToken, async(req,res)=> {
    try {
       const user = await User.findById(req.params.id);
       if (!user) return res.status(404).json({ message: 'user not found !!' });
    res.json(user);
    }catch (err){
        res.status(500).json({ message: err.message });
    }
}
)
//POST CRAETE a user 
router.post('/', async(req,res)=> {
    const { name , email ,password,  gender, age, role } = req.body;
        const user = new User({ name , email ,password, gender, age, role });
    try {
        const newuser = await user.save();
        res.status(201).json(newuser);
    }catch (err){
        res.status(400).json({ message: err.message });
    }
}
)
//PUT update a user 
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'User not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//DELETE a user 
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'the user was  deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;