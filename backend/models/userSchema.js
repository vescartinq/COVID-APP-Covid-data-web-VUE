const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Plug-in to validate unique properties
const uniqueValidator = require('mongoose-unique-validator');

// User roles
const roles = {
    values: ['ADMIN', 'USER'],
    message: '{VALUE} rol not defined'
  }

const userSchema = new Schema({

    name: {type: String, required: [true, 'Name is mandatory']},
    email: {
      type: String, 
      required: [true, 'Email is mandatory'],
      unique: true
    },
    pass: {type: String, required: [true, 'Password is mandatory']},
    date: {type: Date, default: Date.now},
    role: {type: String, default: 'USER', enum: roles},
    active: {type: Boolean, default: true}
  
  });

// Validate unique email in DB
  userSchema.plugin(uniqueValidator, { message: 'Error, expected unique {PATH}.' });

// Make a copy of the object but hide the password (that alredy exists)
// on postman
  userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.pass;
    return obj;
  }

// Convert to a Model
const User = mongoose.model('User', userSchema);

module.exports = User;