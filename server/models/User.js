const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  employee_id: String,
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['admin', 'teacher'], default: 'teacher' },
  school: String,
  details: Object
});

module.exports = mongoose.model('User', userSchema);
