const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();



//regsiter a user 
const registerUser = async(req, res) => {
    const { name, email, password, age, gender, role } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

         const hashedPassword = await bcrypt.hash(password, 10);
         const newUser = await User.create({ name, email, password: hashedPassword,age, gender, role});
        res.status(201).json({ message: "User created", user: newUser });
    }catch(err){
            res.status(500).json({ message: err.message });
    }
}
 //for login 
    const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try { 
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if( !isMatch) return res.status(401).json({message : "Invalid credentials"});

    const token = jwt.sign( 
   { id: user._id, role: user.role},
   process.env.JWT_SECRET,
   { expiresIn : '2h' }  
);
res.status(200).json({ token, user: { id: user._id, name: user.name, role: user.role } });
  }catch (err) {
    res.status(500).json({ message: err.message });
  }
}

router.post('/register', registerUser);
router.post('/login', loginUser);
//use 
// POST /api/auth/register
// POST /api/auth/login



module.exports = router;