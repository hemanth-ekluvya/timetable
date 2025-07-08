const mongoose = require("mongoose");

const lessonPlanSchema = new mongoose.Schema({
  teacher: String,
  subject: String,
  topic: String,
  date: String,
  objective: String,
});

module.exports = mongoose.model("LessonPlan", lessonPlanSchema);
