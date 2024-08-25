const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({

  // userId: {
  //   type: String,
  //   required: true
  // },
//   avatar:{
//     type:String,
//     required:true
//   },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
    },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin'],
    default: 'admin',
  },
  refreshToken: {
    type: String,
    default: ''
  }
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
