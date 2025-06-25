const mongoose = require('mongoose');

const userSchemas = new mongoose.Schema({
    name : { type: String, required: true},
    email : { type: String, required: true, unique : true},
    password : { type: String, required: true },
    gender : { type: String, enum: ['male', 'female']},
    age: {type: Number,  min: 18 },
    role : { type: String,enum: ['admin', 'user' ], required: true},
    
},{
  timestamps: true
});

module.exports = mongoose.model('User',userSchemas);