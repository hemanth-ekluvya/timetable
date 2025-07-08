const mongoose = require("mongoose");

const timetableSchema = new mongoose.Schema({
  class: String,
  section: String,
  subject: String,
  teacher: String,
  date: String,
  period: String,
});

module.exports = mongoose.model("Timetable", timetableSchema);
