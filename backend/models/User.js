const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator')

const User = mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true , minlength : 6},
  email: { type: String, required: true, unique: true },
  image: { type: String, required: true },
});

User.plugin(uniqueValidator) ; 
module.exports = mongoose.model('User' , User)