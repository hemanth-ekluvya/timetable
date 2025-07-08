const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
  class_id: String,
  section: String,
  date: String,
  day: String,
  sessions: [
    {
      session_no: Number,
      subject: String,
      teacher_name: String,
      room_no: String,
      topic: String
    }
  ]
});

module.exports = mongoose.model('Timetable', timetableSchema);
